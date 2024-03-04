//var users = localStorage.users ? JSON.parse(localStorage.users) : [];

if (localStorage.users) {
  var users = JSON.parse(localStorage.users);
} else {
  users = [];
}
