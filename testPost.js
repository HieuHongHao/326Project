fetch('http://localhost:9000/api/users', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: '{"username": "Peter Phan", "email": "test@gmail.com", "password": "abc123", "avatar": "https://loremflickr.com/480/480/people?lock=54934","favouriteTechStack": ["PostgreSQL", "Java", "Python"]}'
}).then(response => console.log(response.status));
