export const login = {
  init: async (data) => {
    const loginBtn = document.getElementById("loginSubmit");

    loginBtn.addEventListener("click", async () => {
      const loginEmail = document.getElementById("loginEmail").value;
      const loginPass = document.getElementById("loginPass").value;
      await fetch("http://localhost:3000/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": loginEmail,
          "password": loginPass
        }),
        redirect: 'follow'
      }).then(response => {
        if (response.status === 400) {
          alert("Incorrect username or password");
          return {};
        } else {
          return response.json();
        }
      }).then(result => {
        if ("token" in result) {
          window.localStorage.setItem("token", result.token);
          window.location.href = "../dashboard";
        }
      });
    })
  }
}
