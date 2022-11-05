import { utils } from './utils.js';

export const routes = {
  init: async () => {
    // List of pages
    let route = window.location.search.substring(2);
    if (route !== "") {
      if (route === 'feed') {
        await utils.loadModule(`pages/${route}.html`, 'content');
        const toAnimate = { "feed": 500, "post-tags": 250 };
        await utils.loadAnimate(toAnimate);
      } else if (route === 'forum') {
        await utils.loadModule(`pages/${route}.html`, 'content');
      } else if (route === 'dashboard') {
        await utils.loadModule(`pages/${route}.html`, 'content');
      } else if (route === 'canvas') {
        await utils.loadModule(`pages/${route}.html`, 'content');
      } else {
        await utils.load404();
      }
    } else {
      await utils.loadModule(`pages/index.html`, 'content');
    }
  }
}
