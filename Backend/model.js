const { faker } = require("@faker-js/faker");
class Comment {
  constructor(
    authorId,
    postId,
    content = faker.lorem.paragraph(),
    likes = faker.datatype.number(),
    hearts = faker.datatype.number()
  ) {
    this.content = content;
    this.authorId = authorId;
    this.likes = likes;
    this.hearts = hearts;
    this.postId = postId;
  }
}
class User {
  constructor(
    id,
    email = faker.internet.email(),
    name = faker.name.firstName() + " " + faker.name.lastName(),
    avatar = faker.image.abstract(),
    posts = [],
    favouriteTechStack = faker.database.engine()
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.avatar = avatar;
    this.posts = posts;
    this.favouriteTechStack = favouriteTechStack;
  }
}

class Post {
  constructor(
    id,
    authorId,
    content = faker.lorem.paragraph(),
    likes = faker.datatype.number(),
    hearts = faker.datatype.number(),
    commentsId = []
  ) {
    this.id = id;
    this.content = content;
    this.likes = likes;
    this.hearts = hearts;
    this.authorId = authorId;
    this.commentsId = commentsId;
  }
}

class Canvas {
  constructor(
    postId,
    ownerId,
    drawing = faker.image.abstract(),
    users = []
  ) {
    this.postId = postId;
    this.ownerId = ownerId;
    this.drawing = drawing;
    this.users = [...users];
  }
}

module.exports =  { Comment, User, Post, Canvas };
