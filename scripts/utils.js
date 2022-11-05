import autoAnimate from "../node_modules/@formkit/auto-animate/index.mjs";

export const utils = {
  // Load module
  loadModule: async (component, elementId) => {
    await fetch(component)
      .then(response => response.text())
      .then((responseText) => {
        // Get module js if it exists
        let responseJS = false;
        if (responseText.includes('<script')) {
          const jsSplit = responseText.split('<script');
          responseText = jsSplit[0];
          responseJS = jsSplit[1].split('></script>')[0];
          responseJS = responseJS.match(/"([^']+)"/)[1];
        }
        // Load module html
        document.getElementById(elementId).innerHTML = responseText;
        // Run module js
        if (responseJS) {
          fetch(responseJS)
            .then(response => response.text())
            .then((responseText) => {
              const jsFunc = new Function(responseText);
              jsFunc();
            });
        }
      });
  },
  // Load 404 page
  load404: async () => {
    window.location.href = '../pages/404.html';
  },
  // Animate {"id": time}
  loadAnimate: async (toAnimate) => {
    for (const key in toAnimate) {
      autoAnimate(document.getElementById(key), {
        duration: toAnimate[key],
      });
    }
  }
};
