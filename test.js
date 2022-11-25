// fetch('http://localhost:3000/user/signup', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     username: "mario",
//     email: "random111111@gmail.com",
//     password: "something",
//     avatar: "https://people.cs.umass.edu/~marius/marius.jpg"
//   }),
//   redirect: 'follow',
// }).then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));


const bcrypt = require("bcryptjs");

async function test() {
  // const salt = "$2a$10$QSirVAjDJ5.RdCuMLH7Q9.";
  const salt = await bcrypt.genSalt(10);
  const password = "123123"
  const match = await bcrypt.compare(password, "$2a$10$QSirVAjDJ5.RdCuMLH7Q9.mF92ZX8.NX/AuNVLldeGxwDOEZCD4Iy");
  // console.log(await bcrypt.hash(password, salt))
  // console.log(await bcrypt.hash("i5kuh1i0z4ndvbf", salt))
  console.log(match)
}

test();

