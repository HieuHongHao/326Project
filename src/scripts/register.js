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
          await fetch('http://localhost:3000/user/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
              avatar: "https://people.cs.umass.edu/~marius/marius.jpg"
            }),
            redirect: 'follow',
          }).then(response => {
            return (response.status === 400) ? alert("Invalid email or password") : response.text();
          }).then(result => {
            console.log(result);
          });
        } else {
          alert("Password is not the same");
        }
      })
    }
  }
};
