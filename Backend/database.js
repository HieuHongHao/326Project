// let { users, comments, posts, canvases } = require("./data_gen_script");

// async function getData(path) {
//   const res = await fetch("http://localhost:9000/api/" + path);
//   return await res.json();
// }

let users = require("../api/users.json");
let posts = require("../api/posts.json");
let comments = require("../api/posts.json");
let comments = require("../api/canvas.json");

class CrudService {
  constructor(data) {
    this.data = data;
  }
  findById(id) {
    return this.data[id];
  }
  find(filterParameter) {
    const keys = Object.keys(filterParameter);
    if (keys.length === 0) {
      return this.data;
    }
    if ("sort" in filterParameter) {
      if (filterParameter["sort"] === "asc") {
        return this.data.sort((p1, p2) => p1.likes - p2.likes).slice(0, 5);
      }
      return this.data.sort((p1, p2) => p2.likes - p1.likes).slice(0, 5);
    }
    return this.data.filter((object) =>
      keys.every((key) => {
        if (key === "tag") {
          const tag = filterParameter["tag"];
          return object["tags"].includes(tag);
        }
        return filterParameter[key] === object[key];
      })
    );
  }
  findByIdAndUpdate(id, update) {
    console.log(id);
    console.log(this.data[id]);
    this.data[id] = { ...this.data[id], ...update };
    return this.data[id];
  }
  insert(newObject) {
    this.data.push(newObject);
  }
  delete(id) {
    delete this.data[id];
  }
}

class UserService extends CrudService {
  constructor() {
    super(users);
    this.posts = posts;
  }
  getAllposts(user_id) {
    const post_ids = new Set(this.data[user_id].posts);
    let res = [];
    for (const post of this.posts) {
      if (post_ids.has(post.id)) {
        res.push(post);
      }
    }
    return post;
  }
}

class PostService extends CrudService {
  constructor() {
    super(posts);
    this.comments = comments;
    this.counter = 100;
  }
  getAllComments(post_id) {
    const comments_id = new Set(this.data[post_id].commentsId);
    console.log(comments_id);
    let res = [];
    for (const comment of this.comments) {
      if (comments_id.has(comment.id)) {
        res.push(comment);
      }
    }
    return res;
  }
  addComment(post_id, commentId) {
    const post = this.findById(post_id);
    if ("commentsId" in post) {
      post.commentsId.push(commentId);
    } else {
      post["commentsId"] = [commentId];
    }
    return post;
  }
}

class CommentService extends CrudService {
  constructor() {
    super(comments);
    this.counter = 100;
  }
}
class CanvasService extends CrudService {
  constructor() {
    super(canvases);
  }
}

module.exports = {
  CrudService,
  PostService,
  UserService,
  CommentService,
  CanvasService,
};
