const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const apiRouter = require('./routes/api');

// Database connection
mongoose.connect(process.env.DATABASE_URL, function(err, connection) {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connection to database established");
  }
});
const database = mongoose.connection;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);

app.get('*', function(req, res) {
  res.sendFile('404.html', { root: __dirname + "/src" });
});

const options = {
  cors: {
    origin: "*",
    method: ["GET", "PUT", "POST"],
  },
};
const httpServer = require("http").createServer(app);
const io = (module.exports.io = require("socket.io")(httpServer, options));
const sockets = {};
const usernames = {};
const inbox = {};
io.on("connection", (socket) => {
  socket.on("login", (username) => {
    sockets[username] = socket;
    usernames[socket.id] = username;
  });
  if (usernames[socket.id] in inbox && inbox[usernames[socket.id]]) {
    const username = usernames[socket.id];
    sockets[username].emit("inbox-message", inbox[username]);
    inbox[username] = null;
  }
  socket.on("drawing", (data) => socket.broadcast.emit("drawing", data));
  socket.on("chat-message", (data) =>
    socket.broadcast.emit("chat-message", data)
  );
  socket.on("disconnect", () => {
    const username = usernames[socket.id];
    delete sockets[username];
    delete usernames[socket.id];
  });
});

module.exports = app;
