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

  setTitle: async (title) => {
    document.title = title;
  },
};
