(function () {
  var form = document.querySelector("form");
  var viewPost = document.getElementById("btn-viewPost");

  viewPost.addEventListener("click", function () {
    location.href = "postView.html";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var image = document.getElementById("image").value;
    var text = document.getElementById("text").value;

    try {
      logic.createPost(image, text);

      form.reset();
    } catch (error) {
      alert(error.message);
    }
  });
})();
