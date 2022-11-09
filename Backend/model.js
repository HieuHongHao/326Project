// const {faker} = require("@faker-js/faker");
// class Comment {
//   constructor(
//     authorId,
//     postId,
//     id,
//     content = faker.lorem.paragraph(),
//     likes = faker.datatype.number(),
//     hearts = faker.datatype.number()
//   ) {
//     this.id = id;
//     this.postId = postId;
//     this.content = content;
//     this.authorId = authorId;
//     this.likes = likes;
//     this.hearts = hearts;
//   }
// }

// class User {
//   constructor(
//     id,
//     email = faker.internet.email(),
//     name = faker.name.firstName() + " " + faker.name.lastName(),
//     avatar = faker.image.abstract(480, 480, true),
//     posts = [],
//     totalPosts = faker.datatype.number(),
//     likes = faker.datatype.number(),
//     comments = [],
//     created = faker.date.past().toString().substring(4, 15),
//     favouriteTechStack = faker.database.engine(),
//     password = faker.random.alphaNumeric(15)
//   ) {
//     this.id = id;
//     this.email = email;
//     this.name = name;
//     this.avatar = avatar;
//     this.posts = posts;
//     this.totalPosts = totalPosts;
//     this.likes = likes;
//     this.comments = comments;
//     this.created = created;
//     this.favouriteTechStack = favouriteTechStack;
//     this.password = password;
//   }
// }

// class Post {
//   constructor(
//     id,
//     authorId,
//     tags = [],
//     content = faker.lorem.paragraph(),
//     likes = faker.datatype.number(),
//     hearts = faker.datatype.number(),
//     title = faker.hacker.noun(),
//     commentsId = Array.from({ length: Math.floor(Math.random() * 100) }, () =>
//       Math.floor(Math.random() * 100)
//     )
//   ) {
//     this.id = id;
//     this.content = content;
//     this.likes = likes;
//     this.hearts = hearts;
//     this.authorId = authorId;
//     this.commentsId = commentsId;
//     this.title = title;
//     this.tags = tags;
//   }
// }

// class Canvas {
//   constructor(postId, ownerId, drawing = faker.image.technics(), users = []) {
//     this.postId = postId;
//     this.ownerId = ownerId;
//     this.drawing = drawing;
//     this.users = [0, 1, 2];
//   }
// }

// module.exports = { Comment, User, Post, Canvas };
