document.addEventListener("DOMContentLoaded", () => {
    const googleSignInButton = document.getElementById("googleSignIn");
  
    googleSignInButton.addEventListener("click", () => {
      window.location.href = "/home"; // Redirect to the desired page
    });
  });