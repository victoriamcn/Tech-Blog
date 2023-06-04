function passwordSignUpFunction() {
  let passwordInput = document.getElementById("password-signup");
  
  for (let i = 0; i < passwordInput.length; i++) {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }
}

function passwordLoginFunction() {
  let passwordInput = document.getElementById("password-login");

  for (let i = 0; i < passwordInput.length; i++) {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }
}