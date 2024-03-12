(function () {
  if (logic.isUserLoggedIn()) {
    location.href = "../home";

    return;
  }

  var form = document.querySelector("form");
  var a = document.querySelector("a");

  a.href = "../login";

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var birthdate = document.getElementById("birthdate").value;
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    try {
      logic.registerUser(name, birthdate, email, username, password);

      form.reset();

      location.href = "../login";
    } catch (error) {
      alert(error.message);
    }
  });
})();
