const app = require("express")();
const httpServer = require("http").createServer(app);
const options = {
  cors: {
    origin: "*",
    method: ["GET", "PUT", "POST"],
  },
};
const io = require("socket.io")(httpServer, options);

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);
});

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end("<h1>React is the best</h1>");
});
httpServer.listen(3000, () => console.log("Server running on port 3000"));
// WARNING !!! app.listen(3000); will not work here, as it creates a new HTTP server
