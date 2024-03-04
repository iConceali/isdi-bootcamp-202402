var form = document.querySelector("form");
var registerLink = document.querySelector("a");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  var usernameInput = document.getElementById("username");
  var username = usernameInput.value;

  var passwordInput = document.getElementById("password");
  var password = passwordInput.value;

  try {
    loginUser(username, password);

    form.reset();

    location.href = "./home.html";
  } catch (error) {
    alert(error.message);
  }
});
