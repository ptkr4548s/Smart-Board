const Connection =require('./db.js');
const express = require("express");
const mongoose=require("mongoose");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const {Server} = require("socket.io");
const { addUser, getUser, removeUser } = require("./utils/users");

const io =new Server(server);
require('dotenv').config();
app.use(express.json()); 
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

Connection(process.env.MONGO_USERNAME,process.env.MONGO_PASSWORD)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        if (password === user.password) {
          res.status(200).json({ message: "Login Successful", user: user });
        } else {
          res.status(401).json({ message: "Password didn't match" });
        }
      } else {
        res.status(404).json({ message: "User not registered" });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Incomplete data. Please provide name, email, and password." });
  }

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        return res.status(409).json({ message: "User already registered" });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        return newUser.save();
      }
    })
    .then(() => {
      return res.status(201).json({ message: "Successfully Registered, Please login now." });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    });
});





let roomIdGlobal, imgURLGlobal

io.on('connection',(socket)=>{
  socket.on("userJoined", (data) => {
    const { name, userId, roomId, host, presenter } = data;
    roomIdGlobal = roomId;
    socket.join(roomId);
    const users = addUser({ name, userId, roomId, host, presenter,socketId:socket.id });
    socket.emit("userIsJoined", { success: true, users });
    socket.broadcast.to(roomId).emit("userJoinedMessageBroadCasted", name);
    socket.broadcast.to(roomId).emit("allUsers", users);
    socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
      imgURL: imgURLGlobal,
    });
  });

  socket.on("whiteboardData",(data)=>{
     imgURLGlobal = data;
     socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse",{
      imgURL:data,
   })
  }); 

  socket.on("message",(data)=>{
    const {message}=data;
    const user=getUser(socket.id)
   
    if(user){ 

    
    socket.broadcast.to(roomIdGlobal).emit("messageResponse",{message,name:user.name})
    }
  })

  socket.on("disconnect",()=>{
    const user=getUser(socket.id)
    if(user){
    removeUser(socket.id)
   
    
    socket.broadcast.to(roomIdGlobal).emit("userLeftMessageBroadCasted", user.name)
    }
  })
})


// serve on port
const PORT = process.env.PORT || 8000;

server.listen(PORT, () =>
  console.log(`server is listening on port:${PORT}`)
);





