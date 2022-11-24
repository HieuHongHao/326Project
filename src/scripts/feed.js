import { api } from './api.js';
import { utils } from './utils.js';
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
      // "border",
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
    async function postRequest(data, param) {
      const response = await fetch(URL + "/projects" + param, {
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

    function createNewPost(data) {
      const newPost = document.createElement("div");
      for (const classname of postClass) {
        newPost.classList.add(classname);
      }
      newPost.classList.add("feed-posts-container");
      newPost.appendChild(createUserAvatarAndName(data));
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
        tagElement.classList.add("badge", "me-2", tagStyles[tag]);
        tagWrapper.appendChild(tagElement);
      }
      return tagWrapper;
    }

    function createBodyContent(data) {
      const wrapper = document.createElement("div");
      const title = document.createElement("a");
      const tags = createTag(data.tags);
      const content = document.createElement("div");
      title.classList.add("fs-4", "fw-bold", "m-0", "cat-text-light", "text-decoration-none");
      title.innerHTML = data.title;
      title.addEventListener("click", () => {
        window.localStorage.setItem('projectID', data._id);
        window.location.href = '../project';
      })
      content.classList.add("pb-4");
      content.innerHTML = data.content;
      content.addEventListener("click", () => {
        window.localStorage.setItem('projectID', data._id);
        window.location.href = '../project';
      })
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
      commentBttn.addEventListener("click", () => {
        window.localStorage.setItem('projectID', data._id);
        window.location.href = '../project?=' + data._id;
      });
      commentTxt.innerHTML = data.comments.length;
      commentBttn.appendChild(commentIcn);
      commentBttn.appendChild(commentTxt);

      /*Like icon*/
      const likeBttn = document.createElement("div");
      const likeIcn = document.createElement("i");
      const likeTxt = document.createElement("span");

      likeIcn.className = "fa-regular fa-heart";
      likeTxt.innerHTML = data.likeNumber;
      likeBttn.appendChild(likeIcn);
      likeBttn.appendChild(likeTxt);
      likeBttn.addEventListener("click", async () => {
        const author = window.localStorage.getItem("loggedIn");
        const likes = await postRequest({ author }, `/${data._id}/like`);
        console.log(likes)
        // likeTxt.innerHTML = likes;
      })

      /*Canvas icon*/
      const canvasBttn = document.createElement("div");
      const canvasIcn = document.createElement("i");
      const canvasTxt = document.createElement("span");

      canvasIcn.className = "fa-regular fa-pen-to-square";
      canvasTxt.innerHTML = "Kanvas";
      canvasBttn.addEventListener("click", () => {
        window.localStorage.setItem('projectID', data._id);
        window.location.href = '?=canvas';
      });
      canvasBttn.appendChild(canvasIcn);
      canvasBttn.appendChild(canvasTxt);

      /*Append everything to wrapper card*/
      wrapper.classList.add("px-3");
      wrapper.appendChild(title);
      if (data.tags.length > 0) {
        wrapper.appendChild(tags);
      }
      wrapper.appendChild(content);
      postContainer.appendChild(commentBttn)
      postContainer.appendChild(likeBttn)
      postContainer.appendChild(canvasBttn)
      wrapper.appendChild(postContainer);
      return wrapper;
    }

    function createUserAvatarAndName(data) {
      const userData = data.authorID;
      const user = document.createElement("div");
      const image = document.createElement("img");
      const name = document.createElement("span");
      const innerText = document.createElement("a");
      user.classList.add("px-3", "pt-3", "post-user-container");

      image.src = userData.avatar;
      image.classList.add("rounded-circle");
      // image.classList.add("border");
      // image.classList.add("cat-border-light");

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
      }, "");
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
      const response_json = await api.fetchData('projects?sort=-likeNumber');
      postContainer.replaceChildren();
      response_json.forEach(post => postContainer.appendChild(createNewPost(post)));
    })

    function toProfile(user) {
      return () => console.log("TODO: Make profile page");
    }

    function toProject(project) {
      return () => window.location.href = "../project?=" + project;
    }

    function likeBtn(project) {
      return async () => {
        const author = project.authorID._id;
        const likes = await postRequest({ author }, `/${project._id}/like`);
      }
    }

    function toCanvas(project) {
      return () => console.log("TODO: Make link to canvas");
    }

    async function getFeed() {
      const response_json = await api.fetchData('projects?page=1');
      postContainer.replaceChildren();
      response_json.forEach(async (post, idx) => {
        const html = await utils.loadTemplate('../components/templates/feedPost.html', {
          avatar: post.authorID.avatar,
          username: post.authorID.username,
          userID: `user-${idx}`,
          title: post.title,
          titleID: `title-${idx}`,
          content: post.content,
          contentID: `content-${idx}`,
          comments: post.comments.length,
          commentID: `comment-${idx}`,
          likes: post.likeNumber,
          likeID: `like-${idx}`,
          canvasID: `canvas-${idx}`
        });

        html.getElementById(`user-${idx}`).addEventListener("click", toProfile(post.authorID))
        html.getElementById(`title-${idx}`).addEventListener("click", toProject(post._id))
        html.getElementById(`content-${idx}`).addEventListener("click", toProject(post._id))
        html.getElementById(`comment-${idx}`).addEventListener("click", toProject(post._id))
        html.getElementById(`like-${idx}`).addEventListener("click", likeBtn(post))
        html.getElementById(`canvas-${idx}`).addEventListener("click", toCanvas(post))

        postContainer.appendChild(html.body.firstChild);
      });
    }
    getFeed();

  }
}
