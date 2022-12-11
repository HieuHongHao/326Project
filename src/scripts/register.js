import { api } from './api.js';

export const register = {
  init: async () => {
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
        const result = await api.fetchPOST("user/signup", {
          username: username,
          email: email,
          password: password,
          avatar: "https://loremflickr.com/480/480/people?lock=39714"
        });
        if ("token" in result) {
          window.localStorage.setItem("token", result.token);
          window.location.href = "../dashboard";
        } else {
          alert(result.message)
        }
      } else {
        alert("Password is not the same");
      }
    })
  }
};
