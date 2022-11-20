import { api } from './api.js';
import { utils } from './utils.js';
export const dashboard = {
  init: async () => {
    const userId = window.localStorage.getItem("loggedIn");
    if (userId !== null) {
      // const res = await fetch("../api/users.json");
      // const users = await res.json();
      const user = await api.fetchData('users/' + userId);
      const projects = await api.fetchData('projects/author/' + userId);
      const userComments = await api.fetchData('comments/author/' + userId);
      // console.log(user)
      // console.log(projects[1])

      const pfp = document.getElementById("pfp");
      const username = document.getElementById("username");
      const likes = document.getElementById("likes");
      const currPosts = document.getElementById("currPosts");
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

      for (let i = 0; i < projects.length; i++) {
        // document.getElementById('posts').innerHTML += `
        //   <div id="postId-${projects[i]._id}" class="col">
        //     <div class="card shadow">
        //       <img alt="project image" class="card-img-top" src="../public/project_dummy_image.png">
        //       <div class="card-body p-2 border-1 rounded-bottom">
        //         <div class="d-flex justify-content-between">
        //           <div>
        //             <h5 class="card-title">${projects[i].title}</h6>
        //             <p class="cat-text-light fs-6"><i class="fa-regular fa-heart fa-l pe-1"></i> ${projects[i].likes.length} Likes</p>
        //           </div>
        //           <div class="d-flex justify-content-between">
        //             <div>
        //               <a class="btn cat-text-primary px-1" href="?=canvas"><i class="fas fa-pen fs-4"></i></a>
        //               <a id="delete-${projects[i]._id}" class="btn cat-text-danger px-1" data-bs-toggle="" data-bs-target="#deleteProject"><i
        //                   class="fas fa-trash-can fs-4"></i></a>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // `;
        
        document.getElementById("posts").innerHTML += `
        <div class="account-card-container" id="postId-${projects[i]._id}">
          <div class="card-intro">
            <img src="https://loremflickr.com/cache/resized/65535_52010666873_325f72ccc9_c_480_480_nofilter.jpg">
            <h1>${projects[i].title}</h1>
            <p>${projects[i].content.substring(0,100)}${(projects[i].content.length > 15 ? "..." : "")}</p>
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
              <tr>
                <td>1</td>
                <td><img src="https://loremflickr.com/cache/resized/65535_52010666873_325f72ccc9_c_480_480_nofilter.jpg"><span>Maria Anders</span></td>
                <td>99</td>
              </tr>
              <tr>
                <td>2</td>
                <td><img src="https://loremflickr.com/cache/resized/65535_52010666873_325f72ccc9_c_480_480_nofilter.jpg"><span>Maria Anders</span></td>
                <td>94</td>
              </tr>
            </table>
          </div>
        </div>
        `;
      }
      for (let i = 0; i < posts.length; i++) {
        document.getElementById("delete-" + posts[i].id).addEventListener("click", () => {
          document.getElementById("postId-" + posts[i].id).outerHTML = "";
        });
      }

    } else {
      window.location.href = "?=404";
    }
  }
}
