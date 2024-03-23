var editButton = document.createElement("button");

editButton.innerText = "📝";

editButton.onclick = function () {
  var textInput = editPostForm.querySelector("#text");

  textInput.value = post.text;

  editPostForm.onsubmit = function (event) {
    event.preventDefault();

    var text = textInput.value;

    try {
      logic.modifyPost(post.id, text);

      editPostForm.reset();

      editPostSection.style.display = "";

      renderPosts();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  editPostSection.style.display = "block";
};

// article.append(editButton);
