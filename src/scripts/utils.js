import autoAnimate from "../node_modules/@formkit/auto-animate/index.mjs";

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

  // HTML template engine
  loadTemplate: async (template, params) => {
    const html = await fetch(template)
      .then(response => response.text())
      .then(html => {
        let names = Object.keys(params);
        let vals = Object.values(params);
        return new Function(...names, `return \`${html}\`;`)(...vals);
      });
    const parser = new DOMParser();
    return parser.parseFromString(html, 'text/html');
  },
  loadAnimate: async (toAnimate) => {
    for (const key in toAnimate) {
      autoAnimate(document.getElementById(key), {
        duration: toAnimate[key],
      });
    }
  },
};
