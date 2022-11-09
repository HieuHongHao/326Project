const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");


const {
  UserService,
  PostService,
  CommentService,
  CanvasService,
} = require("./Backend/database");
const users = new UserService();
const posts = new PostService();
const comments = new CommentService();
const canvases = new CanvasService();

let distDir = __dirname;
app.use(express.static(distDir));

app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.sendFile('index.html', { root: __dirname })
});

app.get("/api/posts", (req, res) => {
  const filter = req.query ? req.query : {};
  res.status(200).json({
    status: "Sucess",
    posts: posts.find(filter),
  });
});
app.get("/api/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  res.status(200).json({
    status: "Sucess",
    comments: posts.getAllComments(postId),
  });
});

app.post("/api/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const authorId = req.body.comment.authorId;
  const content = req.body.comment.content;
  const commentId = comments.counter;
  const newComment = comments.insert({
    authorId,
    content,
    postId,
    id: commentId,
  });
  comments.counter += 1;
  res.status(200).json({
    status: "Success",
    post: posts.addComment(postId, commentId),
  });
});

app.get("/api/posts/:id", (req, res) => {
  const postId = req.params.id;
  res.status(200).json({
    status: "Success",
    comments: posts.findById(postId),
  });
});

app.post("/api/posts", (req, res) => {
  const newPost = req.body.newPost;
  newPost["id"] = posts.counter;
  posts.counter += 1;
  posts.insert(newPost);
  res.status(200).json({
    status: "Success",
    post: newPost,
  });
});

app.put("/api/posts/:id", (req, res) => {
  res.status(200).json({
    status: "Success",
    post: posts.findByIdAndUpdate(req.params.id, req.body.update),
  });
});

const options = {
  cors: {
    origin: "*",
    method: ["GET", "PUT", "POST"],
  },
};
// const httpServer = require("http").createServer(app);
// const io = require("socket.io")(httpServer, options);
// const sockets = {};
// const usernames = {};
// const inbox = {};

// io.on("connection", (socket) => {
//   socket.on("login", (username) => {
//     sockets[username] = socket;
//     usernames[socket.id] = username;
//   });
//   if (usernames[socket.id] in inbox && inbox[usernames[socket.id]]) {
//     const username = usernames[socket.id];
//     sockets[username].emit("inbox-message", inbox[username]);
//     inbox[username] = null;
//   }
//   socket.on("send-message", (payload) => {
//     const { receiver, message } = payload;
//     console.log(message);
//     const sender = usernames[socket.id];
//     if (!(receiver in sockets)) {
//       inbox[receiver] = { sender, message };
//     } else {
//       sockets[receiver].emit("response-message", { sender, message });
//     }
//   });
//   socket.on("disconnect", () => {
//     const username = usernames[socket.id];
//     console.log(`${username} disconnecting ... `);
//     delete sockets[username];
//     delete usernames[socket.id];
//   });
// });

httpServer.listen(process.env.PORT || 9000, () => console.log("Server running on port 9000"));
