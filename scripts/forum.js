import { api } from './api.js';
export const forum = {
  init: async () => {
    function addComment() {
      console.log("hi")
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
    const commentBtn = document.getElementById("commentBtn");
    commentBtn.addEventListener("click", addComment);
  }
}
