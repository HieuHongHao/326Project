// let { users, comments, posts, canvases } = require("./data_gen_script");

async function getData(path) {
  const res = await fetch("http://localhost:9000/api/" + path);
  return await res.json();
}

let users = [{
  "id": 0,
  "email": "Matteo.Kuhlman79@hotmail.com",
  "name": "Burnice Lebsack",
  "avatar": "https://loremflickr.com/480/480/abstract?lock=61721",
  "posts": [],
  "totalPosts": 56751,
  "likes": 75439,
  "comments": [],
  "created": "Nov 11 2021",
  "favouriteTechStack": "MEMORY",
  "password": "ypfihpac4092yf6"
},
{
  "id": 1,
  "email": "Alek.Hammes65@hotmail.com",
  "name": "Dino Stroman",
  "avatar": "https://loremflickr.com/480/480/abstract?lock=60611",
  "posts": [],
  "totalPosts": 81683,
  "likes": 56647,
  "comments": [],
  "created": "Oct 10 2022",
  "favouriteTechStack": "MEMORY",
  "password": "a8kj6i9djsbzrc6"
}
];
let comments = [{
  "id": 93,
  "postId": 36,
  "content": "Non illo laborum corrupti. Deserunt et sequi. Accusantium consequatur omnis. Doloremque aperiam corrupti est nesciunt rerum architecto magni quas.",
  "authorId": 0,
  "likes": 67422,
  "hearts": 23876
},
{
  "id": 35,
  "postId": 77,
  "content": "Rem voluptas recusandae laudantium fugiat laborum. Nihil fugiat nostrum nihil veniam quidem placeat fugit. Doloremque vitae iste ducimus repellat aliquid quisquam.",
  "authorId": 1,
  "likes": 54163,
  "hearts": 58476
},
{
  "id": 5,
  "postId": 94,
  "content": "Pariatur consectetur voluptate distinctio nam quos sequi. Similique similique tempora perspiciatis perferendis laboriosam odit non animi. Possimus autem ducimus adipisci quia modi incidunt fugiat. Rem praesentium error aperiam eaque.",
  "authorId": 2,
  "likes": 18015,
  "hearts": 37158
}];
let posts = [{
  "id": 0,
  "content": "Corporis similique delectus corporis unde est id porro rerum pariatur. Voluptate earum deserunt ad pariatur officiis tempora. Neque inventore similique molestiae excepturi perferendis harum non. Minima natus odit deserunt.",
  "likes": 6585,
  "hearts": 48957,
  "authorId": 59,
  "commentsId": [
    88,
    88,
    73,
    35
  ],
  "title": "bandwidth",
  "tags": [
    "React",
    "Go"
  ]
}];
let canvases = [{
  "postId": 0,
  "drawing": "https://loremflickr.com/640/480/technics",
  "users": [
    0,
    1,
    2
  ]
},
{
  "postId": 1,
  "drawing": "https://loremflickr.com/640/480/technics",
  "users": [
    0,
    1,
    2
  ]
}];

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
    console.log(filterParameter);
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
