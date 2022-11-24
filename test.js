fetch('http://localhost:3000/user/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: "mario",
    email: "random111111@gmail.com",
    password: "something",
    avatar: "https://people.cs.umass.edu/~marius/marius.jpg"
  }),
  redirect: 'follow',
}).then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

