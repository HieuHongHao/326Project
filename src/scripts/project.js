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

    const commentsDiv = document.getElementById("comments");
    project.comments.forEach(async (comment, idx) => {
      let commenter = await api.fetchGET('api/users/' + comment.author);
      const commentHTML = await utils.loadTemplate("../components/templates/comment.html", {
        avatar: commenter.avatar,
        username: commenter.username,
        content: comment.content,
      });
      commentsDiv.appendChild(commentHTML.body.firstChild);
    });

    const commentBtn = document.getElementById("commentBtn");
    async function addComment() {
      const user = await api.isLoggedIn();
      const newContent = await document.getElementById("commentContent").value;
      const commentHTML = await utils.loadTemplate("../components/templates/comment.html", {
        avatar: user.avatar,
        username: user.username,
        content: newContent,
      });
      commentsDiv.prepend(commentHTML.body.firstChild);

      await api.fetchPOST(`api/projects/${project._id}/comments`, {
        author: user._id,
        content: newContent,
      });
    }
    commentBtn.addEventListener("click", addComment);
  }
}
