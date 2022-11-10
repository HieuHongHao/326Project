// let { users, comments, posts, canvases } = require("./data_gen_script");

// async function getData(path) {
//   const res = await fetch("http://localhost:9000/api/" + path);
//   return await res.json();
// }

// HARDCODE BECAUSE HEROKU BROKE WITH API
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
    id: 0,
    postId: 0,
    content:
      "Non illo laborum corrupti. Deserunt et sequi. Accusantium consequatur omnis. Doloremque aperiam corrupti est nesciunt rerum architecto magni quas.",
    authorId: 0,
    likes: 67422,
    hearts: 23876,
  },
  {
    id: 1,
    postId: 1,
    content:
      "Rem voluptas recusandae laudantium fugiat laborum. Nihil fugiat nostrum nihil veniam quidem placeat fugit. Doloremque vitae iste ducimus repellat aliquid quisquam.",
    authorId: 1,
    likes: 54163,
    hearts: 58476,
  },
  {
    id: 2,
    postId: 2,
    content:
      "Pariatur consectetur voluptate distinctio nam quos sequi. Similique similique tempora perspiciatis perferendis laboriosam odit non animi. Possimus autem ducimus adipisci quia modi incidunt fugiat. Rem praesentium error aperiam eaque.",
    authorId: 2,
    likes: 18015,
    hearts: 37158,
  },
  {
    id: 3,
    postId: 3,
    content:
      "Rem voluptas recusandae laudantium fugiat laborum. Nihil fugiat nostrum nihil veniam quidem placeat fugit. Doloremque vitae iste ducimus repellat aliquid quisquam.",
    authorId: 1,
    likes: 54163,
    hearts: 58476,
  },
  {
    id: 4,
    postId: 77,
    content:
      "Rem voluptas recusandae laudantium fugiat laborum. Nihil fugiat nostrum nihil veniam quidem placeat fugit. Doloremque vitae iste ducimus repellat aliquid quisquam.",
    authorId: 1,
    likes: 54163,
    hearts: 58476,
  },
  {
    "id": 5,
    "postId": 97,
    "content": "Odit voluptatum numquam est consequatur quis iure maiores natus. Odio tempora fugiat. Cupiditate quisquam enim.",
    "authorId": 14,
    "likes": 68284,
    "hearts": 67400
  },
  {
    "id": 6,
    "postId": 10,
    "content": "Placeat iusto ipsum voluptatum maiores excepturi. Dignissimos adipisci iure assumenda deserunt architecto. Rem rem maiores. Veniam amet fugiat temporibus facilis vero. Sequi minima quos repellendus molestias minima quo nostrum est repellat. Quidem voluptatibus facilis voluptatibus laboriosam non rerum.",
    "authorId": 15,
    "likes": 81847,
    "hearts": 51737
  },
  {
    "id": 7,
    "postId": 8,
    "content": "Illum eos laborum modi illo error occaecati impedit. Beatae a molestias neque ipsam amet. Laboriosam incidunt itaque doloribus et accusantium animi itaque. Praesentium debitis quasi dignissimos quia. Earum hic exercitationem error incidunt ab esse. Quo maxime minima ipsa totam assumenda occaecati delectus.",
    "authorId": 16,
    "likes": 32979,
    "hearts": 77887
  },
  {
    "id": 8,
    "postId": 20,
    "content": "Quasi excepturi provident itaque aperiam impedit. Enim quaerat quasi pariatur ea distinctio voluptate accusantium esse nisi. Libero accusantium ut fuga magni. Non neque numquam accusantium iste.",
    "authorId": 17,
    "likes": 58289,
    "hearts": 91726
  },
  {
    "id": 9,
    "postId": 11,
    "content": "Alias eaque ipsam. Architecto omnis dicta ut temporibus fugiat mollitia. Illo esse dolorum ipsa quo officiis iste non.",
    "authorId": 18,
    "likes": 3534,
    "hearts": 15196
  },
  {
    "id": 10,
    "postId": 25,
    "content": "Molestias excepturi inventore placeat eaque est culpa deserunt deleniti sed. Aperiam eligendi id beatae omnis sint eum quibusdam unde id. Alias quibusdam delectus quibusdam facilis earum perferendis.",
    "authorId": 19,
    "likes": 92982,
    "hearts": 49362
  },
  {
    "id": 11,
    "postId": 51,
    "content": "Eaque nam doloremque nisi animi neque. Ipsam debitis esse hic commodi ad doloremque. Voluptatibus aperiam ipsam cumque cupiditate fugit. Quaerat voluptates fugiat.",
    "authorId": 20,
    "likes": 5368,
    "hearts": 54767
  },
  {
    "id": 12,
    "postId": 82,
    "content": "Numquam consequatur itaque natus aut facere libero consectetur illo. Recusandae ipsa officiis asperiores facere quibusdam odit ab. Consequatur cupiditate delectus quam cupiditate. Eveniet facilis corrupti doloribus tempora reprehenderit inventore. Sed fugit corrupti laborum officiis est dolores ea.",
    "authorId": 21,
    "likes": 82861,
    "hearts": 10789
  },
  {
    "id": 13,
    "postId": 58,
    "content": "Numquam suscipit culpa quia quaerat facere pariatur. Natus rem veniam quas. Nisi culpa provident placeat corrupti ducimus cupiditate iste. Nesciunt enim dicta quasi assumenda a. Doloribus corporis at. Numquam suscipit sapiente quisquam.",
    "authorId": 22,
    "likes": 26214,
    "hearts": 59858
  },
  {
    "id": 14,
    "postId": 80,
    "content": "Quo soluta dolor mollitia nesciunt optio atque. Pariatur commodi adipisci velit ipsam ipsum laboriosam perferendis. Adipisci quas doloremque voluptates libero itaque.",
    "authorId": 23,
    "likes": 88333,
    "hearts": 7225
  },
  {
    "id": 15,
    "postId": 6,
    "content": "Debitis ad fuga. Placeat accusamus perferendis eius rerum exercitationem illum voluptates numquam corporis. Facilis in exercitationem repellat expedita temporibus. Ex repudiandae libero incidunt. Nihil possimus occaecati.",
    "authorId": 24,
    "likes": 75460,
    "hearts": 71274
  },
  {
    "id": 16,
    "postId": 72,
    "content": "Fugit ipsam nulla et aut sint eum assumenda eum doloribus. Recusandae repellendus dolorem voluptas beatae inventore illo pariatur culpa. Odit assumenda nam repellat. Ad quibusdam distinctio exercitationem amet quasi.",
    "authorId": 25,
    "likes": 14845,
    "hearts": 95033
  },
  {
    "id": 17,
    "postId": 10,
    "content": "Libero nam voluptatum mollitia eius ducimus enim mollitia. Eos eum voluptatem cum. Placeat id ipsa a labore eligendi aliquam.",
    "authorId": 26,
    "likes": 42820,
    "hearts": 84478
  },
  {
    "id": 18,
    "postId": 73,
    "content": "Provident asperiores repellendus maiores eveniet cumque modi. Beatae modi perferendis vel velit nobis suscipit accusantium facere ex. Error dolore dolorem. Nisi modi ipsa eligendi minima quis cumque. Necessitatibus nesciunt quia quas repudiandae nam libero sit alias debitis. Ab quos nihil iste culpa aliquid.",
    "authorId": 27,
    "likes": 35508,
    "hearts": 34534
  },
  {
    "id": 19,
    "postId": 96,
    "content": "Iure error laboriosam quas dolorem architecto labore veniam quo. Sequi repudiandae rem nemo alias harum. Dolorem nostrum adipisci. Id doloribus quo omnis dolorum. Iure saepe doloremque officiis ea officiis reiciendis aliquid vel. Iusto dolore soluta dicta.",
    "authorId": 28,
    "likes": 64968,
    "hearts": 16761
  },
  {
    "id": 20,
    "postId": 73,
    "content": "Totam illum nisi. Adipisci repellendus nihil architecto maxime possimus accusantium reiciendis esse. Est id quo sequi deserunt expedita. Quod pariatur sit.",
    "authorId": 29,
    "likes": 7159,
    "hearts": 87106
  },
  {
    "id": 21,
    "postId": 53,
    "content": "Laborum laborum illum quis ex sed deserunt sequi quos. Molestias dolorem accusamus temporibus. Voluptate a atque distinctio illo voluptatem nemo nihil. Assumenda quisquam facere laborum dolorem nihil magnam itaque iure ex.",
    "authorId": 53,
    "likes": 26748,
    "hearts": 4520
  },
  {
    "id": 22,
    "postId": 11,
    "content": "Error iusto consequatur iure at nam non recusandae aperiam. Harum quibusdam voluptatem ad repudiandae sunt. Consectetur ipsam vel quia nam. Soluta sapiente dolor ex.",
    "authorId": 54,
    "likes": 64751,
    "hearts": 46961
  },
  {
    "id": 23,
    "postId": 42,
    "content": "Sit ut eos debitis ab ab pariatur. Voluptates culpa ratione quasi harum ut nesciunt ex. Expedita porro quo. Sint neque voluptate aut alias quod saepe ea incidunt. Labore error temporibus amet et natus aliquid repellat.",
    "authorId": 55,
    "likes": 36258,
    "hearts": 77477
  },
  {
    "id": 24,
    "postId": 46,
    "content": "Labore blanditiis quam ipsa quam porro omnis delectus excepturi quo. Reprehenderit explicabo optio. Minus est suscipit eos non reprehenderit. Veniam ab nam tempora veniam beatae nobis voluptatem. Exercitationem laudantium delectus reprehenderit incidunt maxime reiciendis laborum consequuntur praesentium. Voluptas officia harum hic asperiores.",
    "authorId": 56,
    "likes": 91259,
    "hearts": 27005
  },
  {
    "id": 25,
    "postId": 28,
    "content": "Est voluptatibus vel sit tempore quam ea recusandae. Esse beatae non nostrum esse libero iusto in delectus. Perspiciatis quae incidunt cumque delectus. Magni occaecati officiis sit illum pariatur excepturi asperiores.",
    "authorId": 57,
    "likes": 70734,
    "hearts": 31131
  },
  {
    "id": 26,
    "postId": 80,
    "content": "Voluptate occaecati dolorem laborum. Nisi modi tempore magnam quasi consectetur fugiat. Error perspiciatis quisquam mollitia molestias.",
    "authorId": 58,
    "likes": 31004,
    "hearts": 24843
  },
  {
    "id": 27,
    "postId": 88,
    "content": "Laudantium cum tenetur voluptatem reiciendis omnis vero voluptatem. Officiis iste blanditiis ratione. Esse quasi dignissimos iste reiciendis non inventore quos iure dicta. Quis eligendi libero. Quia corrupti quam aperiam error reiciendis et. Consequatur ad ea quod eum sapiente.",
    "authorId": 59,
    "likes": 16106,
    "hearts": 44979
  },
  {
    "id": 28,
    "postId": 96,
    "content": "Magni officia fuga rerum nulla nihil culpa maxime ullam. Rerum suscipit nulla voluptatum corporis sapiente. Assumenda asperiores nulla tenetur facere reiciendis asperiores perferendis corporis voluptatibus. Maiores excepturi harum.",
    "authorId": 60,
    "likes": 4138,
    "hearts": 94433
  },
  {
    "id": 29,
    "postId": 0,
    "content": "Eos voluptas rerum maiores nihil magni impedit. Commodi repellat eum voluptatem. Temporibus possimus animi. Sint eaque quidem. Facere quae quo eveniet.",
    "authorId": 61,
    "likes": 64420,
    "hearts": 77633
  },
  {
    "id": 30,
    "postId": 49,
    "content": "Corrupti esse reiciendis deleniti sit iusto quisquam aut doloribus. A aliquid tenetur officia ab adipisci possimus voluptas. Amet molestias omnis labore laboriosam eum. Consequuntur repellat incidunt sequi rerum. Consequatur minus distinctio facilis ullam necessitatibus dolorum vero. Soluta eaque fugiat consequatur reiciendis aliquid culpa esse natus repellendus.",
    "authorId": 62,
    "likes": 53018,
    "hearts": 67769
  },
  {
    "id": 31,
    "postId": 95,
    "content": "Deleniti beatae voluptates fugit. Fuga facilis at iure sunt sunt repellendus. Quia vero omnis quis. Praesentium tenetur adipisci id quos provident quae. Cupiditate officiis cumque laboriosam fugiat iure rem temporibus ad blanditiis.",
    "authorId": 63,
    "likes": 56313,
    "hearts": 37660
  },
  {
    "id": 32,
    "postId": 89,
    "content": "Aperiam eos impedit dolorum modi harum. Provident odit atque. Quos tempora reiciendis. Ea deserunt excepturi sunt nam deserunt. Quos quam tenetur ea nihil eos dicta.",
    "authorId": 64,
    "likes": 28411,
    "hearts": 27019
  },
  {
    "id": 33,
    "postId": 7,
    "content": "Quo nostrum sed aspernatur. Praesentium enim commodi ad quibusdam officiis doloremque nesciunt corrupti. Iusto optio dolorem odit ullam accusamus neque ullam labore.",
    "authorId": 65,
    "likes": 42059,
    "hearts": 4613
  },
  {
    "id": 34,
    "postId": 1,
    "content": "Molestiae nesciunt nemo hic reprehenderit eius non iusto quaerat quos. Mollitia praesentium doloremque. Culpa illum nam non blanditiis dolorum libero laudantium voluptas fugit. Magnam dicta incidunt eveniet consectetur eligendi exercitationem. Eveniet quasi incidunt consequatur explicabo distinctio voluptas.",
    "authorId": 66,
    "likes": 55766,
    "hearts": 14908
  },
  {
    "id": 35,
    "postId": 40,
    "content": "Est asperiores eaque necessitatibus quos. Nesciunt repellat corporis praesentium enim eligendi necessitatibus. Error iusto perspiciatis. Fugiat esse magni sunt mollitia laborum. Dolorem atque accusamus inventore. Voluptatem hic sequi consectetur quisquam sequi minima.",
    "authorId": 67,
    "likes": 69988,
    "hearts": 13652
  },
  {
    "id": 36,
    "postId": 89,
    "content": "Vel numquam quaerat quasi voluptatem sint unde impedit. Est voluptatem natus omnis dolores quia ducimus cumque dolorum quod. Omnis reiciendis tempore natus alias facilis ipsa odio enim quidem. Doloremque excepturi iusto. Eaque doloremque qui placeat suscipit vero unde.",
    "authorId": 68,
    "likes": 423,
    "hearts": 32562
  },
  {
    "id": 37,
    "postId": 56,
    "content": "Dolorum enim ullam labore enim rem eligendi minima laborum. Non distinctio tenetur maxime inventore odit. Nihil quis quisquam ex nihil. Excepturi excepturi recusandae ipsum voluptate labore. Tenetur iste ipsa fugit asperiores officia odio excepturi repudiandae. Sint repellendus laudantium quaerat fugiat culpa.",
    "authorId": 69,
    "likes": 64746,
    "hearts": 21255
  },
  {
    "id": 38,
    "postId": 68,
    "content": "Nobis laudantium ipsa deserunt nemo eaque asperiores culpa necessitatibus. Tempore pariatur quis minima quasi. Nostrum doloremque qui tempore totam inventore. Laboriosam numquam ea architecto officia impedit molestiae doloribus maiores. Eaque maxime dolorem.",
    "authorId": 70,
    "likes": 14192,
    "hearts": 13031
  },
  {
    "id": 39,
    "postId": 2,
    "content": "Impedit tenetur perspiciatis unde odit magni in maiores. Doloremque blanditiis laboriosam unde sequi aliquid laudantium magni. Nihil molestiae optio enim dolore perferendis excepturi. Odit perspiciatis reiciendis totam. Laborum dolores aspernatur voluptates natus ratione itaque quae perferendis qui.",
    "authorId": 71,
    "likes": 92579,
    "hearts": 8172
  },
  {
    "id": 40,
    "postId": 38,
    "content": "Sapiente autem autem dolorum repellat ratione dicta eum optio. Officiis pariatur quaerat optio quasi quod sunt reiciendis. Molestias assumenda veniam nulla officiis quae adipisci. Voluptatum voluptas et eum sed assumenda. Tempora accusantium animi. Ut voluptate iure vel nihil id facilis voluptates.",
    "authorId": 72,
    "likes": 9750,
    "hearts": 16472
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
  posts[i].commentsId = [i,i+21];
}

for(let i = 0 ; i < 21;i++){
  comments[i].postId = i;
}
for(let i = 21 ; i < 40;i++){
  comments[i].postId = i - 21;
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
