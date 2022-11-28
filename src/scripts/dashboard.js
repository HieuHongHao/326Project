import { api } from './api.js';
import { utils } from './utils.js';
export const dashboard = {
  init: async (user) => {
    const projects = await api.fetchGET('api/projects/author/' + user._id);
    const userComments = await api.fetchGET('api/comments/author/' + user._id);

    const pfp = document.getElementById("pfp");
    const username = document.getElementById("username");
    const likes = document.getElementById("likes");
    const totalPosts = document.getElementById("totalPosts");
    const comments = document.getElementById("comments");
    const created = document.getElementById("created");
    pfp.src = user.avatar;
    username.innerHTML = user.username;
    likes.innerHTML += projects.reduce((acc, e) => acc += e.likes.length, 0) + " Likes";
    totalPosts.innerHTML += projects.length + " Projects";
    comments.innerHTML += userComments.length + " Comments";
    const createDate = new Date(user.dateCreated.toString().substring(0, 10));
    created.innerHTML += createDate.toDateString();

    const posts = document.getElementById("posts");
    await projects.forEach(async (project, idx) => {
      const ranking = await api.fetchGET("api/projects/" + project._id + "/topContributors");
      const newCard = await utils.loadTemplate('../components/templates/dashboardCard.html', {
        projectID: `project-${project._id}`,
        title: project.title,
        content: project.content.substring(0, 100) + ((project.content.length > 100) ? "..." : ""),
        comments: project.comments.length,
        likes: project.likeNumber,
        trashID: `trash-${project._id}`,
        rank1User: (ranking[0]) ? ranking[0].username : '-',
        rank1Avatar: (ranking[0]) ? "https://people.cs.umass.edu/~marius/marius.jpg" : '',
        rank1Score: (ranking[0]) ? ranking[0].commentCount : '-',
        rank2User: (ranking[1]) ? ranking[1].username : '-',
        rank2Avatar: (ranking[1]) ? "https://people.cs.umass.edu/~marius/marius.jpg" : '',
        rank2Score: (ranking[1]) ? ranking[1].commentCount : '-',
        rank3User: (ranking[2]) ? ranking[2].username : '-',
        rank3Avatar: (ranking[2]) ? "https://people.cs.umass.edu/~marius/marius.jpg" : '',
        rank3Score: (ranking[2]) ? ranking[2].commentCount : '-',
      });
      
      
      function toProject() {
        return () => window.location.href = "../project?=" + project._id;
      }

      // function likeBtn() {
      //   return async () => {
      //     const likes = await postRequest({ user }, `/${project._id}/like`);
      //     like.innerHTML = `<div id="like-0"><i class="fa-regular fa-heart"></i><span>${likes}</span></div>`;
      //   }
      // }

      newCard.getElementById('title').addEventListener("click", toProject(project._id));
      newCard.getElementById('content').addEventListener("click", toProject(project._id));
      // const like = newCard.getElementById('like');
      // like.addEventListener("click", likeBtn(like, project));

      posts.appendChild(newCard.body.firstChild);
      document.getElementById("trash-" + project._id).addEventListener("click", async () => {
        await api.fetchPOST(`api/projects/delete/${project._id}`, {});
        document.getElementById("project-" + project._id).outerHTML = "";
      });
    });

  }
}
