var timeoutMap = new Map(); // Map to store timeout references for each input field

function showWordRecommendations(inputElement) {
  var input = inputElement.value.trim();
  var recommendationsContainer = inputElement.nextElementSibling;

  clearTimeout(timeoutMap.get(inputElement)); // Clear previous timeout, if any

  // Set a new timeout to fetch word recommendations after a brief delay (e.g., 300ms)
  var timeout = setTimeout(function() {
    // Check if there is any input
    if (input.length === 0) {
      recommendationsContainer.innerHTML = "";
      return;
    }

    // Make an AJAX call to fetch word recommendations based on the input
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/get_word_recommendations/?input=' + encodeURIComponent(input), true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var wordRecommendations = JSON.parse(xhr.responseText);

        // Display word recommendations in a list
        var recommendationsHtml = "<select onchange='selectRecommendation(this)'>";

        for (var i = 0; i < wordRecommendations.length; i++) {
          var word = wordRecommendations[i];
          recommendationsHtml += '<option value="' + word + '">' + word + '</option>';
        }
        recommendationsHtml += "</select>";

        recommendationsContainer.innerHTML = recommendationsHtml;
      } else {
        console.error('Request failed. Status:', xhr.status);
        // Display no recommendations for error cases
        recommendationsContainer.innerHTML = "";
      }
    };
    xhr.onerror = function() {
      console.error('Request failed. Network error');
      // Display no recommendations for network errors
      recommendationsContainer.innerHTML = "";
    };
    xhr.send();
  }, 300); // Adjust the delay as needed (in milliseconds)

  // Store the timeout reference in the map
  timeoutMap.set(inputElement, timeout);
}

// Function to select a word recommendation and populate the input field with it
function selectRecommendation(selectElement) {
  var selectedOption = selectElement.options[selectElement.selectedIndex].value;
  var inputElement = selectElement.parentNode.previousElementSibling;
  inputElement.value = selectedOption;
  selectElement.parentNode.innerHTML = "";
}

// Function to add a new drug name input
function addNewInput() {
  var inputContainer = document.getElementById("inputContainer");
  var newInputDiv = document.createElement("div");
  newInputDiv.innerHTML = `
    <label class="form-label" for="name">NAME OF THE DRUG</label>
    <input type="text" class="nameInput" name="name" value="" required oninput="showWordRecommendations(this)">
    <div class="wordRecommendations"></div>
  `;
  inputContainer.appendChild(newInputDiv);
}

function handleFormSubmit(event) {
event.preventDefault(); // Prevent the form from being submitted traditionally
handleSelectionChange();
}
function handleSelectionChange() {
var drugNames = [];

// Get all the drug name input elements with class "nameInput"
var drugNameInputs = document.querySelectorAll(".nameInput");

// Loop through each input element and collect the drug names
drugNameInputs.forEach(function(inputElement) {
var drugName = inputElement.value.trim();
if (drugName.length > 0) {
  drugNames.push(drugName);
}
});

// Make an AJAX call to fetch the medication details based on the selected strength, dosage form, and drug name
var xhr = new XMLHttpRequest();
xhr.open('GET', '/get_presciption_classification/?name=' + drugNames , true);
xhr.onload = function() {
  if (xhr.status === 200) {
    var get_presciption_classification = JSON.parse(xhr.responseText);
    if (Array.isArray(get_presciption_classification) && get_presciption_classification.length > 0) {



      // Display details for each medication
      var detailsHtml = "";
      for (var i = 0; i < get_presciption_classification.length; i++) {
        var medication = get_presciption_classification[i];
        detailsHtml += "<div class='medication-details'>";
        detailsHtml += "<p><strong>BRAND NAME: </strong>" + medication.name + "</p>";
        detailsHtml += "<h4> DRUG CLASS </h4>";
        var drug_class_indication_groups = new Set();


        if (medication.group && medication.indication) {
            var drug_class_indication_groups = new Set();

            for (var j = 0; j < medication.indication.split(",").length; j++) {
              var group = medication.group.split(",")[j].toUpperCase();
              var indication = medication.indication.split(",")[j];

              // Check if the group is already processed
              if (!drug_class_indication_groups.has(indication)) {
                detailsHtml += "<p><strong class='medication-group'>" + group + ":</strong><span class='medication-indication'>" + indication + "</span></p>";

                // Add the group to the set of processed groups for indication
                drug_class_indication_groups.add(indication);
              }
            }
        }

      
        detailsHtml += "<h4> SIDE EFECT CLASS </h4>";




        var side_effect_indication_groups = new Set();


        if (medication.side_effect_group && medication.side_effect_indication) {
            var side_effect_indication_groups = new Set();

            for (var j = 0; j < medication.side_effect_indication.split(",").length; j++) {
              var group = medication.side_effect_group.split(",")[j].toUpperCase();
              var indication = medication.side_effect_indication.split(",")[j];

              // Check if the group is already processed
              if (!side_effect_indication_groups.has(indication)) {
                detailsHtml += "<p><strong class='medication-group'>" + group + ":</strong><span class='medication-indication'>" + indication + "</span></p>";

                // Add the group to the set of processed groups for indication
                side_effect_indication_groups.add(indication);
              }
            }
          }
          else{
            detailsHtml += "<p ><strong ><span class='medication-score' class='medication-indication'>No data found</span></strong></p>";

          }

          detailsHtml += "<h4> CONTRA-INDICATIONS </h4>";

          var contraindication_groups = new Set();
          if (medication.contraindication_group && medication.contraindication_indication) {
            var contraindication_groups = new Set();

            for (var j = 0; j < medication.contraindication_indication.split(",").length; j++) {
              var group = medication.contraindication_group.split(",")[j].toUpperCase();
              var indication = medication.contraindication_indication.split(",")[j];

              // Check if the group is already processed
              if (!contraindication_groups.has(indication)) {
                detailsHtml += "<p><strong class='medication-group'>" + group + ":</strong><span class='medication-indication'>" + indication + "</span></p>";

                // Add the group to the set of processed groups for indication
                contraindication_groups.add(indication);
              }
            }
          }
          else {
            detailsHtml += "<p ><strong ><span class='medication-score' class='medication-indication'>No data found</span></strong></p>";
          }
          if (medication.contraindication_result) {

            for (var j = 0; j < medication.contraindication_result.split(",").length; j++) {
              var result = medication.contraindication_result.split(",")[j];
              detailsHtml += "<p><strong class='medication-score'>SUMMERY: </strong>" + result + "</p>";
            }
          }



        // Add more fields here
        detailsHtml += "</div>";
        detailsHtml += "<hr>";
      }
      document.getElementById("get_presciption_classification").innerHTML = detailsHtml;
    }
    
    else {
      // Display "No data found" message
      document.getElementById("get_presciption_classification").innerHTML = "<p>No data found</p>";
    }
  } else {
    console.error('Request failed. Status:', xhr.status);
    // Display "No data found" message for error cases
    document.getElementById("get_presciption_classification").innerHTML = "<p>No data found</p>";
  }
};
xhr.onerror = function() {
  console.error('Request failed. Network error');
  // Display "No data found" message for network errors
  document.getElementById("get_presciption_classification").innerHTML = "<p>No data found</p>";
};
xhr.send();
}