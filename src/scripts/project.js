import { api } from './api.js';
import { utils } from './utils.js';
export const project = {
  init: async (project) => {
    const user = await api.isLoggedIn();
    const newest = await api.fetchGET('api/projects?limit=99');
    const top = await api.fetchGET('api/projects?sort=-likeNumber');
    console.log(newest[0])
    const leftColumn = (await utils.loadTemplate('../components/templates/leftColumn.html', {
      title: newest[0].title,
      link: "../project?=" + newest[0]._id,
      title1: top[0].title,
      link1: "../project?=" + top[0]._id,
      title2: top[1].title,
      link2: "../project?=" + top[1]._id,
      title3: top[2].title,
      link3: "../project?=" + top[2]._id,
    })).body.firstChild;
    document.getElementById('leftColumn').append(leftColumn);
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
    const relatedProjectColumn = document.getElementById("right-bar-card-body");
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
    function toProject(project) {
      return () => window.location.href = "../project?=" + project;
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
    const relatedProjects = await Promise.all(
      project.tags.map(tag => api.fetchGET(`api/projects/?tags=${tag}&limit=2`))
    )
    console.log(relatedProjects);
    let seen_projects = new Set();
    seen_projects.add(project.title);
    for(const row of relatedProjects){
      for(const proj of row){
        if(seen_projects.has(proj.title)){
          continue;
        }
        seen_projects.add(proj.title);
        const h6 = document.createElement("h6");
        h6.classList.add("d-inline-block");
        h6.classList.add("fw-bold");
        h6.innerHTML = proj.title;
        h6.addEventListener("click", toProject(proj.id))
        const badgeContainer = document.createElement("div");
        badgeContainer.classList.add("d-inline-block");
        badgeContainer.classList.add("btn");
        badgeContainer.classList.add("float-left");
        for (const tag of proj.tags) {
          const badge = document.createElement("div");
          badge.classList.add("badge");
          badge.classList.add(tagStyles[tag]);
          badge.innerHTML = tag;
          badgeContainer.appendChild(badge);
        }
        relatedProjectColumn.appendChild(h6);
        relatedProjectColumn.appendChild(badgeContainer);
      }
    }
  }
}
