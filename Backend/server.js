const app = require("express")();
const httpServer = require("http").createServer(app);
const options = {
  cors: {
    origin: "*",
    method: ["GET", "PUT", "POST"],
  },
};
const io = require("socket.io")(httpServer, options);

const sockets = {};
const clients = {};
const inbox = {};
let counter = 1
io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);
  
  if(!socket.id in sockets){
    sockets[socket.id] = `client ${counter}`;
    clients[`client ${counter}`] = socket.id;
    if(`client ${counter}` in inbox && inbox[`client ${counter}`].length > 0){
        socket.emit("consume-inbox-msg",inbox[`client ${counter}`]);
        inbox[`client ${counter}`] = [];
    }
    counter += 1;
  }
  socket.on("send-message",payload => {
    const {receiver,message} = payload;
    if(receiver in clients){
        clients[receiver].emit("response-message",{sender: sockets[socket.id], message: message});
    }else{
        inbox[receiver] = message;
    }
})
  socket.on("disconnect",() => {
    console.log(`client ${sockets[socket.id]} disconnecting ... `);
  })
});

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end("<h1>React is the best</h1>");
});
httpServer.listen(3000, () => console.log("Server running on port 3000"));
// WARNING !!! app.listen(3000); will not work here, as it creates a new HTTP server
