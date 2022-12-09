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
    const newBttn = document.getElementById("new-post-button");

    
    
    let currentSearch = "default";   // "default" || "Github"
    let currentButton = newBttn;
    let currentTechTag = "Java";
    toggleButton(currentButton);


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
      return () => window.location.href = "../profile?=" + user;
    }

    function toProject(project) {
      return () => window.location.href = "../project?=" + project;
    }

    function toGithubrepo(url){
      return () => window.location.href = url;
    }
    function toggleButton(button) {
      const btn = new bootstrap.Button(button);
      btn.toggle();
    }

    // Fix this
    // Change author id to current user id
    function likeBtn(like, project) {
      return async () => {
        const author = project.authorID._id;
        const likes = await api.fetchPOST(`api/projects/${project._id}/like`, { author });
        like.innerHTML = `<div id="like-0"><i class="fa-regular fa-heart"></i><span>${likes}</span></div>`;
      }
    }

    function toCanvas(project) {
      return () => window.location.href = "../canvas?=" + project._id;
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
        avatar: (post.authorID.avatar === undefined) ? userId.avatar : post.authorID.avatar,
        username: (post.authorID.username === undefined) ? userId.username : post.authorID.username,
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
      html.getElementById(`user-${idx}`).addEventListener("click", toProfile(post.authorID._id))
      html.getElementById(`title-${idx}`).addEventListener("click", toProject(post._id))
      html.getElementById(`content-${idx}`).addEventListener("click", toProject(post._id))
      html.getElementById(`comment-${idx}`).addEventListener("click", toProject(post._id))
      const like = html.getElementById(`like-${idx}`);
      if (userId != undefined) {
        like.addEventListener("click", likeBtn(like, post))
      } else {
        like.addEventListener("click", () => alert("Please login to like"))
      }
      html.getElementsByClassName('tags')[0].appendChild(createTag(post.tags));
      if("url" in post){
        html.getElementById(`canvas-${idx}`).children[0].innerHTML = "Github Repo";
        html.getElementById(`canvas-${idx}`).addEventListener("click",toGithubrepo(post.url));
      }
      else if (userId !== undefined) {
        html.getElementById(`canvas-${idx}`).addEventListener("click", toCanvas(post))
      } 
      else {
        html.getElementById(`canvas-${idx}`).outerHTML = "";
      }
      return html.body.firstChild;
    }

    if (userId != undefined) {
      newPostBtn.addEventListener("click", async () => {
        const content = document.getElementById("post-text-area").value;
        const title = document.getElementById("post-title").value;
        let result = await api.fetchPOST('api/projects/', {
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

    postContainer.addEventListener("DOMSubtreeModified", function() {
      const children = postContainer.children;
      if (children.length === 0) {
        document.getElementById("loader").style.display = "block";
      }
      else if (children.length > 0) {
        document.getElementById("loader").style.display = "none";
      }
    })
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
      if(currentSearch === "Github"){
        let response;
        if(query.length > 0 & query[0] === "tags"){
          response = await api.fetchGET(`api/github_repos?tech=${query[1]}`);
        }else{
          response = await api.fetchGET('api/github_repos');
        }
        result = response.projects;
        currentTechTag = query[1];
      }else{
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
      }
      postContainer.replaceChildren();
      const posts = await Promise.all(result.map((post, idx) => createNewPost(post, idx)));
      setTimeout(() => {
        for (const post of posts) {
          postContainer.appendChild(post);
        }
      }, 550);
      numPosts = result.length;
    });

    githubPostBtn.addEventListener("click", async () => {
      currentSearch = "Github";
      toggleButton(currentButton);
      currentButton = githubPostBtn;
      toggleButton(currentButton);
      const response_json = await api.fetchGET('api/github_repos');
      postContainer.replaceChildren();
      const posts = await Promise.all(response_json.projects.map((post, idx) => createNewPost(post, idx)));
      setTimeout(() => {
        for (const post of posts) {
          postContainer.appendChild(post);
        }
      }, 550);
      numPosts = response_json.projects.length;
    })

    topBttn.addEventListener("click", async () => {
      currentTechTag = "Java";
      currentSearch = "default";
      toggleButton(currentButton);
      currentButton = topBttn;
      toggleButton(currentButton);
      const response_json = await api.fetchGET('api/projects?sort=-likeNumber');
      postContainer.replaceChildren();
      const posts = await Promise.all(response_json.map((post, idx) => createNewPost(post, idx)));
      setTimeout(() => {
        for (const post of posts) {
          postContainer.appendChild(post);
        }
      }, 550);
    })
    newBttn.addEventListener("click", async () => {
      currentTechTag = "Java";
      currentSearch = "default";
      toggleButton(currentButton);
      currentButton = newBttn;
      toggleButton(currentButton);
      const response_json = await api.fetchGET('api/projects');
      postContainer.replaceChildren();
      const posts = await Promise.all(response_json.map((post, idx) => createNewPost(post, idx)));
      setTimeout(() => {
        for (const post of posts) {
          postContainer.appendChild(post);
        }
      }, 550);
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
    async function getGithubRepo(page,tag) {
      const response_json = await api.fetchGET(`api/github_repos?page=${page}&tech=${tag}`);
      const posts = await Promise.all(response_json.projects.map((post, idx) => createNewPost(post, idx)));
      setTimeout(() => {
        for (const post of posts) {
          postContainer.appendChild(post);
        }
      }, 550);
      numPosts = response_json.projects.length;
    }
    
    let page = 1;
    let github_page = 1;
    getFeed(page);
    window.onscroll = function() {
      if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
        page += 1;
        if(currentSearch === "Github"){
          github_page += 1;
          getGithubRepo(github_page,currentTechTag);
          page = 1;
        } else {
          page += 1;
          getFeed(page);
          github_page = 1;
        }
      }
    }

  }
}
