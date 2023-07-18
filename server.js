const express = require("express");
const cors = require('cors');
const app = express();

const rooms = new Map();
const server = require('http').createServer(app);
// const io = require("socket.io")(server);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  res.json({message: 'b'});
});

io.on('connection', (socket) => {
  console.log('user connected ', socket.id);
});

server.listen(5000, (err) => {
  if(err){
    throw Error(err)
  }
  console.log("server started on port 5000");
});
