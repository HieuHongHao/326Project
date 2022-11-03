// let myModal = document.getElementById('myModal')
// let myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', function() {
//   myInput.focus()
// })


// Dark Theme Toggle
const toggle = document.getElementById("theme-toggle");
const storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme) {
  document.documentElement.setAttribute('data-theme', storedTheme)
}
toggle.onclick = function() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  let targetTheme = "light";

  if (currentTheme === "light") {
    targetTheme = "dark";
  }

  document.documentElement.setAttribute('data-theme', targetTheme)
  localStorage.setItem('theme', targetTheme);
};

function loginSuccess() {

}

async function login() {
  const username = document.getElementById("loginName").value;
  const password = document.getElementById("loginPass").value;
  const res = await fetch("../users.json");
  const users = await res.json();
  const user = users.filter(x => x.name === username || x.email === username);
  if (user.length !== 0 && user[0].password === password) {
    loginSuccess();
  } else {
    alert("Username or password is incorrect")
  }
}

const loginBtn = document.getElementById("loginSubmit");
loginBtn.addEventListener("click", login);


