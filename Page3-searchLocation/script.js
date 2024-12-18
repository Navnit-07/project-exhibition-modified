document.addEventListener("DOMContentLoaded", () => {
    const directionButton = document.getElementById("direction");
    directionButton.addEventListener("click", () => {
        window.location.href = "/direction"; // Redirect to the desired page
      });
});