function passwordFunction() {
  let passwordInput = document.querySelectorAll(".password-input");
  for (let i = 0; i < passwordInput.length; i++) {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }
}