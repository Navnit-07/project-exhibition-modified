const BASE_URL = "http://127.0.0.1:5000";

// Function to handle API request for path processing
async function processPath(start, end) {
  try {
    const response = await fetch(`${BASE_URL}/process_path`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: start,
        end: end,
        preference: "Lift", // You can make this dynamic if needed
      }),
    });

    const data = await response.json();
    displayResponse(data); // Call function to display the response
  } catch (error) {
    console.error("Error processing path:", error);
    displayResponse({ error: error.message });
  }
}

// Function to display API response
function displayResponse(response) {
  alert(JSON.stringify(response, null, 4)); // For simplicity, using an alert
  console.log(response); // For debugging in the console
}

// Event listener for the submit button
document.getElementById("submit-button").addEventListener("click", () => {
  const startLocation = document.getElementById("start-location").value;
  const destination = document.getElementById("destination").value;

  if (!startLocation || !destination) {
    alert("Please enter both start and destination locations.");
    return;
  }

  processPath(startLocation, destination);
});
