const { faker } = require("@faker-js/faker");



class Comment {
  constructor(
    authorId,
    postId,
    id,
    content = faker.lorem.paragraph(),
    likes = faker.datatype.number(),
    hearts = faker.datatype.number()
  ) {
    this.id = id;
    this.content = content;
    this.authorId = authorId;
    this.likes = likes;
    this.hearts = hearts;
  }
}

class User {
  constructor(
    id,
    email = faker.internet.email(),
    name = faker.name.firstName() + " " + faker.name.lastName(),
    avatar = faker.image.abstract(),
    posts = [],
    favouriteTechStack = faker.database.engine(),
    password = faker.random.alphaNumeric(15)
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.avatar = avatar;
    this.posts = posts;
    this.favouriteTechStack = favouriteTechStack;
    this.password = password;
  }
}

class Post {
  constructor(
    id,
    authorId,
    content = faker.lorem.paragraph(),
    likes = faker.datatype.number(),
    hearts = faker.datatype.number(),
    title = faker.hacker.noun(),
    commentsId = Array.from({ length: Math.floor(Math.random() * 100) }, () =>
      Math.floor(Math.random() * 100)
    )
  ) {
    this.id = id;
    this.content = content;
    this.likes = likes;
    this.hearts = hearts;
    this.authorId = authorId;
    this.commentsId = commentsId;
    this.title = title;
  }
}

class Canvas {
  constructor(postId, ownerId, drawing = faker.image.technics(), users = []) {
    this.postId = postId;
    this.ownerId = ownerId;
    this.drawing = drawing;
    this.users = [...users];
  }
}

module.exports = { Comment, User, Post, Canvas };
