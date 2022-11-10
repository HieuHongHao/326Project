// let { users, comments, posts, canvases } = require("./data_gen_script");

// async function getData(path) {
//   const res = await fetch("http://localhost:9000/api/" + path);
//   return await res.json();
// }

let users = [
  {
    id: 0,
    email: "Matteo.Kuhlman79@hotmail.com",
    name: "Burnice Lebsack",
    avatar: "https://loremflickr.com/480/480/abstract?lock=61721",
    posts: [],
    totalPosts: 56751,
    likes: 75439,
    comments: [],
    created: "Nov 11 2021",
    favouriteTechStack: "MEMORY",
    password: "ypfihpac4092yf6",
  },
  {
    id: 1,
    email: "Alek.Hammes65@hotmail.com",
    name: "Dino Stroman",
    avatar: "https://loremflickr.com/480/480/abstract?lock=60611",
    posts: [],
    totalPosts: 81683,
    likes: 56647,
    comments: [],
    created: "Oct 10 2022",
    favouriteTechStack: "MEMORY",
    password: "a8kj6i9djsbzrc6",
  },
];
let comments = [
  {
    id: 93,
    postId: 36,
    content:
      "Non illo laborum corrupti. Deserunt et sequi. Accusantium consequatur omnis. Doloremque aperiam corrupti est nesciunt rerum architecto magni quas.",
    authorId: 0,
    likes: 67422,
    hearts: 23876,
  },
  {
    id: 35,
    postId: 77,
    content:
      "Rem voluptas recusandae laudantium fugiat laborum. Nihil fugiat nostrum nihil veniam quidem placeat fugit. Doloremque vitae iste ducimus repellat aliquid quisquam.",
    authorId: 1,
    likes: 54163,
    hearts: 58476,
  },
  {
    id: 5,
    postId: 94,
    content:
      "Pariatur consectetur voluptate distinctio nam quos sequi. Similique similique tempora perspiciatis perferendis laboriosam odit non animi. Possimus autem ducimus adipisci quia modi incidunt fugiat. Rem praesentium error aperiam eaque.",
    authorId: 2,
    likes: 18015,
    hearts: 37158,
  },
  {
    id: 10,
    postId: 77,
    content:
      "Rem voluptas recusandae laudantium fugiat laborum. Nihil fugiat nostrum nihil veniam quidem placeat fugit. Doloremque vitae iste ducimus repellat aliquid quisquam.",
    authorId: 1,
    likes: 54163,
    hearts: 58476,
  },
  {
    id: 90,
    postId: 77,
    content:
      "Rem voluptas recusandae laudantium fugiat laborum. Nihil fugiat nostrum nihil veniam quidem placeat fugit. Doloremque vitae iste ducimus repellat aliquid quisquam.",
    authorId: 1,
    likes: 54163,
    hearts: 58476,
  },
];
let posts = [
  {
    id: 0,
    content:
      "Corporis similique delectus corporis unde est id porro rerum pariatur. Voluptate earum deserunt ad pariatur officiis tempora. Neque inventore similique molestiae excepturi perferendis harum non. Minima natus odit deserunt.",
    likes: 6585,
    hearts: 48957,
    authorId: 59,
    commentsId: [1, 11, 35],
    title: "bandwidth",
    tags: ["React", "Go"],
  },
  {
    id: 1,
    content:
      "Voluptate animi aperiam. Commodi nemo ut quibusdam neque natus est ut. Nesciunt veritatis assumenda perspiciatis dignissimos commodi hic occaecati. Dolor reprehenderit unde placeat earum. Totam sequi minus distinctio doloribus aliquid corrupti harum. Autem impedit perferendis molestias sint ad eaque.",
    likes: 4605,
    hearts: 19529,
    authorId: 67,
    commentsId: [73, 57],
    title: "application",
    tags: ["React", "Java"],
  },
  {
    id: 2,
    content:
      "Adipisci odio molestiae laudantium voluptatum. Quis blanditiis dolorum animi quidem. Autem ducimus similique vero. Inventore sequi nam quae nesciunt impedit exercitationem facere modi.",
    likes: 34402,
    hearts: 17819,
    authorId: 53,
    commentsId: [10, 83, 71, 9, 32],
    title: "driver",
    tags: ["Go"],
  },
  {
    id: 3,
    content:
      "Molestias voluptates ab sint perferendis. Eligendi doloribus voluptatibus ipsa ullam eligendi earum accusantium. Inventore eveniet modi magnam minima ab harum assumenda. Quo ullam fuga.",
    likes: 85973,
    hearts: 96811,
    authorId: 51,
    commentsId: [90, 64, 84, 49, 43, 60, 29],
    title: "capacitor",
    tags: ["React", "PostgreSQL"],
  },
  {
    id: 4,
    content:
      "Laboriosam qui dicta sed. Quisquam fugit excepturi perferendis officia. Quasi sit magnam. Sapiente molestiae rem ratione exercitationem assumenda. Repellendus distinctio reprehenderit blanditiis facere eos fugiat impedit optio.",
    likes: 8702,
    hearts: 53749,
    authorId: 47,
    commentsId: [45, 62, 80, 76, 15],
    title: "card",
    tags: ["Python", "PostgreSQL", "Go"],
  },
  {
    id: 5,
    content:
      "Qui ab ullam facilis consequuntur ullam. Sunt commodi ratione distinctio architecto iste placeat et ipsum dolore. Adipisci qui nesciunt cumque quasi excepturi optio rerum necessitatibus.",
    likes: 49867,
    hearts: 79629,
    authorId: 32,
    commentsId: [52, 96, 37, 63],
    title: "program",
    tags: ["React", "Python", "PostgreSQL"],
  },
  {
    id: 6,
    content:
      "Magni accusantium corrupti dignissimos. Possimus doloribus illo labore natus. Blanditiis reprehenderit assumenda quasi.",
    likes: 99358,
    hearts: 31195,
    authorId: 91,
    commentsId: [13, 35, 73, 90, 85],
    title: "matrix",
    tags: ["React", "Python"],
  },
  {
    id: 7,
    content:
      "At omnis quia quo delectus sint qui ipsum ad error. Pariatur impedit similique architecto vero ea laborum officia sint. Sunt accusamus perspiciatis modi saepe ea molestiae veritatis nostrum. A quas quisquam dolores qui reiciendis. Iste vel quia repellendus quis deleniti eos quam.",
    likes: 59998,
    hearts: 58140,
    authorId: 20,
    commentsId: [68, 99, 16, 85],
    title: "bus",
    tags: ["React", "Python", "PostgreSQL", "Go"],
  },
  {
    id: 8,
    content:
      "Omnis fugiat nisi temporibus ipsa blanditiis tenetur. Laudantium saepe modi quo quibusdam excepturi ipsam quia. Odio eos reiciendis rerum quasi placeat vel velit.",
    likes: 17804,
    hearts: 32204,
    authorId: 46,
    commentsId: [27, 41],
    title: "bandwidth",
    tags: ["Java"],
  },
  {
    id: 9,
    content:
      "Aliquid id placeat consequuntur atque. Repellat nemo corporis nisi eos deserunt excepturi. Necessitatibus eos distinctio rerum fuga iusto nihil possimus debitis.",
    likes: 72569,
    hearts: 51818,
    authorId: 18,
    commentsId: [46, 49, 96, 13, 31],
    title: "application",
    tags: ["Java", "PostgreSQL"],
  },
  {
    id: 10,
    content:
      "Maxime sapiente exercitationem aperiam incidunt. Aperiam distinctio quia dicta. Ipsa praesentium culpa rem repellendus rerum placeat eligendi. Molestiae quisquam nesciunt eos quasi quos repellat voluptatem sequi. Ipsum exercitationem maxime expedita enim quas tempore illum earum.",
    likes: 53133,
    hearts: 15009,
    authorId: 64,
    commentsId: [79, 71, 36, 81, 73, 66],
    title: "bus",
    tags: ["Python"],
  },
  {
    id: 11,
    content:
      "Cupiditate aperiam earum. Quae nihil harum minus itaque fugit. Asperiores ipsum laudantium incidunt. Possimus ea occaecati.",
    likes: 51172,
    hearts: 1436,
    authorId: 63,
    commentsId: [45, 69, 18, 98, 59, 62],
    title: "alarm",
    tags: ["React", "Java", "PostgreSQL", "Go"],
  },
  {
    id: 12,
    content:
      "Delectus quas nostrum voluptatem quia eius. Iusto neque sequi id eius eos adipisci maiores tempora deserunt. Culpa harum omnis ex minima possimus quis fugit.",
    likes: 4818,
    hearts: 45309,
    authorId: 49,
    commentsId: [28, 57, 65, 40, 64, 56, 17],
    title: "feed",
    tags: ["React", "Python", "Java"],
  },
  {
    id: 13,
    content:
      "Ut itaque asperiores earum. Maiores sed ratione tempora vitae aliquid. Nam praesentium velit quisquam ratione. Eius a tempora nulla quos similique magni repellat a. Nisi quibusdam quia et.",
    likes: 80685,
    hearts: 60073,
    authorId: 43,
    commentsId: [14, 66, 5, 78, 48, 33],
    title: "hard drive",
    tags: ["Python", "Java", "Go"],
  },
  {
    id: 14,
    content:
      "Adipisci nisi ipsum ducimus excepturi debitis excepturi quam. Rem quae soluta deserunt corporis. Quas libero provident ex illum eum nisi. Nihil enim quaerat sint nesciunt possimus odit totam. Recusandae officia vero provident maiores quasi repudiandae natus deleniti.",
    likes: 38834,
    hearts: 55476,
    authorId: 20,
    commentsId: [78, 41, 6, 83, 57, 41, 62, 9],
    title: "capacitor",
    tags: ["React", "Java", "Go"],
  },
  {
    id: 15,
    content:
      "Quidem cupiditate architecto aspernatur facere. Dolor et eligendi. In repellendus saepe. Laboriosam ex ratione id non fugit tempore. Saepe eius magnam quod reiciendis natus dicta amet. Perspiciatis dolor illo quod eos.",
    likes: 59175,
    hearts: 6821,
    authorId: 82,
    commentsId: [95, 70, 94, 96],
    title: "program",
    tags: ["PostgreSQL"],
  },
  {
    id: 16,
    content:
      "Quisquam saepe occaecati placeat ratione inventore aspernatur earum cum. Minus velit quo quo autem dolore sunt voluptatem repudiandae deleniti. Harum rem nihil quae ipsam unde.",
    likes: 66307,
    hearts: 1065,
    authorId: 88,
    commentsId: [59, 82, 70, 89],
    title: "protocol",
    tags: ["React", "Python", "Go"],
  },
  {
    id: 17,
    content:
      "Incidunt incidunt fugit accusantium repudiandae repellendus velit voluptate illum nihil. Eveniet aliquid quae dolores adipisci quae aperiam odit. Voluptatem incidunt ducimus illo.",
    likes: 46673,
    hearts: 35645,
    authorId: 68,
    commentsId: [6, 80, 7, 63, 16],
    title: "system",
    tags: ["React", "Python", "Go"],
  },
  {
    id: 18,
    content:
      "Explicabo laborum doloribus. Excepturi distinctio earum in qui tenetur. Dicta fuga nihil libero. Itaque veniam odit nulla iure consequatur.",
    likes: 89109,
    hearts: 55625,
    authorId: 0,
    commentsId: [71, 50],
    title: "driver",
    tags: ["Python", "PostgreSQL", "Go"],
  },
  {
    id: 19,
    content:
      "Maxime maiores aperiam praesentium quisquam nisi repellendus nesciunt debitis voluptates. Porro omnis omnis eos itaque earum dolores fugiat. Qui impedit quisquam. Commodi fugiat esse fugiat aliquam provident sit.",
    likes: 43297,
    hearts: 18420,
    authorId: 7,
    commentsId: [35, 35, 77],
    title: "alarm",
    tags: ["Python"],
  },
  {
    id: 20,
    content:
      "Unde aliquid ullam. Qui fugit inventore sint. Itaque hic necessitatibus maxime sunt alias deserunt. Perspiciatis veniam voluptatum pariatur voluptatum natus.",
    likes: 65170,
    hearts: 84727,
    authorId: 85,
    commentsId: [41, 0, 0, 6, 91, 74, 30, 79, 21],
    title: "interface",
    tags: ["React", "PostgreSQL", "Go"],
  },
];
let canvases = [
  {
    postId: 0,
    drawing: "https://loremflickr.com/640/480/technics",
    users: [0, 1, 2],
  },
  {
    postId: 1,
    drawing: "https://loremflickr.com/640/480/technics",
    users: [0, 1, 2],
  },
];

