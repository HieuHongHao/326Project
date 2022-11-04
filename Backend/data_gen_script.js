const fs = require("fs");
const { User, Post, Comment, Canvas } = require("./model");

let comments = [];
let users = [];
let canvases = [];
let posts = [];

let tags = ["React", "Python", "Java", "PostgreSQL", "Go"];

for (let i = 0; i < 100; i++) {
  const post = new Post(i, Math.floor(Math.random() * 100), [...tags].reduce((acc, e) => (Math.random() < 0.5) ? [...acc, e] : acc, []));
  const user = new User(i);
  const canvas = new Canvas(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100));
  const comment = new Comment(i, Math.floor(Math.random() * 100), Math.floor(Math.random() * 100));
  posts.push(post);
  users.push(user);
  canvases.push(canvas);
  comments.push(comment);
}

fs.writeFileSync("comments.json", JSON.stringify(comments), "utf-8");
fs.writeFileSync("users.json", JSON.stringify(users), "utf-8");
fs.writeFileSync("canvas.json", JSON.stringify(canvases), "utf-8");
fs.writeFileSync("posts.json", JSON.stringify(posts), "utf-8");

module.exports = {
  comments,
  users,
  canvases,
  posts
}
