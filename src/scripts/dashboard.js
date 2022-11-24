import { api } from './api.js';
import { utils } from './utils.js';
export const dashboard = {
  init: async (user) => {
    // const res = await fetch("../api/users.json");
    // const users = await res.json();
    const projects = await api.fetchData('projects/author/' + user._id);
    const userComments = await api.fetchData('comments/author/' + user._id);
    // console.log(user)
    // console.log(projects[1])

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
    created.innerHTML += user.dateCreated.toString("dd MMMM");

    // const allPosts = await api.fetchData('posts');
    // const postIds = user.posts;

    // const posts = allPosts.posts.filter(x => postIds.includes(x.id));

    const posts = document.getElementById("posts");
    for (let i = 0; i < projects.length; i++) {
      const newCard = document.createElement("div");
      newCard.id = `postId-${projects[i]._id}`
      const ranking = await api.fetchData("projects/" + projects[i]._id + "/topContributors");
      let rankingHTML = "";
      for (let i = 0; i < 5; i++) {
        if (i > ranking.length - 1) {
          rankingHTML += `
              <tr>
                <td>${i + 1}</td>
                <td><span>--</span></td>
                <td>--</td>
              </tr>
              `
        } else {
          rankingHTML += `
              <tr>
                <td>${i + 1}</td>
                <td><img src="https://loremflickr.com/cache/resized/65535_52010666873_325f72ccc9_c_480_480_nofilter.jpg"><span>${ranking[i].username}</span></td>
                <td>${ranking[i].commentCount}</td>
              </tr>
              `
        }
      }


      newCard.innerHTML += `
        <div class="account-card-container">
          <div class="card-intro">
            <img src="https://loremflickr.com/cache/resized/65535_52010666873_325f72ccc9_c_480_480_nofilter.jpg">
            <h1>${projects[i].title}</h1>
            <p>${projects[i].content.substring(0, 100)}${(projects[i].content.length > 15 ? "..." : "")}</p>
            <div class="post-icons-container">
              <div><i class="fa-solid fa-share-from-square"></i><span>Visit</span></div>
              <div ><i class="fa-regular fa-heart"></i><span>${projects[i].likes.length} </span></div>
              <div id="edit-${projects[i]._id}"><i class="fa-regular fa-pen-to-square"></i><span>Edit</span></div>
              <div id="delete-${projects[i]._id}"><i class="fas fa-trash-can"></i><span>Delete</span></div>
            </div>
          </div>
          <div class="leaderboard card-leaderboard">
            <table>
              <tr>
                <th>RANK</th>
                <th></th>
                <th>COMMITS</th>
              </tr>
              ${rankingHTML}
            </table>
          </div>
        </div>
        `;
      posts.appendChild(newCard);
    }
    for (let i = 0; i < projects.length; i++) {
      document.getElementById("delete-" + projects[i]._id).addEventListener("click", async () => {
        await fetch('https://cs326project.herokuapp.com/api/projects/delete/' + projects[i]._id).then(res => res.text()).then(res => console.log(res))
        document.getElementById("postId-" + projects[i]._id).outerHTML = "";
      });
    }
  }
}
