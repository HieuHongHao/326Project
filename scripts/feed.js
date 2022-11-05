const newPostBtn = document.getElementById("post-button");
const postContainer = document.getElementById("feed");
const addTag = document.getElementById("add-tags");
const tagContainer = document.getElementById("post-tags");
const enterTag = document.getElementById("enter-tags");
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("button-addon1");

const URL = "http://localhost:9000/api";
const postClass = [
  "d-flex",
  "flex-column",
  "cat-bg-light",
  "cat-text-light",
  "my-3",
  "border",
  "rounded-3",
  "feed-post",
];
const tagStyles = {
  React: "pn-card-type-blue",
  Java: "pn-card-type-red",
  Python: "pn-card-type-yellow",
  Go: "pn-card-type-light-sea-green",
  PostgreSQL: "pn-card-type-blue",
};
let currentTags = [];
async function postRequest(data) {
  const response = await fetch(URL + "/posts", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  const response_json = await response.json();
  return response_json;
}

function createNewPost(data) {
  const newPost = document.createElement("div");
  for (const classname of postClass) {
    newPost.classList.add(classname);
  }
  newPost.appendChild(createUserAvatarAndName());
  newPost.appendChild(createBodyContent(data));
  return newPost;
}

function createTag(tags) {
  const tagWrapper = document.createElement("div");
  tagWrapper.classList.add("mt-3");
  for (const tag of tags) {
    const tagElement = document.createElement("div");
    tagElement.innerHTML = tag;
    tagElement.classList.add("badge");
    tagElement.classList.add(tagStyles[tag]);
    tagWrapper.appendChild(tagElement);
  }
  return tagWrapper;
}

function createBodyContent(data) {
  const wrapper = document.createElement("div");
  const title = document.createElement("p");
  const tags = createTag(data.tags);
  const content = document.createElement("div");

  title.classList.add("fs-4", "fw-bold", "m-0");
  title.innerHTML = data.title;

  content.classList.add("pb-4");
  content.innerHTML = data.content;

  wrapper.classList.add("px-3");
  wrapper.appendChild(tags);
  wrapper.appendChild(title);
  wrapper.appendChild(content);
  return wrapper;
}

function createUserAvatarAndName() {
  const user = document.createElement("div");
  const image = document.createElement("img");
  const name = document.createElement("span");
  const innerText = document.createElement("a");
  user.classList.add("px-3", "pt-3");

  image.src = "../public/logo.svg";
  image.classList.add("rounded-pill");

  innerText.classList.add("cat-text-light", "text-decoration-none");
  innerText.innerHTML = "Username1";
  name.classList.add("ms-1");
  name.appendChild(innerText);

  user.appendChild(image);
  user.appendChild(name);

  return user;
}

newPostBtn.addEventListener("click", async () => {
  const content = document.getElementById("post-text-area").value;
  const title = document.getElementById("post-title").value;
  const result = await postRequest({
    newPost: {
      content,
      title,
      tags: currentTags,
    },
  });
  const newPost = createNewPost(result.post);
  postContainer.prepend(newPost);
});

addTag.addEventListener("click", () => {
  const tag = enterTag.value;
  const tagElement = document.createElement("div");
  tagElement.innerHTML = tag;
  tagElement.classList.add("badge");
  switch (tag) {
    case "React":
      tagElement.classList.add("pn-card-type-blue");
      break;
    case "Python":
      tagElement.classList.add("pn-card-type-yellow");
      break;
    case "Java":
      tagElement.classList.add("pn-card-type-red");
      break;
    case "Go":
      tagElement.classList.add("pn-card-type-light-sea-green");
      break;
    default:
      tagElement.classList.add("pn-card-type-blue");
      break;
  }
  tagContainer.appendChild(tagElement);
  currentTags.push(tag);
});

searchButton.addEventListener("click", async () => {
  const query = searchBar.value.split(":");
  let result;
  switch (query[0]) {
    case "tag":
      result = await fetch(URL + `/posts?tag=${query[1]}`);
      break;
    case "title":
      result = await fetch(URL + `/posts?title=${query[1]}`);
      break;
    default:
      break;
  }
  const response_json = await result.json();
  postContainer.replaceChildren();
  response_json.posts.forEach(post => postContainer.appendChild(createNewPost(post)));
});


function getTags(posts, id) {
  let html = "";
  const tags = posts[id].tags;
  for (let i = 0; i < tags.length; i++) {
    html += `<div class="badge ${tagStyles[tags[i]]} me-2">${tags[i]}</div>`

  }
  return html;
}

async function getFeed() {
  let res = await fetch(URL + "/posts");
  const res_json = await res.json();
  const posts = res_json.posts;
  res = await fetch("../api/users.json");
  const users = await res.json();
  for (let i = 0; i < posts.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML =
      `<div class="d-flex flex-column cat-bg-light cat-text-light my-3 border rounded-3 feed-post">
        <div class="px-3 pt-3">
          <img src="${users[posts[i].authorId].avatar}" alt="Logo" class="rounded-circle">
          <span class="ms-1">
            <a href="" class="cat-text-light text-decoration-none">
              ${users[posts[i].authorId].name}
            </a>
          </span>
        </div>
        <div class="px-3 pt-1" id="tag ${i}">
          ${getTags(posts, i)}
        </div>
        <div id="content1" class="px-3">
          <p class="fs-4 fw-bold m-0">Project Name 1</p>
          <div class="pb-4">${posts[i].content}</div>
          <p class="cat-text-light"><i class="fa-regular fa-heart fa-xl pe-1"></i>
            ${posts[i].likes}
          </p>
        </div>
      </div>`;
    postContainer.appendChild(newDiv);
  }
}
getFeed();


