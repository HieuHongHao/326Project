const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { Octokit } = require("octokit");
const dotenv = require('dotenv');

dotenv.config({path: "./.env"});
const octokit = new Octokit();

const Post = require("./Backend/model");




const {
  UserService,
  CommentService,
  PostService,
  CanvasService,
} = require("./Backend/database");

const moongoose = require('mongoose');
const users = new UserService();
const posts = new PostService();
const comments = new CommentService();
const canvases = new CanvasService();

app.use(express.static(__dirname));

app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

moongoose.connect(process.env.DATABASE_URL,function(err, connection){
  if(err){
      console.log(err.message);
  }
  else{
      console.log("Connection established");
  }
})




app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/api/users", (req, res) => {
  const filter = req.query ? req.query : {};
  res.status(200).json({
    status: "Success",
    users: users.find(filter),
  });
});

app.post("/api/users", (req,res) => {
  const info = req.body;
  users.insert(info);
  res.status(200).json({
    status: "Sucess",
    user: info
  })
})

app.get("/api/users/:id", (req, res) => {
  const userid = req.params.id;
  
  res.status(200).json({
    status: "Success",
    users: users.findById(userid)
  });
});

app.delete("/api/users/:id", (req,res) => {
  const userid = req.params.id;
  users.delete(userid);
  res.status(200).json({
    status: `Deleted user ${userid}`,
  });
})
app.get("/api/posts", (req, res) => {
  const filter = req.query ? req.query : {};
  res.status(200).json({
    status: "Success",
    posts: posts.find(filter),
  });
});

app.get("/api/canvas", (req, res) => {
  const filter = req.query ? req.query : {};
  res.status(200).json({
    status: "Success",
    posts: canvases.find(filter),
  });
});



app.get("/api/canvas/:id", (req, res) => {
  const canvasId = req.params.id;
  res.status(200).json({
    status: "Success",
    comments: canvases.findById(canvasId),
  });
});

app.get("/api/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  res.status(200).json({
    status: "Sucess",
    comments: posts.getAllComments(postId),
  });
});



app.get("/api/github_repos", async (req, res) => {
  const response = await octokit.rest.search.repos({
    q: "java in:topics",
  });
  const repos = response.data.items.slice(0, 6);
  const posts = repos.map((repo) => {
    return {
      id: repo.id,
      content: repo.description,
      likes: repo.stargazers_count,
      hearts: repo.watchers_count,
      tags: repo.topics.map(
        (tag) => tag[0].toUpperCase() + tag.slice(1, tag.length)
      ),
      title: repo.full_name,
    };
  });
  console.log(repos);
  res.status(200).json({
    status: "Sucess",
    posts
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



app.delete("/api/posts/:id", (req, res) => {
  posts.delete(req.params.id)
  res.status(200).json({
    status: `Deleted post ${req.params.id}`,
  });
})





const options = {
  cors: {
    origin: "*",
    method: ["GET", "PUT", "POST"],
  },
};
const httpServer = require("http").createServer(app);
const io = (module.exports.io = require("socket.io")(httpServer, options));
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
    delete sockets[username];
    delete usernames[socket.id];
  });
});




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





httpServer.listen(process.env.PORT || 9000, () =>
  console.log("Server running on port" + process.env.PORT)
);


// httpServer.listen(9000, () =>
//   console.log("Server running on port" + process.env.PORT)
// );


