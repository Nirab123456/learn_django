  // Retrieve the query parameters from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const strength = urlParams.get('strength');
  const dosageForm = urlParams.get('dosage_form');
  const drugName = urlParams.get('name');
  
  // Now you have the values of the query parameters in the variables (strength, dosageForm, drugName).
  // You can use these values as needed in the JavaScript code of this HTML page.
  console.log('Strength:', strength);
  console.log('Dosage Form:', dosageForm);
  console.log('Drug Name:', drugName);




document.getElementById("sortOption").addEventListener("change", handleSortOptionChange);

function handleSortOptionChange() {
  var selectedSortOption = document.getElementById("sortOption").value;
  // Call the function to fetch medication details with the updated sort option
  fetchMedicationDetails(selectedSortOption);
}


function fetchMedicationDetails(sortOption) {
  // Make an AJAX call to fetch the medication details based on the selected strength, dosage form, and drug name
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/get_medication/?strength=' + strength + '&dosage_form=' + dosageForm + '&name=' + drugName, true);
  // xhr.open('GET', '/get_medication/?strength=' + strength + '&dosage_form=' + dosageForm + '&name=' + drugName + '&sort=' + sortOption, true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      var medicationDetails = JSON.parse(xhr.responseText);
      if (Array.isArray(medicationDetails) && medicationDetails.length > 0) {
        // Sort the medication details based on the selected sort option
        
        if (sortOption === "priceAsc") {
          medicationDetails.sort(function(a, b) {
            return a.price_analysis - b.price_analysis;
          });
        } else if (sortOption === "priceDesc") {
          medicationDetails.sort(function(a, b) {
            return b.price_analysis - a.price_analysis;
          });
        }
        
        // Display details for each medication
        var detailsHtml = "";
        for (var i = 0; i < medicationDetails.length; i++) {
          var medication = medicationDetails[i];
          detailsHtml += '<div class="card card-margin">';
          detailsHtml += '  <div class="card-body">';
          detailsHtml += '    <div class="row search-body">';
          detailsHtml += '      <div class="col-lg-12">';
          detailsHtml += '        <div class="search-result">';
          detailsHtml += '          <div class="result-body">';
          detailsHtml += '            <div class="table-responsive">';
          detailsHtml += '              <table class="table  widget-26">';
          detailsHtml += '                <tbody>';
          detailsHtml += '                  <tr>';
          detailsHtml += '                    <td class="column-1">';
          detailsHtml += '                      <div class="widget-26-job-title">';
          detailsHtml += '                        <a href="#">' + medication.name.trim() + '</a>';
          detailsHtml += '                        <p class="m-0">';
          detailsHtml += '                          <a href="#" class="employer-name text-center Class">' + medication.dosage_form.trim() + '.</a>';
          detailsHtml += '                        </p>';
          detailsHtml += '                      </div>';
          detailsHtml += '                    </td>';
          detailsHtml += '                    <td class="column-2" >';
          detailsHtml += '                      <div class="widget-26-job-info">';
          detailsHtml += '                        <p class="type m-0">' + medication.manufacturer.trim() + '</p>';
          detailsHtml += '                        <a  class="type m-0 employer-name">' + medication.generic_name.trim() + '.</a>';
          detailsHtml += '                      </div>';
          detailsHtml += '                    </td>';

          if(medication.price != '0'){
            detailsHtml += '                    <td class="column-3" >';
            detailsHtml += '                      <div class="widget-26-job-category">';
            detailsHtml += '                        <p class="m-0 text-center Class">' + medication.price.trim() + '</p>';
            detailsHtml += '                      </div>';
            detailsHtml += '                    </td>';
          }
            else{
            detailsHtml += '                    <td class="column-3">';
            detailsHtml += '                      <div class="widget-26-job-category">';
            detailsHtml += '                        <p class="m-0 text-center Class">PRICE DATA IS UNAVAILABLE</p>';
            detailsHtml += '                      </div>';
            detailsHtml += '                    </td>';
            }

          detailsHtml += '                  </tr>';
          detailsHtml += '                </tbody>';
          detailsHtml += '              </table>';
          detailsHtml += '            </div>';
          detailsHtml += '          </div>';
          detailsHtml += '        </div>';
          detailsHtml += '      </div>';
          detailsHtml += '    </div>';
          detailsHtml += '  </div>';
          detailsHtml += '</div>';
        }
        document.getElementById("medicationDetails").innerHTML = detailsHtml;
      } else {
        // Display "No data found" message
        document.getElementById("medicationDetails").innerHTML = "<p>No data found</p>";
      }
    } else {
      console.error('Request failed. Status:', xhr.status);
      // Display "No data found" message for error cases
      document.getElementById("medicationDetails").innerHTML = "<p>No data found</p>";
    }
  };
  xhr.onerror = function() {
    console.error('Request failed. Network error');
    // Display "No data found" message for network errors
    document.getElementById("medicationDetails").innerHTML = "<p>No data found</p>";
  };
  xhr.send();
}
fetchMedicationDetails("default");
