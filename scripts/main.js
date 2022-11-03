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




