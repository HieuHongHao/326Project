import { api } from './api.js';
import { utils } from './utils.js';
export const project = {
  init: async (project) => {
    const user = await api.isLoggedIn();
    const projectHTML = await utils.loadTemplate("../components/templates/projectPost.html", {
      avatar: project.authorID.avatar,
      username: project.authorID.username,
      title: project.title,
      content: project.content,
      likes: project.likes.length,
    });
    const tagStyles = {
      React: "pn-card-type-blue",
      Java: "pn-card-type-red",
      Python: "pn-card-type-yellow",
      Go: "pn-card-type-light-sea-green",
      PostgreSQL: "pn-card-type-blue",
      Android: "pn-card-type-blue",
      Guava: "pn-card-type-blue"
    };
    function createTag(tags) {
      const tagWrapper = document.createElement("div");
      tagWrapper.classList.add("tag-container");
      for (const tag of tags) {
        const tagElement = document.createElement("div");
        tagElement.innerHTML = tag;
        tagElement.classList.add("badge");
        tagElement.classList.add("me-2");
        tagElement.classList.add(tagStyles[tag]);
        tagWrapper.appendChild(tagElement);
      }
      return tagWrapper;
    }

    function toProfile(user) {
      return () => window.location.href = "../profile?=" + user;
    }

    projectHTML.getElementsByClassName('tags')[0].appendChild(createTag(project.tags));

    const commentsDiv = document.getElementById("comments");
    project.comments.forEach(async (comment, idx) => {
      let commenter = await api.fetchGET('api/users/' + comment.author);
      const commentHTML = await utils.loadTemplate("../components/templates/comment.html", {
        avatar: commenter.avatar,
        username: commenter.username,
        content: comment.content,
        date: comment.createdAt.substring(0, 10)
      });
      commentsDiv.appendChild(commentHTML.body.firstChild);
    });

    async function addComment() {
      const newContent = await document.getElementById("commentContent").value;
      const commentHTML = await utils.loadTemplate("../components/templates/comment.html", {
        avatar: user.avatar,
        username: user.username,
        content: newContent,
        date: new Date().toJSON().slice(0, 10).replace(/-/g, '-')
      });
      commentsDiv.prepend(commentHTML.body.firstChild);

      await api.fetchPOST(`api/projects/${project._id}/comments`, {
        author: user._id,
        content: newContent,
      });
    }
    const commentBtn = document.getElementById("commentBtn");
    if (user !== undefined) {
      commentBtn.addEventListener("click", addComment);
      const whiteboardBtn = projectHTML.getElementById("whiteboard");
      whiteboardBtn.addEventListener("click", () => {
        window.location.href = "../canvas?=" + project._id;
      });
      document.getElementById("projectPost").appendChild(projectHTML.body.firstChild);
    } else {
      document.getElementById("projectPost").appendChild(projectHTML.body.firstChild);
      document.getElementById("commentInput").outerHTML = "";
      document.getElementById("whiteboardContainer").outerHTML = "";
    }
    
    document.getElementById('author').addEventListener('click', toProfile(project.authorID._id))
    
  }
}
