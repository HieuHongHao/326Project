import { utils } from './utils.js';
import { register } from './register.js';
import { feed } from './feed.js';
import { project } from './project.js';
import { dashboard } from './dashboard.js';
// import { canvas } from './canvas.js';
// import { chat } from './chat.js';
import { index } from './index.js';
import { navbar } from './navbar.js';

function isLoggedIn() {
  return window.localStorage.getItem("loggedIn") !== null;
}

async function signBtn() {
  if (!isLoggedIn()) {
    await utils.loadModule(`../components/navLogin.html`, 'loginDiv');
    await utils.loadModule('../components/login.html', 'modals');
  } else {
    await utils.loadModule(`../components/navLogout.html`, 'logoutDiv');
    await utils.loadModule(`../components/navAccount.html`, 'nav-acc');
    document.getElementById('logoutBtn').addEventListener("click", async () => {
      window.localStorage.removeItem('loggedIn');
      window.location.href = "/";
    });
  }
}

const core = {
  init: async () => {
    await utils.loadModule('../components/navbar.html', 'navbar');
    await navbar.init();
    await utils.loadModule('../components/footer.html', 'footer');
    // utils.loadModule('components/modals.html', 'modals');
    let route = window.location.pathname;
    switch (route) {
      case "/":
        signBtn();
        await utils.loadModule('../pages/index.html', 'content');
        index.init();
        break;
      case "/register":
        signBtn();
        await utils.loadModule('../pages/register.html', 'content');
        register.init();
        break;
      case "/feed":
        signBtn();
        await utils.loadModule('../components/searchBar.html', 'topSearch');
        await utils.loadModule('../pages/feed.html', 'content');
        feed.init();
        break;
      case route.match(/^\/project*/)?.input:
        signBtn();
        await utils.loadModule('../pages/project.html', 'content');
        project.init();
        break;
      case route.match(/^\/dashboard*/)?.input:
        signBtn();
        await utils.loadModule('../pages/dashboard.html', 'content');
        dashboard.init();
        break;
      case route.match(/^\/canvas*/)?.input:
        signBtn();
        break;
      default:
        await utils.load404();
        break;
    }
  },
};

core.init();
