// import autoAnimate from "../node_modules/@formkit/auto-animate/index.mjs";

export const utils = {
  // Load module
  loadModule: async (component, elementId) => {
    await fetch(component)
      .then(response => response.text())
      .then((responseText) => {
        // Load module html
        document.getElementById(elementId).innerHTML += responseText;
      });
  },
  // Load 404 page
  load404: async () => {
    await fetch("../404.html")
      .then(response => response.text())
      .then((responseText) => {
        // Load module html
        window.document.documentElement.innerHTML = responseText;
      });
  },

  // Set title
  setTitle: async (title) => {
    document.title = title;
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
};
