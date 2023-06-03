function passwordFunction() {
    var passwordInput = document.getElementsByClassName(".password-input");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }