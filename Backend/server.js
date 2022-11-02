const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const options = {
  cors: {
    origin: "*",
    method: ["GET", "PUT", "POST"],
  },
};
const {
  UserService,
  PostService,
  CommentService,
  CanvasService,
} = require("./database");
const users = new UserService();
const posts = new PostService();
const comments = new CommentService();
const canvases = new CanvasService();

app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('tiny'));


app.get("/", (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end("<h1>React is the best</h1>");
});

app.get("/api/v1/posts", (req, res) => {
  const filter = req.query ? req.query : {};
  res.status(200).json({
    status: "Sucess",
    posts: posts.find(filter),
  });
});
app.get("/api/v1/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  res.status(200).json({
    status: "Sucess",
    comments: posts.getAllComments(postId),
  });
});

app.post("/api/v1/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const authorId = req.body.comment.authorId;
  const content  =req.body.comment.content;
  const commentId = comments.counter;
  console.log(req.body.comment);
  const newComment = comments.insert({
    authorId,
    content,
    postId,
    id:commentId
  })
  comments.counter += 1;
  res.status(200).json({
    status: "Sucess",
    post: posts.addComment(postId,commentId),
  });
});

app.get("/api/v1/posts/:id", (req, res) => {
  const postId = req.params.id;
  res.status(200).json({
    status: "Sucess",
    comments: posts.findById(postId),
  });
});

app.post("/api/v1/posts", (req, res) => {
  const newPost = req.body.newPost;
  newPost["id"] = posts.counter;
  posts.counter += 1;
  posts.insert(newPost);
  res.status(200).json({
    status: "Sucess",
    post: newPost,
  });
});

app.put("/api/v1/posts/:id", (req, res) => {
  res.status(200).json({
    status: "Sucess",
    post: posts.findByIdAndUpdate(req.params.id,req.body.update),
  });
});

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, options);
const sockets = {};
const usernames = {};
const inbox = {};

io.on("connection", (socket) => {
  socket.on("login", (username) => {
    sockets[username] = socket;
    usernames[socket.id] = username;
  });
  if (usernames[socket.id] in inbox && inbox[usernames[socket.id]]) {
    const username = usernames[socket.id];
    sockets[username].emit("inbox-message", inbox[username]);
    inbox[username] = null;
  }
  socket.on("send-message", (payload) => {
    const { receiver, message } = payload;
    console.log(message);
    const sender = usernames[socket.id];
    if (!(receiver in sockets)) {
      inbox[receiver] = { sender, message };
    } else {
      sockets[receiver].emit("response-message", { sender, message });
    }
  });
  socket.on("disconnect", () => {
    const username = usernames[socket.id];
    console.log(`${username} disconnecting ... `);
    delete sockets[username];
    delete usernames[socket.id];
  });
});

httpServer.listen(9000, () => console.log("Server running on port 9000"));
// WARNING !!! app.listen(3000); will not work here, as it creates a new HTTP server
