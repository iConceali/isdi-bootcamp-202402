var form = document.querySelector("form");
var loginLink = document.querySelector("a");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  var name = document.getElementById("name").value;
  var birthdate = document.getElementById("birthdate").value;
  var email = document.getElementById("email").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  try {
    registerUser(name, birthdate, email, username, password);

    form.reset();

    loginLink.click();
  } catch (error) {
    alert(error.message);
  }
});
