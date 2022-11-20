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
      const response = await fetch('http://localhost:9000/api/projects', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const response_json = await response.json();
      return response_json;
    }

    async function createNewPost(data) {
      const newPost = document.createElement("div");
      for (const classname of postClass) {
        newPost.classList.add(classname);
      }
      newPost.appendChild(await createUserAvatarAndName(data));
      newPost.appendChild(createBodyContent(data));
      return newPost;
    }

    function createTag(tags) {
      const tagWrapper = document.createElement("div");
      tagWrapper.classList.add("mt-3");
      tagWrapper.classList.add("tag-container");
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
      
      /*Post icons container*/
      const postContainer = document.createElement("div");
      postContainer.className = "post-icons-container"

      /*Comment icon*/
      const commentBttn = document.createElement("div");
      const commentIcn = document.createElement("i");
      const commentTxt = document.createElement("span");
      commentIcn.className = "fa-regular fa-comment";
      commentTxt.innerHTML = data.comments.length;
      commentBttn.appendChild(commentIcn);
      commentBttn.appendChild(commentTxt);

      /*Like icon*/
      const likeBttn = document.createElement("div");
      const likeIcn = document.createElement("i");
      const likeTxt = document.createElement("span");

      likeIcn.className = "fa-regular fa-heart";
      likeTxt.innerHTML = data.likes.length;
      likeBttn.appendChild(likeIcn);
      likeBttn.appendChild(likeTxt);
      likeBttn.addEventListener("click", () => {
        likeBttn.innerHTML = parseInt(likeBttn.innerHTML) + 1;
      })

      /*Canvas icon*/
      const canvasBttn = document.createElement("div");
      const canvasIcn = document.createElement("i");
      const canvasTxt = document.createElement("span");

      canvasIcn.className = "fa-regular fa-pen-to-square";
      canvasTxt.innerHTML = "Kanvas";
      canvasBttn.appendChild(canvasIcn);
      canvasBttn.appendChild(canvasTxt);

      /*Append everything to wrapper card*/
      wrapper.classList.add("px-3");
      wrapper.appendChild(title);
      if(data.tags.length > 0){
        wrapper.appendChild(tags);
      }
      wrapper.appendChild(content);
      postContainer.appendChild(commentBttn)
      postContainer.appendChild(likeBttn)
      postContainer.appendChild(canvasBttn)
      wrapper.appendChild(postContainer);
      return wrapper;
    }

    async function createUserAvatarAndName(data) {
      const userData = await api.fetchData('users/' + data.authorID);
      const user = document.createElement("div");
      const image = document.createElement("img");
      const name = document.createElement("span");
      const innerText = document.createElement("a");
      user.classList.add("px-3", "pt-3", "post-user-container");

      image.src = userData.avatar;
      image.classList.add("rounded-circle");
      image.classList.add("border");
      image.classList.add("cat-border-light");

      innerText.classList.add("cat-text-light", "text-decoration-none");
      innerText.innerHTML = userData.username;
      name.classList.add("ms-2");
      name.appendChild(innerText);

      user.appendChild(image);
      user.appendChild(name);

      return user;
    }

    newPostBtn.addEventListener("click", async () => {
      const content = document.getElementById("post-text-area").value;
      const title = document.getElementById("post-title").value;
      const userId = window.localStorage.getItem("loggedIn");
      const result = await postRequest({
        authorID: userId,
        title: title,
        content: content,
        tags: currentTags
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
        case "tags":
          result = await api.fetchData(`projects?tags=${query[1]}`);
          break;
        case "title":
          result = await api.fetchData(`projects?title=${query[1]}`);
          break;
        default:
          break;
      }
      postContainer.replaceChildren();
      result.forEach(post => postContainer.appendChild(createNewPost(post)));
    });

    githubPostBtn.addEventListener("click", async () => {
      const response_json = await api.fetchData('github_repos');
      console.log(response_json);
      postContainer.replaceChildren();
      response_json.projects.forEach(post => postContainer.appendChild(createNewPost(post)));
    })

    topBttn.addEventListener("click", async () => {
      // Fix this
      const response_json = await api.fetchData('projects?sort=title');
      postContainer.replaceChildren();
      response_json.forEach(post => postContainer.appendChild(createNewPost(post)));
    })

    async function getFeed() {
      const response_json = await api.fetchData('projects?page=1');
      postContainer.replaceChildren();
      response_json.forEach(async (post) => postContainer.appendChild(await createNewPost(post)));
    }
    getFeed();

  }
}
