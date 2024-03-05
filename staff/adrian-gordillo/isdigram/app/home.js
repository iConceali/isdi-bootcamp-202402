(function () {
  var title = document.querySelector("h1");
  var logoutButton = document.getElementById("btn-logout");

  try {
    var user = logic.retrieveUser();

    title.innerText = "Hello, " + user.name + "!";
  } catch (error) {
    alert(error.message);
  }

  logoutButton.addEventListener("click", function () {
    logic.logoutUser();

    location.href = "./home.html";
  });
})();
