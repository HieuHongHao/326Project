import { api } from './api.js';
import { utils } from './utils.js';
export const index = {
  init: async () => {
    const posts = document.getElementById("top-projects");


    document.getElementById("top-projects").addEventListener("DOMSubtreeModified", function() {
      const children = posts.children;
      if (children.length === 0) {
        document.getElementById("loader").style.display = "block";
      }
      else if (children.length > 0) {
        document.getElementById("loader").style.display = "none";
      }
    })
    console.time("Fetching posts");
    const projects = await api.fetchGET('api/projects?sort=-likeNumber');
    // console.timeEnd("Fetching posts");
    let rankings = [];
    // console.time("Fetching top contributors");
    for (let i = 0; i < 4; i++) {
      rankings.push(api.fetchGET("api/projects/" + projects[i]._id + "/topContributors"));
    }
    rankings = await Promise.all(rankings);
    // console.timeEnd("Fetching top contributors");
    const newCards = await Promise.all(rankings.map((ranking, i) => {
      return utils.loadTemplate('../components/templates/introCard.html', {
        title: projects[i].title,
        content: projects[i].content.substring(0, 100) + ((projects[i].content.length > 100) ? "..." : ""),
        comments: projects[i].comments.length,
        likes: projects[i].likeNumber,
        rank1User: (ranking[0]) ? ranking[0].username : '-',
        rank1Avatar: (ranking[0]) ? ranking[0].avatar : '',
        rank1Score: (ranking[0]) ? ranking[0].commentCount : '-',
        rank2User: (ranking[1]) ? ranking[1].username : '-',
        rank2Avatar: (ranking[1]) ? ranking[1].avatar : '',
        rank2Score: (ranking[1]) ? ranking[1].commentCount : '-',
        rank3User: (ranking[2]) ? ranking[2].username : '-',
        rank3Avatar: (ranking[2]) ? ranking[2].avatar : '',
        rank3Score: (ranking[2]) ? ranking[2].commentCount : '-',
      });
    }))
    // for (let i = 0; i < 4; i++) {
    //   const ranking = await api.fetchGET("api/projects/" + projects[i]._id + "/topContributors");
    //   const newCard = await utils.loadTemplate('../components/templates/introCard.html', {
    //     title: projects[i].title,
    //     content: projects[i].content.substring(0, 100) + ((projects[i].content.length > 100) ? "..." : ""),
    //     comments: projects[i].comments.length,
    //     likes: projects[i].likeNumber,
    //     rank1User: (ranking[0]) ? ranking[0].username : '-',
    //     rank1Avatar: (ranking[0]) ? "https://people.cs.umass.edu/~marius/marius.jpg" : '',
    //     rank1Score: (ranking[0]) ? ranking[0].commentCount : '-',
    //     rank2User: (ranking[1]) ? ranking[1].username : '-',
    //     rank2Avatar: (ranking[1]) ? "https://people.cs.umass.edu/~marius/marius.jpg" : '',
    //     rank2Score: (ranking[1]) ? ranking[1].commentCount : '-',
    //     rank3User: (ranking[2]) ? ranking[2].username : '-',
    //     rank3Avatar: (ranking[2]) ? "https://people.cs.umass.edu/~marius/marius.jpg" : '',
    //     rank3Score: (ranking[2]) ? ranking[2].commentCount : '-',
    //   });
    //   posts.appendChild(newCard.body.firstChild);
    // }

    for (const card of newCards) {
      posts.appendChild(card.body.firstChild);
    }
    console.timeEnd("Fetching posts");
  }
};
