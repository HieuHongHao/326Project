import { api } from './api.js';
export const forum = {
  init: async () => {
    const projectID = window.localStorage.getItem("projectID");
    const project = await api.fetchData('projects/' + projectID);

    const usernameDiv = document.getElementById("username");
    const avatarDiv = document.getElementById("avatar");
    const titleDiv = document.getElementById("title");
    const contentDiv = document.getElementById("projectContent");
    const likesDiv = document.getElementById("likes");
    const whiteboardBtn = document.getElementById("whiteboard");
    usernameDiv.innerHTML = project.authorID.username;
    avatarDiv.src = project.authorID.avatar;
    titleDiv.innerHTML = project.title;
    contentDiv.innerHTML = project.content;
    likesDiv.innerHTML += ` ${project.likes.length} likes`
    whiteboardBtn.addEventListener("click", () => {
      window.location.href = "?=canvas";
    });

    async function postRequest(data) {
      // const response = await fetch("https://cs326project.herokuapp.com/api/projects/" + projectID + "/comments", {
      const response = await fetch("http://localhost:9000/api/projects/" + projectID + "/comments", {
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

    // function addComment() {
    //   const comments = document.getElementById("comments");
    //   const commentContent = document.getElementById("commentContent").value;
    //   comments.innerHTML += `
    //   <li class="list-group-item px-0 d-flex cat-bg-light cat-text-light">
    //     <div class="align-top">
    //       <img src="../public/logo.svg" alt="Logo" class="rounded-pill">
    //     </div>
    //     <div class="px-1">
    //       <div class="d-flex">
    //         <p class="m-0 me-2">Username</p>
    //         <p class="fs-6 fw-lighter m-0">- 1 minute ago</p>
    //       </div>
    //       <p class="fw-light">${commentContent}</p>
    //     </div>
    //   </li>`
    // }
  }
}
