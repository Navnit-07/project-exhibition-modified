document.addEventListener("DOMContentLoaded", () => {
    const googleSignInButton = document.getElementById("googleSignIn");
    const guestSignInButton = document.getElementById("guestSignIn");
  
    googleSignInButton.addEventListener("click", () => {
      window.location.href = "/auth/google"; // Redirect to the desired page
    });
    guestSignInButton.addEventListener("click", () => {
      console.log("clicked");
      // window.location.href = "http://127.0.0.1:5501/GuestLogin/index.html";
      window.location.href = "/guest";

    });
  });