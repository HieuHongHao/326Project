import { utils } from './utils.js';
import { routes } from './routes.js';

const core = {
  init: async () => {
    utils.loadModule('components/navbar.html', 'navbar');
    utils.loadModule('components/footer.html', 'footer');
    utils.loadModule('components/modals.html', 'modals');
    await routes.init();
  },
};

core.init();
