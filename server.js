const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { Octokit } = require("octokit");
const dotenv = require('dotenv');

dotenv.config({ path: "./.env" });
const octokit = new Octokit();

const Post = require("./Backend/model");

const ProjectModel = require("./Backend/model/Project");
const UserModel = require("./Backend/model/User");
const CommentModel = require("./Backend/model/Comment");

const QueryBuilder = require("./Backend/QueryBuilder");

const mongoose = require('mongoose');
const userModel = require("./Backend/model/User");
// const users = new UserService();
// const posts = new PostService();
// const comments = new CommentService();
// const canvases = new CanvasService();

app.use(express.static(__dirname));

app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);


mongoose.connect(process.env.DATABASE_URL, function(err, connection) {
  if (err) {
    console.log(err.message);
  }
  else {
    console.log("Connection established");
  }
})
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

app.use(express.json());

// --------Projects Resource------------------------------------------------------------------------------------------
// Get all projects
app.get("/api/projects", async (req, res) => {
  try {
    let query_builder = new QueryBuilder(req.query,ProjectModel.find());
    query_builder = query_builder.filter().sort().paginate();
    const data = await query_builder.queryChain;
    res.status(200).json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
});

// Get Project by ID
app.get('/api/projects/:id', async (req, res) => {
  try {
    const data = await ProjectModel.findById(req.params.id);
    res.status(200).json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all Comments from a Project
app.get('/api/projects/:id/comments', async (req, res) => {
  try {
    const data = await CommentModel.find({
      project: req.params.id
    });
    res.status(200).json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new project
app.post('/api/projects', async (req, res) => {
  const data = new projectModel({
    authorID: req.body.authorID,
    title: req.body.title,
    content: req.body.content,
    likes: [],
  })
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
});
// Create new comment for a project
app.post('/api/projects/:id/comments', async (req, res) => {
  try {
    const commentBody = req.body;
    const comment = await CommentModel.create({
      project: req.params.id,
      ...req.body
    })
    res.status(200).json(comment);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get comments by author ID
app.get('/api/comments/author/:id', async (req, res) => {
  try {
    const data = await CommentModel.find({ "author": req.params.id });
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
});



// --------Users Resource------------------------------------------------------------------------------------------
// Get all users
app.get('/api/users', async (req, res) => {
  try {
    let query_builder = new QueryBuilder(req.query,UserModel.find());
    query_builder = query_builder.filter().sort().paginate();
    const users = await query_builder.queryChain;
    res.status(200).json(users);
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
});
// Create user
app.post('/api/users', async (req, res) => {
  const data = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
  })
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
});






app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

// app.get("/api/users", (req, res) => {
//   const filter = req.query ? req.query : {};
//   res.status(200).json({
//     status: "Success",
//     users: users.find(filter),
//   });
// });

// app.post("/api/users", (req, res) => {
//   const info = req.body;
//   users.insert(info);
//   res.status(200).json({
//     status: "Sucess",
//     user: info
//   })
// })

// app.get("/api/users/:id", (req, res) => {
//   const userid = req.params.id;

//   res.status(200).json({
//     status: "Success",
//     users: users.findById(userid)
//   });
// });

// app.delete("/api/users/:id", (req, res) => {
//   const userid = req.params.id;
//   users.delete(userid);
//   res.status(200).json({
//     status: `Deleted user ${userid}`,
//   });
// })
// app.get("/api/posts", (req, res) => {
//   const filter = req.query ? req.query : {};
//   res.status(200).json({
//     status: "Success",
//     posts: posts.find(filter),
//   });
// });

// app.get("/api/canvas", (req, res) => {
//   const filter = req.query ? req.query : {};
//   res.status(200).json({
//     status: "Success",
//     posts: canvases.find(filter),
//   });
// });



// app.get("/api/canvas/:id", (req, res) => {
//   const canvasId = req.params.id;
//   res.status(200).json({
//     status: "Success",
//     comments: canvases.findById(canvasId),
//   });
// });

// app.get("/api/posts/:id/comments", (req, res) => {
//   const postId = req.params.id;
//   res.status(200).json({
//     status: "Sucess",
//     comments: posts.getAllComments(postId),
//   });
// });



// app.get("/api/github_repos", async (req, res) => {
//   const response = await octokit.rest.search.repos({
//     q: "java in:topics",
//   });
//   const repos = response.data.items.slice(0, 6);
//   const posts = repos.map((repo) => {
//     return {
//       id: repo.id,
//       content: repo.description,
//       likes: repo.stargazers_count,
//       hearts: repo.watchers_count,
//       tags: repo.topics.map(
//         (tag) => tag[0].toUpperCase() + tag.slice(1, tag.length)
//       ),
//       title: repo.full_name,
//     };
//   });
//   console.log(repos);
//   res.status(200).json({
//     status: "Sucess",
//     posts
//   });
// });

// app.post("/api/posts/:id/comments", (req, res) => {
//   const postId = req.params.id;
//   const authorId = req.body.comment.authorId;
//   const content = req.body.comment.content;
//   const commentId = comments.counter;
//   const newComment = comments.insert({
//     authorId,
//     content,
//     postId,
//     id: commentId,
//   });
//   comments.counter += 1;
//   res.status(200).json({
//     status: "Success",
//     post: posts.addComment(postId, commentId),
//   });
// });

// app.get("/api/posts/:id", (req, res) => {
//   const postId = req.params.id;
//   res.status(200).json({
//     status: "Success",
//     comments: posts.findById(postId),
//   });
// });

// app.post("/api/posts", (req, res) => {
//   const newPost = req.body.newPost;
//   newPost["id"] = posts.counter;
//   posts.counter += 1;
//   posts.insert(newPost);
//   res.status(200).json({
//     status: "Success",
//     post: newPost,
//   });
// });

// app.put("/api/posts/:id", (req, res) => {
//   res.status(200).json({
//     status: "Success",
//     post: posts.findByIdAndUpdate(req.params.id, req.body.update),
//   });
// });



// app.delete("/api/posts/:id", (req, res) => {
//   posts.delete(req.params.id)
//   res.status(200).json({
//     status: `Deleted post ${req.params.id}`,
//   });
// })





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
  console.log("Server running on port " + (process.env.PORT || 9000))
);


// httpServer.listen(9000, () =>
//   console.log("Server running on port" + process.env.PORT)
// );


