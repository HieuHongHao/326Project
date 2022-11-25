const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const userModel = require("./routes/backend/models/User.js");
const likeModel = require("./routes/backend/models/Like.js");
const projectModel = require("./routes/backend/models/Project.js");
const commentModel = require("./routes/backend/models/Comment.js");
const canvasModel = require("./routes/backend/models/Canvas.js");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

let users = [];
let tags = ["React", "Python", "Java", "PostgreSQL", "Go"];
for (let i = 0; i < 25; i++) {
  const password = faker.random.alphaNumeric(15);
  const newUser = new userModel({
    username: faker.name.firstName() + " " + faker.name.lastName(),
    email: faker.internet.email(),
    password: password,
    avatar: faker.image.people(480, 480, true),
    favouriteTechStack: tags.sort(() => 0.5 - Math.random()).slice(0, 3),
  });
  console.log(newUser.email, password);
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
  const randomProject = projects.sort(() => 0.5 - Math.random())[0];
  const newComment = new commentModel({
    project: randomProject._id,
    author: users.sort(() => 0.5 - Math.random())[0]._id,
    content: faker.lorem.sentences(),
  });
  randomProject.commentNumber++;
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
  const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * (users.length * 0.75)));
  for (let j = 0; j < randomUsers.length; j++) {
    const like = new likeModel({
      project: projects[i]._id,
      author: randomUsers[j]
    })
    likes.push(like);
    projects[i].likeNumber++;
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


