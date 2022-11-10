import { api } from './api.js';
import { utils } from './utils.js';
export const dashboard = {
  init: async () => {
    const userId = window.localStorage.getItem("loggedIn");
    if (userId !== null) {
      // const res = await fetch("../api/users.json");
      // const users = await res.json();
      const users = await api.fetchData('users');
      const user = users.users.filter(x => x.id === parseInt(userId))[0];

      const pfp = document.getElementById("pfp");
      const username = document.getElementById("username");
      const likes = document.getElementById("likes");
      const currPosts = document.getElementById("currPosts");
      const totalPosts = document.getElementById("totalPosts");
      const comments = document.getElementById("comments");
      const created = document.getElementById("created");
      pfp.src = user.avatar;
      username.innerHTML = user.name;
      likes.innerHTML += user.likes + " Likes";
      currPosts.innerHTML += user.posts.length + " Current Projects";
      totalPosts.innerHTML += user.totalPosts + " Created Projects";
      comments.innerHTML += user.totalPosts + " Comments";
      created.innerHTML += user.created;

      console.log(user)
      for (let i = 0; i < user.posts.length; i++) {
        await fetch(`components/searchBar.html`)
          .then(response => response.text())
          .then((responseText) => {
            // Get module js if it exists
            let responseJS = false;
            if (responseText.includes('<script')) {
              const jsSplit = responseText.split('<script');
              responseText = jsSplit[0];
              responseJS = jsSplit[1].split('></script>')[0];
              responseJS = responseJS.match(/"([^']+)"/)[1];
            }
            // Load module html
            document.getElementById('posts').innerHTML += responseText;
            // Run module js
            if (responseJS) {
              fetch(responseJS)
                .then(response => response.text())
                .then((responseText) => {
                  const jsFunc = new Function(responseText);
                  jsFunc();
                });
            }
          });
      }

    } else {
      window.location.href = "?=404";
    }
  }
}
