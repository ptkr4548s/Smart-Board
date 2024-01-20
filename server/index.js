const express = require("express");
const app = express();
const cors = require("cors");

const server = require("http").createServer(app);
const {Server} = require("socket.io");

const io =new Server(server);

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("server");
});

let roomIdGlobal, imgURLGlobal

io.on('connection',(socket)=>{
  socket.on("userJoined", (data)=>{
    const {name, userId, roomId, host, presenter} = data;
    roomIdGlobal=roomId
    socket.join(roomId);
    socket.emit("userIsJoined", {success:true});
    socket.broadcast.to(roomId).emit("whiteBoardDataResponse",{
       imgURL:imgURLGlobal
    })
  })

  socket.on("whiteboardData",(data)=>{
     imgURLGlobal = data;
     socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse",{
      imgURL:data,
   })
  }); 
})


// serve on port
const PORT = process.env.PORT || 8000;

server.listen(PORT, () =>
  console.log(`server is listening on port:${PORT}`)
);





