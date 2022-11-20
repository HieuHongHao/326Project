
// Temp login funcions
function closeModal(tag) {
  const modalElem = document.getElementById(tag);
  const modal = bootstrap.Modal.getInstance(modalElem);
  modal.hide();
}





function loginSuccess(acc) {
  const storage = window.localStorage;
  storage.setItem("loggedIn", acc);
}

async function getUserData() {
  const URL = "https://cs326project.herokuapp.com/api/users";
  let response = await fetch(URL);
  if (response.ok) {
    return await response.json();
  }
}

async function login() {
  const username = document.getElementById("loginName").value;
  const password = document.getElementById("loginPass").value;
  // const res = await fetch("../api/users.json");
  // const users = await res.json();
  // const user = users.filter(x => x.name === username || x.email === username);
  const users = await getUserData();
  const user = users.filter(x => x.email === username);
  if (user.length !== 0 && user[0].password === password) {
    loginSuccess(user[0].id);
    closeModal("modalLoginForm");
    window.location.href = "?=dashboard";
  } else {
    alert("Username or password is incorrect")
  }
}



const loginBtn = document.getElementById("loginSubmit");
loginBtn.addEventListener("click", login);


// async function deletePost() {
//   const postsDiv = document.getElementById("posts");

// }

// const deletePostBtn = document.getElementById("deletePost");
// deletePostBtn.addEventListener("click", deletePost);

