


// import bcrypt from "../node_modules/bcrypt"
// const bcrypt = require('./node_modules/bcrypt')

const URL= "http://localhost:9000";

async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);                    

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string                  
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

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

async function getUserData(query) {
  // const URL = "https://cs326project.herokuapp.com/api/users" + query;
  let response = await fetch(URL + "/api/users" +  query);
  if (response.ok) {
    return await response.json();
  }
}

async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string                  
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

async function login() {
  const username = document.getElementById("loginName").value;
  const password = document.getElementById("loginPass").value;
  const user = await getUserData(`?email=${username}`);
  // const hashPassword = await sha256(password, 12)
  const hashPassword = password;
  const correctPass = hashPassword === user[0].password;
  console.log(correctPass,hashPassword);
  if (correctPass) {
    loginSuccess(user[0]._id);
    closeModal("modalLoginForm");
    window.location.href = "?=dashboard";
  } else {
    alert("Username or password is incorrect")
  }
}


async function deleteAccount() {
  const userID = window.localStorage.getItem("loggedIn");
  // await fetch("https://cs326project.herokuapp.com/api/users/delete/" + userID).then(res => res.text()).then(res => console.log(res));
  await fetch(URL + "/api/users/delete" + userID).then(res => res.text()).then(res => console.log(res));
  window.location.href = "/";
}

async function deleteAccount() {
  const newPass = document.getElementById("newPass").value;
  const confirmPass = document.getElementById("confirmPass").value;
  const userID = window.localStorage.getItem("loggedIn");
  if (newPass === confirmPass) {
    // await fetch("https://cs326project.herokuapp.com/api/users/" + userID + "/update", {
    //   method: 'PATCH',
    //   body: JSON.stringify({
    //     password: newPass
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
    await fetch(URL + "/api/users" + userID + "/update", {
      method: 'PATCH',
      body: JSON.stringify({
        password: newPass
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  }
}

const loginBtn = document.getElementById("loginSubmit");
loginBtn.addEventListener("click", login);

const deleteAcc = document.getElementById("deleteAccount");
deleteAcc.addEventListener("click", deleteAccount);

const changePass = document.getElementById("changePassBtn");
deleteAcc.addEventListener("click", changePassword);


// async function deletePost() {
//   const postsDiv = document.getElementById("posts");

// }

// const deletePostBtn = document.getElementById("deletePost");
// deletePostBtn.addEventListener("click", deletePost);

