const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { Octokit } = require("octokit");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const octokit = new Octokit();

const ProjectModel = require("./Backend/model/Project");
const UserModel = require("./Backend/model/User");
const CommentModel = require("./Backend/model/Comment");
const canvasModel = require("./Backend/model/Canvas");
const LikeModel = require("./Backend/model/Like");

const QueryBuilder = require("./Backend/QueryBuilder");

const mongoose = require("mongoose");
const userModel = require("./Backend/model/User");

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
  } else {
    console.log("Connection established");
  }
});
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(express.json());

// --------Projects Resource------------------------------------------------------------------------------------------
// Get all projects
app.get("/api/projects", async (req, res) => {
  try {
    let query_builder = new QueryBuilder(req.query, ProjectModel.find());
    query_builder = query_builder.filter().sort().paginate();
    const data = await query_builder.queryChain.populate({
      path: "authorID",
      select: "-password",
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Project by ID
app.get("/api/projects/:id", async (req, res) => {
  try {
    const data = await ProjectModel.findById(req.params.id).populate(
      "authorID"
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ranking users based on number of comments in a project
app.get("/api/projects/:id/topContributors", async (req, res) => {
  try {
    const userRankings = await CommentModel.aggregate([
      {
        $match: { project: mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $group: {
          _id: "$author",
          commentCount: { $sum: 1 },
        },
      },
      {
        $sort: { commentCount: -1 },
      }
    ]);
    await UserModel.populate(userRankings, {
      path: "_id",
      select: "username"
    })

    res.status(200).json(userRankings.map(ranking => {
      return { username: ranking._id.username, commentCount: ranking.commentCount }
    }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get Project by author ID
app.get("/api/projects/author/:id", async (req, res) => {
  try {
    const data = await ProjectModel.find({ authorID: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all Comments from a Project
app.get("/api/projects/:id/comments", async (req, res) => {
  try {
    const data = await CommentModel.find({
      project: req.params.id,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new project
app.post("/api/projects", async (req, res) => {
  const data = new ProjectModel({
    authorID: req.body.authorID,
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete project and its comments, likes
app.get("/api/projects/delete/:id", async (req, res) => {
  try {
    const data = await ProjectModel.findByIdAndDelete(req.params.id);
    await CommentModel.deleteMany({ project: req.params.id });
    await LikeModel.deleteMany({ project: req.params.id });
    res.send(`Project ${data.title} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create new comment for a project
app.post("/api/projects/:id/comments", async (req, res) => {
  try {
    const comment = await CommentModel.create({
      project: req.params.id,
      author: req.body.author,
      content: req.body.content,
    });
    await ProjectModel.findByIdAndUpdate(req.params.id, {
      $inc: {
        commentNumber: 1,
      },
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get comments by author ID
app.get("/api/comments/author/:id", async (req, res) => {
  try {
    const data = await CommentModel.find({ author: req.params.id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Create a new like for a project
app.post("/api/projects/:id/like", async (req, res) => {
  try {
    const author = req.body.author;
    const like = await LikeModel.findOne({
      project: req.params.id,
      author,
    });
    const project = await ProjectModel.findById(req.params.id);
    if (like) {
      project.likeNumber--;
      await project.save();
      await LikeModel.findByIdAndDelete(like._id);
      res.status(200).json(project.likeNumber);
    } else {
      project.likeNumber += 1;
      await LikeModel.create({
        project: req.params.id,
        author,
      });
      await project.save();
      res.status(200).json(project.likeNumber);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update a project
app.put("/api/projects/:id", async (req, res) => {
  try {
    const newProject = await ProjectModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --------Users Resource------------------------------------------------------------------------------------------
// Get all users
app.get("/api/users", async (req, res) => {
  try {
    let query_builder = new QueryBuilder(req.query, UserModel.find());
    query_builder = query_builder.filter().sort().paginate();
    const users = await query_builder.queryChain;
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Get user by id
app.get("/api/users/:id", async (req, res) => {
  try {
    const data = await UserModel.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create user
app.post("/api/users", async (req, res) => {
  const data = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
  });
  
  
  
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a user and their projects, comments, likes
app.get("/api/users/delete/:id", async (req, res) => {
  try {
    const data = await UserModel.findByIdAndDelete(req.params.id);
    await ProjectModel.deleteMany({ authorID: req.params.id });
    await CommentModel.deleteMany({ author: req.params.id });
    await LikeModel.deleteMany({ author: req.params.id });
    res.send(`User ${data.username} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Update user information
app.put("/api/users/:id", async (req, res) => {
  try {
    const update = req.body;
    let newUser = await UserModel.findById(req.params.id);
    Object.assign(newUser,update);
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// --------Canvas Resource------------------------------------------------------------------------------------------
// Get all canvas
app.get("/api/canvas", async (req, res) => {
  try {
    let query_builder = new QueryBuilder(req.query, canvasModel.find());
    query_builder = query_builder.filter().sort().paginate();
    const canvas = await query_builder.queryChain;
    res.status(200).json(canvas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// app.post("/api/canvas", async (req, res) => {
//   try {
//     const newCanvas = await canvasModel.the gaehr
//     res.status(200).json(newCanvas);
//   }
//   catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// })

app.put("/api/canvas/:id/chatCommits", async (req, res) => {
  try {
    const field = Object.keys(req.body)[0];
    const incrementObject = {
      $inc: {}
    }
    incrementObject["$inc"][field] = req.body[field];
    const newCanvas = await canvasModel.findByIdAndUpdate(
      req.params.id,
      incrementObject,
      { new: true }
    );
    res.status(200).json(newCanvas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

// --------Github repos------------------------------------------------------------------------------------------
// Get github repos
app.get("/api/github_repos", async (req, res) => {
  const response = await octokit.rest.search.repos({
    q: "java in:topics", // Zhǎo wā
  });
  const repos = response.data.items.slice(0, 6);
  const projects = repos.map((repo) => {
    return {
      id: repo.id,
      content: repo.description,
      likeNumber: repo.stargazers_count,
      hearts: repo.watchers_count,
      tags: repo.topics.map(
        (tag) => tag[0].toUpperCase() + tag.slice(1, tag.length)
      ),
      title: repo.full_name,
      authorID: {
        username: repo.owner.login,
        avatar: repo.owner.avatar_url,
      },
      comments: ["Github"],
    };
  });
  res.status(200).json({
    status: "Sucess",
    projects,
  });
});

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
const userAvatar = {};
io.on("connection", (socket) => {
  socket.on("login", async (username) => {
    sockets[username] = socket;
    usernames[socket.id] = username;
    const user = await userModel.findById(username).select("avatar");
    if(user){
      userAvatar[username] = user.avatar;
    }
    console.log(userAvatar);
  });
  socket.on("getOnlineUsers",() => {
    socket.broadcast.emit("receiveOnlineUsers",Object.values(userAvatar));
  })
  if (usernames[socket.id] in inbox && inbox[usernames[socket.id]]) {
    const username = usernames[socket.id];
    sockets[username].emit("inbox-message", inbox[username]);
    inbox[username] = null;
  }

  
  // socket.on("send-message", (payload) => {
  //   const { receiver, message } = payload;
  //   console.log(message);
  //   const sender = usernames[socket.id];
  //   if (!(receiver in sockets)) {
  //     inbox[receiver] = { sender, message };
  //   } else {
  //     sockets[receiver].emit("response-message", { sender, message });
  //   }
  // });
  // socket.on("draw-canvas", (payload) => {
  //   const { receiver, message } = payload;
  //   console.log(message);
  // });
  // socket.on("chat-message",(payload) => {
  //   const {sender,message,receiver} = payload;
  //   console.log(payload);
  // })
  socket.on("drawing", (data) => socket.broadcast.emit("drawing", data));
  socket.on("chat-message", (data) =>
    socket.broadcast.emit("chat-message", data)
  );
  
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
