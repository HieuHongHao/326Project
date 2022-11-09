// const fs = require("fs");
const { User, Post, Comment, Canvas } = require("./model");

let comments = [];
let users = [];
let canvases = [];
let posts = [];

let tags = ["React", "Python", "Java", "PostgreSQL", "Go"];

for (let i = 0; i < 100; i++) {
  const post = new Post(i, Math.floor(Math.random() * 100), [...tags].reduce((acc, e) => (Math.random() < 0.5) ? [...acc, e] : acc, []));
  const user = new User(i);
  const canvas = new Canvas(i);
  const comment = new Comment(i, Math.floor(Math.random() * 100), Math.floor(Math.random() * 100));
  posts.push(post);
  users.push(user);
  canvases.push(canvas);
  comments.push(comment);
}

// fs.writeFileSync("api/comments.json", JSON.stringify(comments), "utf-8");
// fs.writeFileSync("api/users.json", JSON.stringify(users), "utf-8");
// fs.writeFileSync("api/canvas.json", JSON.stringify(canvases), "utf-8");
// fs.writeFileSync("api/posts.json", JSON.stringify(posts), "utf-8");

module.exports = {
  comments,
  users,
  canvases,
  posts
}
