const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const userModel = require("./Backend/model/User.js");
const likeModel = require("./Backend/model/Like.js");
const projectModel = require("./Backend/model/Project.js");
const commentModel = require("./Backend/model/Comment.js");
const canvasModel = require("./Backend/model/Canvas");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

let users = [];
let tags = ["React", "Python", "Java", "PostgreSQL", "Go"];
for (let i = 0; i < 25; i++) {
  const newUser = new userModel({
    username: faker.name.firstName() + " " + faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(15),
    avatar: faker.image.people(480, 480, true),
    favouriteTechStack: tags.sort(() => 0.5 - Math.random()).slice(0, 3),
  });
  users.push(newUser);
}

let projects = [];
for (let i = 0; i < 50; i++) {
  const newProject = new projectModel({
    authorID: users.sort(() => 0.5 - Math.random())[0]._id,
    title: faker.lorem.sentence(3),
    content: faker.lorem.paragraph(),
    tags: tags.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * tags.length)),
  });
  projects.push(newProject);
}

let comments = [];
for (let i = 0; i < 100; i++) {
  const newComment = new commentModel({
    project: projects.sort(() => 0.5 - Math.random())[0]._id,
    author: users.sort(() => 0.5 - Math.random())[0]._id,
    content: faker.lorem.sentences(),
  });
  comments.push(newComment);
}

let canvases = [];
for (let i = 0; i < projects.length; i++) {
  const project = projects[i]._id;
  const newCanvas = new canvasModel({
    user: project.authorId,
    project,
  });
  canvases.push(newCanvas);
}

let likes = [];
for (let i = 0; i < projects.length; i++) {
  const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * (users.length / 2)));
  for (let j = 0; j < randomUsers.length; j++) {
    const like = new likeModel({
      project: projects[i]._id,
      author: randomUsers[j]
    })
    likes.push(like);
  }
}

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("connected to DB");
  });

async function deleteData() {
  await Promise.all([
    userModel.deleteMany({}),
    projectModel.deleteMany({}),
    commentModel.deleteMany({}),
    canvasModel.deleteMany({}),
    likeModel.deleteMany({})
  ]);
}

async function addData() {
  const data = [].concat(users, projects, comments, canvases, likes);
  for (let i = 0; i < data.length; i++) {
    data[i] = data[i].save();
  }
  await Promise.all(data);
  mongoose.disconnect();
}
deleteData()
  .then(() => {
    console.log("Deleted data");
    return addData();
  })
  .then(() => {
    console.log("New data added");
  })
  .catch((err) => {
    console.log("Error:", err);
  });


