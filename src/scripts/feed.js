import { api } from './api.js';
import { utils } from './utils.js';
export const feed = {
  init: async () => {
    const userId = await api.isLoggedIn();
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
    
    const postTemplate = await fetch('../components/templates/feedPost.html')
      .then(response => response.text())
      .then(html => {
        let names = ["avatar", "username", "userID", "title", "titleID", "content", "contentID", "comments", "commentID", "likes", "likeID", "canvasID"];
        return new Function(...names, `return \`${html}\`;`);
      });

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

    function toProfile(user) {
      return () => console.log("TODO: Make profile page");
    }

    function toProject(project) {
      return () => window.location.href = "../project?=" + project;
    }

    // Fix this
    function likeBtn(like, project) {
      return async () => {
        const author = project.authorID._id;
        const likes = await api.fetchPOST(`api/projects/${project._id}/like`, { author });
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
      let vals = Object.values({
        avatar: post.authorID.avatar,
        username: post.authorID.username,
        userID: `user-${idx}`,
        title: post.title,
        titleID: `title-${idx}`,
        content: post.content,
        contentID: `content-${idx}`,
        comments: post.commentNumber,
        commentID: `comment-${idx}`,
        likes: post.likeNumber,
        likeID: `like-${idx}`,
        canvasID: `canvas-${idx}`
      });
      const template = postTemplate(...vals);
      const parser = new DOMParser();
      const html = parser.parseFromString(template, 'text/html');
      html.getElementById(`user-${idx}`).addEventListener("click", toProfile(post.authorID))
      html.getElementById(`title-${idx}`).addEventListener("click", toProject(post._id))
      html.getElementById(`content-${idx}`).addEventListener("click", toProject(post._id))
      html.getElementById(`comment-${idx}`).addEventListener("click", toProject(post._id))
      const like = html.getElementById(`like-${idx}`);
      like.addEventListener("click", likeBtn(like, post))
      html.getElementsByClassName('tags')[0].appendChild(createTag(post.tags));
      if (userId !== undefined) {
        html.getElementById(`canvas-${idx}`).addEventListener("click", toCanvas(post))
      } else {
        html.getElementById(`canvas-${idx}`).outerHTML = "";
      }

      return html.body.firstChild;
    }

    if (userId != undefined) {
      newPostBtn.addEventListener("click", async () => {
        const content = document.getElementById("post-text-area").value;
        const title = document.getElementById("post-title").value;
        const result = await api.fetchPOST('api/projects/', {
          authorID: userId._id,
          title: title,
          content: content,
          tags: currentTags
        });
        const newPost = await createNewPost(result, numPosts + 1);
        numPosts += 1;
        postContainer.prepend(newPost);
        await api.fetchPOST('api/canvas/', {
          user: userId._id,
          project: result._id
        });
      });
    } else {
      document.getElementById("newPostBtn").outerHTML = "";
    }

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
          result = await api.fetchGET(`api/projects?tags=${query[1]}`);
          break;
        case "title":
          result = await api.fetchGET(`api/projects?title=${query[1]}`);
          break;
        default:
          break;
      }
      postContainer.replaceChildren();
      result.forEach(async (post, idx) => postContainer.appendChild(await createNewPost(post, idx)));
      numPosts = result.length;
    });

    githubPostBtn.addEventListener("click", async () => {
      const response_json = await api.fetchGET('api/github_repos');
      postContainer.replaceChildren();
      response_json.projects.forEach(async (post, idx) => postContainer.appendChild(await createNewPost(post, idx)));
      numPosts = response_json.projects.length;
    })

    topBttn.addEventListener("click", async () => {
      const response_json = await api.fetchGET('api/projects?sort=-likeNumber');
      postContainer.replaceChildren();
      response_json.forEach(async (post, idx) => postContainer.appendChild(await createNewPost(post, idx)));
    })

    async function getFeed(page) {
      console.time("fetching post");
      const response_json = await api.fetchGET('api/projects?page=' + page);
      console.timeEnd("fetching post");
      console.time("Build DOM");
      const posts = await Promise.all(response_json.map((post, idx) => createNewPost(post, idx)));
      for (const post of posts) {
        postContainer.appendChild(post);
      }
      console.timeEnd("Build DOM");
      // response_json.forEach(async (post, idx) => postContainer.appendChild(await createNewPost(post, idx)));
      numPosts = response_json.length;

    }

    let page = 1;
    getFeed(page);
    
    window.onscroll = function() {
      if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
        page += 1;
        getFeed(page)
      }
    }

  }
}
