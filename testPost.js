// fetch('http://localhost:9000/api/users', {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: '{"username": "Peter Phan", "email": "test@gmail.com", "password": "abc123", "avatar": "https://loremflickr.com/480/480/people?lock=54934","favouriteTechStack": ["PostgreSQL", "Java", "Python"]}'
// }).then(response => console.log(response.status));

// fetch('http://localhost:9000/api/projects', {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     authorID: "6379e14b2eab5fb93f326ec9",
//     title: "some title",
//     content: "some content",
//     tags: ["Python", "React", "Go"],
//   })
// }).then(response => console.log(response.status));

// fetch('http://localhost:9000/api/users/delete/637a0b3b3302144d935382c7', {
//   method: 'DELETE',
// }).then(() => element.innerHTML = 'Delete successful');

// fetch('http://localhost:9000/api/users/delete/637a430b1f1a1d6ad0b755ce').then(res => res.text()).then(res => console.log(res))

fetch('http://localhost:9000/api/projects/delete/637a6d1069ab705ab79344f0').then(res => res.text()).then(res => console.log(res))
