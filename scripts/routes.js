import { utils } from './utils.js';
import { feed } from './feed.js';
import { dashboard } from './dashboard.js';
import { canvas } from './canvas.js';
import {chat} from './chat.js';

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
      // Run feed 
      if (route === 'feed') {
        signBtn();
        utils.setTitle("Feed");
        await utils.loadModule(`components/searchBar.html`, 'topSearch');
        await utils.loadModule(`pages/${route}.html`, 'content');
        const toAnimate = { "feed": 500, "post-tags": 250 };
        await feed.init();
        await utils.loadAnimate(toAnimate);

        // Run forum
      } else if (route === 'forum') {
        signBtn();
        utils.setTitle("Forum");
        await utils.loadModule(`components/nav-account.html`, 'nav-acc');
        await utils.loadModule(`pages/${route}.html`, 'content');

        // Run dashboard 
      } else if (route === 'dashboard') {
        signBtn();
        utils.setTitle("Dashboard");
        await utils.loadModule(`pages/${route}.html`, 'content');
        await dashboard.init();

        // Run canvas 
      } else if (route === 'canvas') {
        signBtn();
        utils.setTitle("Canvas");
        await utils.loadModule(`components/nav-account.html`, 'nav-acc');
        await utils.loadModule(`pages/${route}.html`, 'content');
        await canvas.init();
        await chat.init();

        // Run 404
      } else {
        await utils.load404();
      }
    } else {
      signBtn();
      await utils.loadModule(`pages/index.html`, 'content');
    }
  }
}
