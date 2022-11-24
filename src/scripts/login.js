export const login = {
  init: async (data) => {
    const loginBtn = document.getElementById("loginSubmit");
    loginBtn.addEventListener("click", async () => {
      await fetch("http://localhost:3000/user/me", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3ZjFiZWM4OWE5ZTZiMDc0YzBkMzUxIn0sImlhdCI6MTY2OTI4MjYyMywiZXhwIjoxNjY5Mjg2MjIzfQ.bZ4VzlM2Xf-Kh7eIkN4JhXA1y-cPmMeemNMzkXQYNmQ'
        },
        redirect: 'follow'
      }).then(response => response.text())
        .then(result => {
          console.log(result);
          window.location.href = '/';
        })
        .catch(error => console.log('error', error));
    })
  }
}
