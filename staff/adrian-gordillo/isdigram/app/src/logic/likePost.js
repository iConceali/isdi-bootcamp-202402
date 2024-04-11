import { validate, errors } from "com";

function likePost(postId) {
  validate.text(postId, "postId", true);

  const post = db.posts.findOne((post) => post.id === postId);

  if (!post) throw new Error("post not found");

  const userId = sessionStorage.userId;

  if (post.likes.includes(userId)) {
    // Si el usuario ya ha dado like, lo eliminamos
    post.likes = post.likes.filter((id) => id !== userId);
  } else {
    // Si el usuario no ha dado like, lo añadimos
    post.likes.push(userId);
  }

  db.posts.updateOne(post);
}

export default likePost;
