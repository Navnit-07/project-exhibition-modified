document.addEventListener("DOMContentLoaded", () => {
  // Select all floor number images
  const floorNumbers = document.querySelectorAll('.floor-number img');
  const defaultFloorId = '0'; // Default active floor ID
  let activeElement = document.getElementById(defaultFloorId); // Default active element

  // Set the initial hover-active class on the default element
  activeElement.classList.add('hover-active');

  floorNumbers.forEach((img) => {
    img.addEventListener('click', () => {
      const floorNumber = img.id; // Get the clicked image's ID
      const floorMap = document.getElementById('floor-map'); // Get the floor map object

      // Update the data attribute of the object element
      floorMap.setAttribute('data', `Floor ${floorNumber}.svg`);

      // Remove hover-like active state from the previously active element
      if (activeElement) {
        activeElement.classList.remove('hover-active');
      }

      // Add hover-like active state to the clicked element
      img.classList.add('hover-active');

      // Update the active element reference
      activeElement = img;
    });
  });
    const googleSignInButton = document.getElementById("search");
  
    googleSignInButton.addEventListener("click", () => {
      window.location.href = "/search"; // Redirect to the desired page
    });
    
  });