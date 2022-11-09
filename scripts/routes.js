import { utils } from './utils.js';

function isLoggedIn() {
  return window.localStorage.getItem("loggedIn") !== null;
}

async function signBtn() {
  if (!isLoggedIn()) {
    await utils.loadModule(`components/nav-login.html`, 'loginDiv');
  } else {
    await utils.loadModule(`components/nav-logout.html`, 'logoutDiv');
    document.getElementById('logoutBtn').addEventListener("click", async () => {
      await window.localStorage.removeItem('loggedIn');
      window.location.href = "/";
    });
  }
}

export const routes = {
  init: async () => {
    // List of pages
    let route = window.location.search.substring(2);
    if (route !== "") {
      if (route === 'feed') {
        signBtn();
        await utils.loadModule(`components/searchBar.html`, 'topSearch');
        await utils.loadModule(`pages/${route}.html`, 'content');
        const toAnimate = { "feed": 500, "post-tags": 250 };
        await utils.loadAnimate(toAnimate);

      } else if (route === 'forum') {
        signBtn();
        await utils.loadModule(`components/nav-account.html`, 'nav-acc');
        await utils.loadModule(`pages/${route}.html`, 'content');

      } else if (route === 'dashboard') {
        signBtn();
        await utils.loadModule(`pages/${route}.html`, 'content');

      } else if (route === 'canvas') {
        signBtn();
        await utils.loadModule(`components/nav-account.html`, 'nav-acc');
        await utils.loadModule(`pages/${route}.html`, 'content');

      } else {
        await utils.load404();
      }
    } else {
      signBtn();
      await utils.loadModule(`pages/index.html`, 'content');
    }
  }
}