for (let i = 0; i < posts.length; i++) {
  posts.commentsId = [93, 35, 10, 90, 5];
}

class CrudService {
  constructor(data) {
    this.data = data;
  }
  findById(id) {
    return this.data[id];
  }
  find(filterParameter) {
    const keys = Object.keys(filterParameter);
    if (keys.length === 0) {
      return this.data;
    }
    if ("sort" in filterParameter) {
      if (filterParameter["sort"] === "asc") {
        return this.data.sort((p1, p2) => p1.likes - p2.likes).slice(0, 5);
      }
      return this.data.sort((p1, p2) => p2.likes - p1.likes).slice(0, 5);
    }
    return this.data.filter((object) =>
      keys.every((key) => {
        if (key === "tag") {
          const tag = filterParameter["tag"];
          return object["tags"].includes(tag);
        }
        return filterParameter[key] === object[key];
      })
    );
  }
  findByIdAndUpdate(id, update) {
    console.log(id);
    console.log(this.data[id]);
    this.data[id] = { ...this.data[id], ...update };
    return this.data[id];
  }
  insert(newObject) {
    this.data.push(newObject);
  }
  delete(id) {
    delete this.data[id];
  }
}

class UserService extends CrudService {
  constructor() {
    super(users);
    this.posts = posts;
  }
  getAllposts(user_id) {
    const post_ids = new Set(this.data[user_id].posts);
    let res = [];
    for (const post of this.posts) {
      if (post_ids.has(post.id)) {
        res.push(post);
      }
    }
    return post;
  }
}

class PostService extends CrudService {
  constructor() {
    super(posts);
    this.comments = comments;
    this.counter = 100;
  }
  getAllComments(post_id) {
    const comments_id = new Set(this.data[post_id].commentsId);
    console.log(comments_id);
    let res = [];
    for (const comment of this.comments) {
      if (comments_id.has(comment.id)) {
        res.push(comment);
      }
    }
    return res;
  }
  addComment(post_id, commentId) {
    const post = this.findById(post_id);
    if ("commentsId" in post) {
      post.commentsId.push(commentId);
    } else {
      post["commentsId"] = [commentId];
    }
    return post;
  }
}

class CommentService extends CrudService {
  constructor() {
    super(comments);
    this.counter = 100;
  }
}
class CanvasService extends CrudService {
  constructor() {
    super(canvases);
  }
}

module.exports = {
  CrudService,
  PostService,
  UserService,
  CommentService,
  CanvasService,
};
