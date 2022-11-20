import { api } from './api.js';
import { utils } from './utils.js';
export const dashboard = {
  init: async () => {
    const userId = window.localStorage.getItem("loggedIn");
    if (userId !== null) {
      // const res = await fetch("../api/users.json");
      // const users = await res.json();
      const user = await api.fetchData('users/' + userId);

      const pfp = document.getElementById("pfp");
      const username = document.getElementById("username");
      const likes = document.getElementById("likes");
      const currPosts = document.getElementById("currPosts");
      const totalPosts = document.getElementById("totalPosts");
      const comments = document.getElementById("comments");
      const created = document.getElementById("created");
      pfp.src = user.avatar;
      username.innerHTML = user.username;
      likes.innerHTML += user.likes + " Likes";
      currPosts.innerHTML += user.posts.length + " Current Projects";
      totalPosts.innerHTML += user.totalPosts + " Created Projects";
      comments.innerHTML += user.totalPosts + " Comments";
      created.innerHTML += user.created;

      const allPosts = await api.fetchData('posts');
      const postIds = user.posts;

      const posts = allPosts.posts.filter(x => postIds.includes(x.id));

      for (let i = 0; i < posts.length; i++) {
        document.getElementById('posts').innerHTML += `
          <div id="postId-${posts[i].id}" class="col">
            <div class="card shadow">
              <img alt="project image" class="card-img-top" src="../public/project_dummy_image.png">
              <div class="card-body p-2 border-1 rounded-bottom">
                <div class="d-flex justify-content-between">
                  <div>
                    <h5 class="card-title">${posts[i].title}</h6>
                    <p class="cat-text-light fs-6"><i class="fa-regular fa-heart fa-l pe-1"></i> ${posts[i].likes} Likes</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div>
                      <a class="btn cat-text-primary px-1" href="?=canvas"><i class="fas fa-pen fs-4"></i></a>
                      <a id="delete-${posts[i].id}" class="btn cat-text-danger px-1" data-bs-toggle="" data-bs-target="#deleteProject"><i
                          class="fas fa-trash-can fs-4"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
      for (let i = 0; i < posts.length; i++) {
        document.getElementById("delete-" + posts[i].id).addEventListener("click", () => {
          document.getElementById("postId-" + posts[i].id).outerHTML = "";
        });
      }

    } else {
      window.location.href = "?=404";
    }
  }
}
