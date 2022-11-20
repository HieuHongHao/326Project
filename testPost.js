// fetch('http://localhost:9000/api/users', {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: '{"username": "Peter Phan", "email": "test@gmail.com", "password": "abc123", "avatar": "https://loremflickr.com/480/480/people?lock=54934","favouriteTechStack": ["PostgreSQL", "Java", "Python"]}'
// }).then(response => console.log(response.status));

fetch('http://localhost:9000/api/projects', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  // body: '{"authorID": "6379e14b2eab5fb93f326ec9", "title": "some title", "content": "some content"}'
  body: JSON.stringify({
    authorID: "6379e14b2eab5fb93f326ec9",
    title: "some title",
    content: "some content",
    tags: ["Python", "React", "Go"],
  })
}).then(response => console.log(response.status));
