document.addEventListener("DOMContentLoaded", () => {
    const googleSignInButton = document.getElementById("search");
  
    googleSignInButton.addEventListener("click", () => {
      window.location.href = "/search"; // Redirect to the desired page
    });
  });