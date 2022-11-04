async function loadDash() {
  const userId = window.localStorage.getItem("loggedIn");
  if (userId !== null) {
    const res = await fetch("../users.json");
    const users = await res.json();
    const user = users.filter(x => x.id === parseInt(userId))[0];

    const username = document.getElementById("username");
    const likes = document.getElementById("likes");
    const currPosts = document.getElementById("currPosts");
    const totalPosts = document.getElementById("totalPosts");
    const comments = document.getElementById("comments");
    const created = document.getElementById("created");
    username.innerHTML = user.name;
    likes.innerHTML += user.likes + " Likes";
    currPosts.innerHTML += user.posts.length + " Current Projects";
    totalPosts.innerHTML += user.totalPosts + " Created Projects";
    comments.innerHTML += user.totalPosts + " Comments";
    created.innerHTML += user.created;
  } else {
    window.location.href = "/404";
  }
}

window.onload = loadDash;
