import { api } from './api.js';
export const index = {
  init: async () => {
    const posts = document.getElementById("top-projects");
    const projects = await api.fetchData('projects');
    for (let i = 0; i < 4; i++) {
      const newCard = document.createElement("div");
      newCard.id = `postId-${projects[i]._id}`
      const ranking = await api.fetchData("projects/" + projects[i]._id + "/topContributors");
      let rankingHTML = "";
      for (let j = 0; j < 3; j++) {
        if (j > ranking.length - 1) {
          rankingHTML += `
                    <tr>
                        <td>${j + 1}</td>
                        <td><span>--</span></td>
                        <td>--</td>
                    </tr>
                    `
        } else {
          rankingHTML += `
                    <tr>
                        <td>${j + 1}</td>
                        <td><img src="https://people.cs.umass.edu/~marius/marius.jpg"><span>${ranking[j].username}</span></td>
                        <td>${ranking[j].commentCount}</td>
                    </tr>
                    `
        }
      }
      newCard.innerHTML += `
                <div class="dashboard-card-container">
                <div class="card-intro">
                    <img src="https://people.cs.umass.edu/~marius/marius.jpg">
                    <h1>${projects[i].title}</h1>
                    <p>${projects[i].content.substring(0, 100)}${(projects[i].content.length > 15 ? "..." : "")}</p>
                    <div class="post-icons-container">
                    <div><i class="fa-regular fa-comment"></i><span>${projects[i].comments.length}</span></div>
                    <div><i class="fa-regular fa-heart"></i><span>${projects[i].likes.length}</span></div>
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
  }
};
