document.addEventListener("DOMContentLoaded", () => {
    const directionButton = document.getElementById("direction");
    directionButton.addEventListener("click", () => {
        window.location.href = "/direction"; // Redirect to the desired page
      });
      const teacherInput = document.getElementById('teacherName');
  const teacherDetailsContainer = document.getElementById("teacher's");

  // Adding an event listener to listen for the Enter key press
  teacherInput.addEventListener("keydown", async function (event) {
    if (event.key === "Enter") {
      const teacherName = teacherInput.value.trim();

      // If the teacher name is not empty, proceed to fetch data
      if (teacherName) {
        try {
          const response = await fetch(`https://project-expo-backend-repo-production.up.railway.app/search_teacher?teacher_name=${teacherName}`);
          const data = await response.json();

          // Log the response data for debugging purposes
          console.log("Response data:", data);

          if (response.ok && data.Matched_Name) {
            displayTeacherDetails(data);
          } else {
            teacherDetailsContainer.innerHTML = `<p>No teacher found with that name.</p>`;
          }
        } catch (error) {
          teacherDetailsContainer.innerHTML = `<p>An error occurred: ${error.message}</p>`;
        }
      } else {
        teacherDetailsContainer.innerHTML = ''; // Clear the details if input is empty
      }
    }
  });

  // Function to display the teacher details
  function displayTeacherDetails(data) {
    const detailsDiv = document.getElementById("teacher's");
    detailsDiv.innerHTML = `
      <h3>Teacher Details</h3>
      <p><strong>Name:</strong> ${data.Matched_Name}</p>
      <p><strong>Cabin No:</strong> ${data.Cabin}</p>
      <p><strong>Room No:</strong> ${data.Room_No}</p>
      <p><strong>Phone Number:</strong> ${data["Phone Number"]}</p>
    `;
  }
      
});