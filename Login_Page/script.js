document.addEventListener("DOMContentLoaded", () => {
    const googleSignInButton = document.getElementById("googleSignIn");
  
    googleSignInButton.addEventListener("click", () => {
      window.location.href = "/auth/google"; // Redirect to the desired page
    });
  });