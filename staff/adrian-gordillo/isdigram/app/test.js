(function () {
  var postList = document.querySelector(".postList");

  function showPosts() {
    var posts = data.findPosts();

    postList.innerHTML = "";

    if (posts.length > 0) {
      posts.forEach(function (post) {
        var postContainer = document.createElement("div");

        postContainer.classList.add("post");

        // Crear elementos para mostrar la información del post (imagen, texto, fecha, etc.)
        var imageElement = document.createElement("img");
        imageElement.src = post.image;
        imageElement.alt = "Post Image";

        var textElement = document.createElement("p");
        textElement.textContent = post.text;

        var dateElement = document.createElement("p");
        dateElement.textContent = "Date: " + post.date;

        // Agregar elementos al postElement
        postContainer.appendChild(imageElement);
        postContainer.appendChild(textElement);
        postContainer.appendChild(dateElement);

        // Agregar el postElement al postList
        postList.appendChild(postContainer);
      });
    } else {
      // Si no hay posts, muestra un mensaje indicando que no hay posts
      var noPostsMessage = document.createElement("p");
      noPostsMessage.textContent = "No posts available.";
      postList.appendChild(noPostsMessage);
    }
  }

  // Llama a la función para mostrar los posts al cargar la página
  showPosts();

  // Evento para actualizar la lista de posts después de crear uno nuevo
  document.addEventListener("postCreated", showPosts);
})();
