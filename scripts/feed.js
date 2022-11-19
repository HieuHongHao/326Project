import { api } from './api.js';
export const feed = {
  init: async () => {
    const newPostBtn = document.getElementById("post-button");
    const postContainer = document.getElementById("feed");
    const addTag = document.getElementById("add-tags");
    const tagContainer = document.getElementById("post-tags");
    const enterTag = document.getElementById("enter-tags");
    const searchBar = document.getElementById("search-bar");
    const searchButton = document.getElementById("button-addon1");
    const githubPostBtn = document.getElementById("github-project-button");
    const topBttn = document.getElementById("top-post-button");
    
    
    
    const URL = "https://cs326project.herokuapp.com/api";
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
      Android: "pn-card-type-blue",
      Guava: "pn-card-type-blue"
    };
    let currentTags = [];
    async function postRequest(data) {
      const response = await fetch(URL + "/projects", {
        method: "POST", // *GET, POST, PUT, DELETE, projects.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
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
        tagElement.classList.add("me-2");
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
      // <i class="fa-solid fa-heart" style="color:red;"></i><span>144 likes</span>
      // const likeButton = document.createElement("button");
      // title.classList.add("fs-4", "fw-bold", "m-0");
      // title.innerHTML = data.title;
      // content.classList.add("pb-4");
      // content.innerHTML = data.content;
      // likeButton.className = "btn btn-outline-light mx-1 pb-3"
      // likeButton.innerHTML = data.likes;
      // likeButton.addEventListener("click", () => {
      //   likeButton.innerHTML = parseInt(likeButton.innerHTML) + 1;
      // })
      const likeButton = document.createElement("div");
      const heart = document.createElement("i");
      const likeText = document.createElement("span");
      
      heart.className = "fa-solid fa-heart";
      likeText.innerHTML = data.likes;
      likeButton.appendChild(heart);
      likeButton.appendChild(likeText);
      likeButton.className = "post-like-container"
      likeButton.addEventListener("click", () => {
        likeButton.innerHTML = parseInt(likeText.innerHTML) + 1;
      })


      wrapper.classList.add("px-3");
      wrapper.appendChild(tags);
      wrapper.appendChild(title);
      wrapper.appendChild(content);
      wrapper.appendChild(likeButton)
      return wrapper;
    }

    function createUserAvatarAndName() {
      const user = document.createElement("div");
      const image = document.createElement("img");
      const name = document.createElement("span");
      const innerText = document.createElement("a");
      user.classList.add("px-3", "pt-3");

      image.src = "../public/logo.svg";
      image.classList.add("rounded-circle");

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
          result = await api.fetchData(URL + `/projects?tag=${query[1]}`);
          break;
        case "title":
          result = await api.fetchData(URL + `/projects?title=${query[1]}`);
          break;
        default:
          break;
      }
      const response_json = await result.json();
      postContainer.replaceChildren();
      response_json.projects.forEach(post => postContainer.appendChild(createNewPost(post)));
    });
    
    githubPostBtn.addEventListener("click", async () => {
      const response_json = await api.fetchData('github_repos');
      console.log(response_json);
      postContainer.replaceChildren();
      response_json.projects.forEach(post => postContainer.appendChild(createNewPost(post)));
    })
    
    topBttn.addEventListener("click",async () => {
      const response_json = await api.fetchData('projects?sort=desc');
      postContainer.replaceChildren();
      response_json.projects.forEach(post => postContainer.appendChild(createNewPost(post)));
    })
    
    async function getFeed() {
      const response_json = await api.fetchData('projects');
      postContainer.replaceChildren();
      response_json.forEach(post => postContainer.appendChild(createNewPost(post)));
    }
    getFeed();

  }
}
