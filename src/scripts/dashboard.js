import { api } from "./api.js";
import { utils } from "./utils.js";
import { Chart } from "./chart.js/auto/auto.js";
export const dashboard = {
  init: async (user) => {
    const userStats = await api.fetchGET("api/users/" + user._id + "/stats");
    const statHTMl = await utils.loadTemplate(
      "../components/templates/stats.html",
      {
        commits: userStats.reduce((acc, e) => (acc += e.chatCommits), 0),
        uptime: Math.round(
          userStats.reduce((acc, e) => (acc += e.duration), 0) / 60000
        ),
      }
    );
    const chart = new Chart(document.getElementById("user-stats-graph"), {
      type: "bar",
      data: {
        labels: userStats
          .filter((row) => row.project != null)
          .map((row) => (row.project.title.length > 10) ? row.project.title.substring(0, 10) + "..." : row.project.title),
        datasets: [
          {
            label: "Times in canvas",
            data: userStats.map((row) => row.duration / 60000),
            backgroundColor: "#c6d0f5",
            borderWidth: 1,
            barPercentage: 0.5,
            barThickness: 16,
            xAxisID: 'x',
          },
          {
            label: "Chat Commits in canvas",
            data: userStats.filter((row) => row.project != null).map((row) => {
              // console.log(row.project.title, row.chatCommits);
              return row.chatCommits;
            }),
            backgroundColor: "#6e738d",
            borderWidth: 1,
            barPercentage: 0.5,
            barThickness: 16,
            xAxisID: 'x1',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: "#c6d0f5",
              font: { size: 16 },
            },
            border: {
              color: "#c6d0f5",
            },
            position: "top",
          },
          x1: {
            beginAtZero: true,
            ticks: {
              color: "#c6d0f5",
              font: { size: 16 },
            },
            border: {
              color: "#c6d0f5",
            },
            position: "bottom",
          },
          y: {
            ticks: {
              color: "#c6d0f5",
              font: { size: 16 },
            },
            border: {
              color: "#c6d0f5",
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "User Stats",
            fullSize: true,
            font: {
              weight: "bold",
              size: 20,
            },
            color: "#c6d0f5",
          },
          legend: {
            labels: {
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });
    document.getElementById("stats").appendChild(statHTMl.body.firstChild);
    const projects = await api.fetchGET("api/projects/author/" + user._id);
    const userComments = await api.fetchGET("api/comments/author/" + user._id);

    const pfp = document.getElementById("pfp");
    const username = document.getElementById("username");
    const likes = document.getElementById("likes");
    const totalPosts = document.getElementById("totalPosts");
    const comments = document.getElementById("comments");
    const created = document.getElementById("created");
    pfp.src = user.avatar;
    username.innerHTML = user.username;
    likes.innerHTML +=
      projects.reduce((acc, e) => (acc += e.likes.length), 0) + " Likes";
    totalPosts.innerHTML += projects.length + " Projects";
    comments.innerHTML += userComments.length + " Comments";
    const createDate = new Date(user.dateCreated.toString().substring(0, 10));
    created.innerHTML += createDate.toDateString();

    const posts = document.getElementById("posts");

    await projects.forEach(async (project, idx) => {
      const ranking = await api.fetchGET(
        "api/projects/" + project._id + "/topContributors"
      );
      const newCard = await utils.loadTemplate(
        "../components/templates/dashboardCard.html",
        {
          projectID: `project-${project._id}`,
          title: project.title,
          content:
            project.content.substring(0, 100) +
            (project.content.length > 100 ? "..." : ""),
          comments: project.comments.length,
          likes: project.likeNumber,
          trashID: `trash-${project._id}`,
          rank1User: ranking[0] ? ranking[0].username : "-",
          rank1Avatar: ranking[0] ? ranking[0].avatar : "",
          rank1Score: ranking[0] ? ranking[0].commentCount : "-",
          rank2User: ranking[1] ? ranking[1].username : "-",
          rank2Avatar: ranking[1] ? ranking[1].avatar : "",
          rank2Score: ranking[1] ? ranking[1].commentCount : "-",
          rank3User: ranking[2] ? ranking[2].username : "-",
          rank3Avatar: ranking[2] ? ranking[2].avatar : "",
          rank3Score: ranking[2] ? ranking[2].commentCount : "-",
        }
      );

      function toProject() {
        return () => (window.location.href = "../project?=" + project._id);
      }

      // function likeBtn() {
      //   return async () => {
      //     const likes = await postRequest({ user }, `/${project._id}/like`);
      //     like.innerHTML = `<div id="like-0"><i class="fa-regular fa-heart"></i><span>${likes}</span></div>`;
      //   }
      // }

      newCard
        .getElementById("title")
        .addEventListener("click", toProject(project._id));
      newCard
        .getElementById("content")
        .addEventListener("click", toProject(project._id));
      newCard
        .getElementById("visit")
        .addEventListener("click", toProject(project._id));

      // const like = newCard.getElementById('like');
      // like.addEventListener("click", likeBtn(like, project));
      posts.appendChild(newCard.body.firstChild);
      document
        .getElementById("trash-" + project._id)
        .addEventListener("click", async () => {
          await api.fetchPOST(`api/projects/delete/${project._id}`, {});
          document.getElementById("project-" + project._id).outerHTML = "";
        });
    });

    document.getElementById("changePassBtn").addEventListener("click", async () => {
      const newPass = document.getElementById("newPass").value;
      const confirmPass = document.getElementById("confirmPass").value;
      if (newPass === confirmPass) {
        const test = await api.fetchPUT("api/users/" + user._id, { password: newPass });
        window.localStorage.removeItem('token');
        window.location.href = "/";
      } else {
        alert("Passwords do not match");
      }
    });

    document.getElementById("deleteAcc").addEventListener("click", async () => {
      const pass = document.getElementById("deleteAccPass").value;
      await api.fetchPOST("api/users/delete/" + user._id, { password: pass });
      window.localStorage.removeItem('token');
      window.location.href = "/";
    });




  },
};
