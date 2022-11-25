import { api } from './api.js';
import { utils } from './utils.js';
export const project = {
  init: async (project) => {
    const projectHTML = await utils.loadTemplate("../components/templates/projectPost.html", {
      avatar: project.authorID.avatar,
      username: project.authorID.username,
      title: project.title,
      content: project.content,
      likes: project.likes.length,
    });
    const whiteboardBtn = projectHTML.getElementById("whiteboard");
    whiteboardBtn.addEventListener("click", () => {
      window.location.href = "../canvas";
    });

    document.getElementById("projectPost").appendChild(projectHTML.body.firstChild);

    async function postRequest(data) {
      const response = await fetch("https://cs326project.herokuapp.com/api/projects/" + projectID + "/comments", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const response_json = await response.json();
      return response_json;
    }

    const commentsDiv = document.getElementById("comments");
    for (let i = 0; i < project.comments.length; i++) {
      let commentUser = await api.fetchData('users/' + project.comments[i].author);
      commentsDiv.innerHTML += `
        <li class="list-group-item px-0 d-flex cat-bg-light cat-text-light">
          <div class="align-top">
            <img src=${commentUser.avatar} alt="Logo" class="rounded-pill">
          </div>
          <div class="px-1">
            <div class="d-flex">
              <p class="m-0 me-2">${commentUser.username}</p>
              <p class="fs-6 fw-lighter m-0">- 1 minute ago</p>
            </div>
            <p class="fw-light">${project.comments[i].content}</p>
          </div>
        </li>`
    }

    const commentBtn = document.getElementById("commentBtn");
    async function addComment() {
      const userId = window.localStorage.getItem("loggedIn");
      const user = await api.fetchData("users/" + userId);
      const newComment = document.createElement("li");
      const newContent = document.getElementById("commentContent").value;
      newComment.classList.add('list-group-item', 'px-0', 'd-flex', 'cat-bg-light', 'cat-text-light');
      newComment.innerHTML = `
          <div class="align-top">
            <img src=${user.avatar} alt="Logo" class="rounded-pill">
          </div>
          <div class="px-1">
            <div class="d-flex">
              <p class="m-0 me-2">${user.username}</p>
              <p class="fs-6 fw-lighter m-0">- 1 minute ago</p>
            </div>
            <p class="fw-light">${newContent}</p>
          </div>`
      commentsDiv.appendChild(newComment);
      const result = await postRequest({
        author: userId,
        content: newContent,
      });
    }
    commentBtn.addEventListener("click", addComment);

    function addComment() {
      const comments = document.getElementById("comments");
      const commentContent = document.getElementById("commentContent").value;
      comments.innerHTML += `
      <li class="list-group-item px-0 d-flex cat-bg-light cat-text-light">
        <div class="align-top">
          <img src="../public/logo.svg" alt="Logo" class="rounded-pill">
        </div>
        <div class="px-1">
          <div class="d-flex">
            <p class="m-0 me-2">Username</p>
            <p class="fs-6 fw-lighter m-0">- 1 minute ago</p>
          </div>
          <p class="fw-light">${commentContent}</p>
        </div>
      </li>`
    }
  }
}
