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
    let numPosts = 0;

    const URL = "http://localhost:3000/feed/api";
    // const URL = "https://cs326project.herokuapp.com/api";
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

    function toProfile(user) {
      return () => console.log("TODO: Make profile page");
    }

    function toProject(project) {
      return () => window.location.href = "../project?=" + project;
    }

    function likeBtn(like, project) {
      return async () => {
        const author = project.authorID._id;
        console.log(author)
        const likes = await postRequest({ author }, `/${project._id}/like`);
        like.innerHTML = `<div id="like-0"><i class="fa-regular fa-heart"></i><span>${likes}</span></div>`;
      }
    }

    function toCanvas(project) {
      return () => console.log("TODO: Make link to canvas");
    }

    function createTag(tags) {
      const tagWrapper = document.createElement("div");
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

    async function createNewPost(post, idx) {
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
      const like = html.getElementById(`like-${idx}`);
      like.addEventListener("click", likeBtn(like, post))
      html.getElementById(`canvas-${idx}`).addEventListener("click", toCanvas(post))
      html.getElementsByClassName('tags')[0].appendChild(createTag(post.tags));

      return html.body.firstChild;
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
      const newPost = await createNewPost(result.post, numPosts + 1);
      numPosts += 1;
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
      result.forEach(async (post, idx) => postContainer.appendChild(await createNewPost(post, idx)));
      numPosts = result.length;
    });

    githubPostBtn.addEventListener("click", async () => {
      const response_json = await api.fetchData('github_repos');
      console.log(response_json);
      postContainer.replaceChildren();
      response_json.projects.forEach(async (post, idx) => postContainer.appendChild(await createNewPost(post, idx)));
      numPosts = response_json.projects.length;
    })

    topBttn.addEventListener("click", async () => {
      // Fix this
      const response_json = await api.fetchData('projects?sort=-likeNumber');
      postContainer.replaceChildren();
      response_json.forEach(async (post, idx) => postContainer.appendChild(await createNewPost(post, idx)));
    })

    async function getFeed() {
      const response_json = await api.fetchData('projects?page=1');
      postContainer.replaceChildren();
      response_json.forEach(async (post, idx) => postContainer.appendChild(await createNewPost(post, idx)));
      numPosts = response_json.length;
    }
    getFeed();

  }
}
