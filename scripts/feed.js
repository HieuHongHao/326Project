'use strict';

async function getFeed() {
  const feed = document.getElementById("feed");
  let res = await fetch("../posts.json");
  const posts = await res.json();
  res = await fetch("../users.json");
  const users = await res.json();

  for (let i = 0; i < posts.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `<div class="d-flex flex-column cat-bg-light cat-text-light my-3 border rounded-3 feed-post">
  <div class="px-3 pt-3">
    <img src="` + users[posts[i].authorId].avatar + `" alt="Logo" class="rounded-circle">
      <span class="ms-1"><a href="" class="cat-text-light text-decoration-none">` + users[posts[i].authorId].name + `</a></span>
  </div>
  <div id="content1" class="px-3">
    <p class="fs-4 fw-bold m-0">Project Name 1</p>
    <div class="pb-4">` + posts[i].content +
      `</div>
    <p class="cat-text-light"><i class="fa-regular fa-heart fa-xl pe-1"></i> ` + posts[i].likes + `</p>
  </div>
</div>`;
    feed.appendChild(newDiv);
  }
}

window.onload = getFeed;
