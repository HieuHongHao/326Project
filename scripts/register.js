export const register = {
  init: async () => {
    if (window.localStorage.getItem("loggedIn") !== null) {
      document.location = "/?=404"
    } else {
      const btn = document.getElementById('register-btn');
      btn.addEventListener("click", () => {
        document.location = "/?=feed";
      })
    }
  }
};
