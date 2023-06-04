function passwordSignUpFunction() {
  let passwordInput = document.getElementById("password-signup");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }

}

function passwordLoginFunction() {
  let passwordInput = document.getElementById("password-login");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}