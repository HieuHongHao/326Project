import { utils } from './utils.js';
import { api } from './api.js';
import { register } from './register.js';
import { feed } from './feed.js';
import { project } from './project.js';
import { dashboard } from './dashboard.js';
import { canvas } from './canvas.js';
import { chat } from './chat.js';
import { index } from './index.js';
import { navbar } from './navbar.js';
import { login } from './login.js';
import {socket} from './socketInstance.js';


function isLoggedIn() {
  return window.localStorage.getItem("token") !== null;
}

async function signBtn() {
  if (!isLoggedIn()) {
    await utils.loadModule(`../components/navLogin.html`, 'loginDiv');
    await utils.loadModule('../components/login.html', 'modals');
    login.init();
  } else {
    await utils.loadModule(`../components/navLogout.html`, 'logoutDiv');
    await utils.loadModule(`../components/navAccount.html`, 'nav-acc');
    document.getElementById('logoutBtn').addEventListener("click", async () => {
      window.localStorage.removeItem('token');
      window.location.href = "/";
    });
  }
}

const core = {
  init: async () => {
    await utils.loadModule('../components/navbar.html', 'navbar');
    await navbar.init();
    await utils.loadModule('../components/footer.html', 'footer');
    let route = window.location.pathname;
    signBtn();
    switch (route) {
      case "/":
        await utils.loadModule('../pages/index.html', 'content');
        index.init();
        break;
      case "/register":
        await utils.loadModule('../pages/register.html', 'content');
        register.init();
        break;
      case "/feed":
        await utils.loadModule('../components/searchBar.html', 'topSearch');
        await utils.loadModule('../pages/feed.html', 'content');
        const toAnimate = { "feed": 500, "post-tags": 250 };
        await feed.init();
        await utils.loadAnimate(toAnimate);
        break;
      case route.match(/^\/project\?*/)?.input:
        const projectData = await api.fetchGET('api/projects/' + window.location.search.substring(2));
        if (projectData !== undefined) {
          await utils.loadModule('../pages/project.html', 'content');
          project.init(projectData);
          break;
        }
      case route.match(/^\/dashboard\?*/)?.input:
        const userData = await api.isLoggedIn();
        if (userData !== undefined) {
          await utils.loadModule('../pages/dashboard.html', 'content');
          await utils.loadModule('../components/changePassword.html', 'modals');
          await utils.loadModule('../components/deleteAccount.html', 'modals');
          await utils.loadModule('../components/deleteProject.html', 'modals');
          dashboard.init(userData);
          break;
        } else {
          document.location.href = "/";
        }
      case route.match(/^\/canvas\?*/)?.input:
        utils.setTitle("Canvas");
        document.getElementById("footer").style.display = "none";
        await utils.loadModule(`pages/canvas.html`, 'content');
        await canvas.init(socket);
        await chat.init(socket);
        break;
      default:
        await utils.load404();
        break;
    }
  },
};

core.init();
