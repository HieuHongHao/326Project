import { utils } from './utils.js';

export const routes = {
  init: async () => {
    // List of pages
    const pages = ['feed', 'forum', 'dashboard', 'canvas'];
    let route = window.location.search.substring(2);
    if (route !== "") {
      if (pages.includes(route)) {
        await utils.loadModule(`pages/${route}.html`, 'content');
      } else {
        await utils.load404();
      }
    } else {
      await utils.loadModule(`pages/index.html`, 'content');
    }
  }
}
