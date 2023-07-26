

var numNameFields = 1;

function addNameField() {
    var nameContainer = document.getElementById("name-container");
    var nameFieldContainer = document.createElement("div");
    nameFieldContainer.className = "mb-3 input-group"; // Added 'input-group' class to ensure proper alignment

    var newInput = document.createElement("input");
    newInput.className = "form-control";
    newInput.type = "text";
    newInput.name = "name";
    newInput.id = "name-" + numNameFields;
    newInput.value = "";
    newInput.required = true;
    newInput.oninput = function(event) {
        showWordRecommendations(event, numNameFields);
    };

    var deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "btn btn-danger";
    deleteButton.textContent = "Remove";
    deleteButton.onclick = function() {
        removeNameField(newInput.id);
    };

    nameFieldContainer.appendChild(newInput);
    nameFieldContainer.appendChild(deleteButton);
    nameContainer.appendChild(nameFieldContainer);
    numNameFields++;
}

// Function to remove the clicked name field
function removeNameField(inputId) {
    var nameContainer = document.getElementById("name-container");
    var inputToRemove = document.getElementById(inputId);
    nameContainer.removeChild(inputToRemove.parentElement); // Remove the parent div containing the input and delete button
}

// Global variable to store timeout references for each name field
var timeouts = {};

function showWordRecommendations(event, fieldNum) {
    var input = event.target.value.trim();

    // Check if there is any input
    if (input.length === 0) {
        document.getElementById("wordRecommendations").innerHTML = "";
        return;
    }

    // Clear previous timeout, if any
    clearTimeout(timeouts[fieldNum]);

    // Set a new timeout to fetch word recommendations after a brief delay (e.g., 300ms)
    timeouts[fieldNum] = setTimeout(function() {
        // Make an AJAX call to fetch word recommendations based on the input
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/get_word_recommendations/?input=' + encodeURIComponent(input), true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var wordRecommendations = JSON.parse(xhr.responseText);

                // Display word recommendations in a list
                var recommendationsHtml = " <select onchange='selectRecommendation()'>";
                recommendationsHtml += '<option>CAN SELECT MATCHING DRUG NAME</option>';
                for (var i = 0; i < wordRecommendations.length; i++) {
                    var word = wordRecommendations[i];
                    recommendationsHtml += '<option value="' + word + '">' + word + '</option>';
                }
                recommendationsHtml += "</select>";

                document.getElementById("wordRecommendations").innerHTML = recommendationsHtml;
            } else {
                console.error('Request failed. Status:', xhr.status);
                // Display no recommendations for error cases
                document.getElementById("wordRecommendations").innerHTML = "";
            }
        };
        xhr.onerror = function() {
            console.error('Request failed. Network error');
            // Display no recommendations for network errors
            document.getElementById("wordRecommendations").innerHTML = "";
        };
        xhr.send();
    }, 300); // Adjust the delay as needed (in milliseconds)
}

// Function to select a word recommendation and populate the input field with it
function selectRecommendation() {
    var selectElement = document.querySelector("select");
    var selectedOption = selectElement.options[selectElement.selectedIndex].value;
    document.getElementById("name-" + (numNameFields - 1)).value = selectedOption;
    document.getElementById("wordRecommendations").innerHTML = "";
}

function handleFormSubmit(event) {
event.preventDefault(); // Prevent the form from being submitted traditionally
handleSelectionChange();
}

function handleSelectionChange() {
  var nameInputs = document.querySelectorAll("#name-container input");
    var drugNames = [];
    for (var i = 0; i < nameInputs.length; i++) {
      drugNames.push(encodeURIComponent(nameInputs[i].value));
    }
    drugNames = drugNames.join(",");
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/get_medicine_chat/?name=' + drugNames, true);


  // Make an AJAX call to fetch the medication details based on the selected strength, dosage form, and drug names
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/get_presciption_classification/?name=' + drugNames, true);
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



