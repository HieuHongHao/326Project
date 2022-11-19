const { faker } = require('@faker-js/faker');
const mongoose = require("mongoose");
const userModel = require("./Backend/model/User.js")
const projectModel = require("./Backend/model/Post.js")
const commentModel = require("./Backend/model/Comment.js")
const dotenv = require('dotenv');
dotenv.config({ path: "./.env" });

let users = [];
let tags = ["React", "Python", "Java", "PostgreSQL", "Go"];
for (let i = 0; i < 25; i++) {
  const newUser = new userModel({
    username: faker.name.firstName() + " " + faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(15),
    avatar: faker.image.people(480, 480, true),
    favouriteTechStack: tags.sort(() => 0.5 - Math.random()).slice(0, 3)
  });
  users.push(newUser);
}

let projects = [];
for (let i = 0; i < 50; i++) {
  const newProject = new projectModel({
    authorID: users.sort(() => 0.5 - Math.random())[0]._id,
    title: faker.lorem.sentence(3),
    content: faker.lorem.paragraph(),
    likes: users.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * users.length)).map(x => x._id)
  });
  projects.push(newProject);
}

let comments = [];
for (let i = 0; i < 100; i++) {
  const newComment = new commentModel({
    post: projects.sort(() => 0.5 - Math.random())[0]._id,
    author: users.sort(() => 0.5 - Math.random())[0]._id
  });
  comments.push(newComment);
}

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("connected to DB");
  });


userModel.deleteMany({}).then(function() {
  console.log("Added users")
});
projectModel.deleteMany({}).then(function() {
  console.log("Added projects")
});
commentModel.deleteMany({}).then(function() {
  console.log("Added comments")
});

async function addData() {
  const data = [].concat(users, projects, comments);
  for (let i = 0; i < data.length; i++) {
    await data[i].save();
  }
  mongoose.disconnect();
}

addData().then(() => {
  console.log("Done");
}).catch((err) => {
  console.log("Error:", err);
})


// userModel.find({ username: 'Louisa Keebler' }, function(err, docs) {
//   if (err) {
//     console.log(err);
//   }
//   else {
//     console.log("First function call : ", docs);
//   }
// });

