(function () {
  if (logic.isUserLoggedIn()) {
    location.href = "../home";

    return;
  }

  var form = document.querySelector("form");
  var a = document.querySelector("a");

  a.href = "../register";

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    try {
      logic.loginUser(username, password);

      form.reset();

      location.href = "../home";
    } catch (error) {
      console.log(error);

      alert(error.message);
    }
  });
})();
