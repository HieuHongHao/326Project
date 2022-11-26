import { api } from './api.js';

export const register = {
  init: async () => {
    if (window.localStorage.getItem("loggedIn") !== null) {
      document.location = "/?=404"
    } else {
      const btn = document.getElementById('register-btn');
      btn.addEventListener("click", async () => {
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const repeatPassword = document.getElementById("repeatPassword").value;

        if (!username || !email || !password || !repeatPassword) {
          alert("Missing information");
          return;
        }

        if (password === repeatPassword) {
          await api.fetchPOST("user/signup", {
            username: username,
            email: email,
            password: password,
            avatar: "https://people.cs.umass.edu/~marius/marius.jpg"
          })
        } else {
          alert("Password is not the same");
        }
      })
    }
  }
};
