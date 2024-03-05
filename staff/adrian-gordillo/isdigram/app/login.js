(function () {
  var form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    try {
      logic.loginUser(username, password);

      form.reset();

      location.href = "./home.html";
    } catch (error) {
      alert(error.message);
    }
  });
})();
