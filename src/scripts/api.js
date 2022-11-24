export const api = {
  fetchData: async (data) => {
    const URL = "https://cs326project.herokuapp.com/api/";
    let response = await fetch(URL + data);
    if (response.ok) {
      return await response.json();
    }
  },

  // Return user if they are logged in, otherwise return undefined
  isLoggedIn: async () => {
    const token = window.localStorage.getItem("token");
    let user;
    await fetch("http://localhost:3000/user/me", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
      redirect: 'follow'
    }).then(response => {
      if (response.status !== 200) {
        return undefined;
      } else {
        return response.json();
      }
    }).then(result => {
      user = result;
    });
    return user;
  }
}
