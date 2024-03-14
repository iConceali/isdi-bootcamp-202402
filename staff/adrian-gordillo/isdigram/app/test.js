// presentation

(function () {
  if (!logic.isUserLoggedIn()) {
    location.href = "../login";

    return;
  }

  var home = new Component("main");

  home.assembleTo(document.body);

  try {
    var user = logic.retrieveUser();

    var title = new Component("h1");
    title.setText("Hello, " + user.name + "!");

    home.add(title);
  } catch (error) {
    showFeedback(error);
  }

  var menu = new Menu();

  home.add(menu);

  var posts = new Posts();

  home.add(posts);
})();
