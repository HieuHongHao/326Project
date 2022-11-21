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
        console.log(username)
        console.log(email)
        console.log(password)

        if (password === repeatPassword) {
          await fetch('https://cs326project.herokuapp.com/api/users', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
            })
            // body: '{"username": "Peter Phan", "email": "test@gmail.com", "password": "abc123", "avatar": "https://loremflickr.com/480/480/people?lock=54934","favouriteTechStack": ["PostgreSQL", "Java", "Python"]}'
          }).then(response => console.log(response.status));
          document.location = "/?=feed";
        } else {
          alert("Password is not the same");
        }
      })
    }
  }
};
