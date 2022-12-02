const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const { Octokit } = require("octokit");
const octokit = new Octokit();
const ProjectModel = require("./backend/models/Project");
const UserModel = require("./backend/models/User");
const CommentModel = require("./backend/models/Comment");
const CanvasModel = require("./backend/models/Canvas");
const LikeModel = require("./backend/models/Like");
const QueryBuilder = require("./backend/QueryBuilder");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

// =============================
//       PROJECT RESOURCES
// =============================

// Get all projects
router.get("/projects", async (req, res) => {
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
router.get("/projects/:id", async (req, res) => {
  try {
    const data = await ProjectModel.findById(req.params.id).populate("authorID");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// Get Project by author ID
router.get("/projects/author/:id", async (req, res) => {
  try {
    const data = await ProjectModel.find({ authorID: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new project
router.post("/projects", async (req, res) => {
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
router.post("/projects/delete/:id", async (req, res) => {
  try {
    const data = await ProjectModel.findByIdAndDelete(req.params.id);
    await CommentModel.deleteMany({ project: req.params.id });
    await LikeModel.deleteMany({ project: req.params.id });
    res.status(200).json({ message: `Project ${data.title} has been deleted..` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a project
router.put("/projects/:id", async (req, res) => {
  try {
    const newProject = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new like for a project
router.post("/projects/:id/like", async (req, res) => {
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

// Ranking users based on number of comments in a project
router.get("/projects/:id/topContributors", async (req, res) => {
  
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
      select: "username avatar"
    })
    res.status(200).json(userRankings.map(ranking => {
      return { username: ranking._id.username, commentCount: ranking.commentCount }
    }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// =============================
//       COMMENT RESOURCES
// =============================

// Create new comment for a project
router.post("/projects/:id/comments", async (req, res) => {
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
router.get("/comments/author/:id", async (req, res) => {
  try {
    const data = await CommentModel.find({ author: req.params.id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all Comments from a Project
router.get("/projects/:id/comments", async (req, res) => {
  try {
    const data = await CommentModel.find({
      project: req.params.id,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =============================
//       LIKE RESOURCES
// =============================

// Create a new like for a project
router.post("/api/projects/:id/like", async (req, res) => {
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


// =============================
//       USER RESOURCES
// =============================

// // Get all users [NOT SURE IF NEEDED]
// router.get("/users", async (req, res) => {
//   try {
//     let query_builder = new QueryBuilder(req.query, UserModel.find());
//     query_builder = query_builder.filter().sort().paginate();
//     const users = await query_builder.queryChain;
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Get user by id
router.get("/users/:id", async (req, res) => {
  try {
    const data = await UserModel.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Create user
router.post("/users", async (req, res) => {
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
router.post("/users/delete/:id", async (req, res) => {
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
router.put("/users/:id", async (req, res) => {
  try {
    let newUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// =============================
//       CANVAS RESOURCES
// =============================

// Get all canvas
router.get("/canvas", async (req, res) => {
  try {
    let query_builder = new QueryBuilder(req.query, CanvasModel.find());
    query_builder = query_builder.filter().sort().paginate();
    const canvas = await query_builder.queryChain;
    res.status(200).json(canvas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update chat commits
router.put("/canvas/:id/chatCommits", async (req, res) => {
  try {
    const field = Object.keys(req.body)[0];
    const incrementObject = {
      $inc: {}
    }
    incrementObject["$inc"][field] = req.body[field];
    const newCanvas = await CanvasModel.findByIdAndUpdate(
      req.params.id,
      incrementObject,
      { new: true }
    );
    res.status(200).json(newCanvas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// create canvas
router.post("/canvas/", async (req, res) => {
  try {
    const newCanvas = await CanvasModel.create(req.body);
    res.status(200).json(newCanvas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// =============================
//       GITHUB RESOURCES
// =============================

// Get github repos
router.get("/github_repos", async (req, res) => {
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

module.exports = router;
