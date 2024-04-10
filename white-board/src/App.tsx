
import './App.css'
import { Socket } from 'socket.io-client';
import { io } from 'socket.io-client'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import Room from './pages/Roompage/Room'
import Forms from './components/Forms/Forms'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './pages/Homepage/Home';
import { useEffect, useState } from 'react';

const server = "https://drawingboard.onrender.com";

interface JoinedUsers {
  name: string;
  userId: string;
  roomId: string;
  host: boolean;
  presenter: boolean;
}
const connectionOptions: {
  forceNew?: boolean;
  reconnectionAttempts: number;
  timeout: number;
  transports: string[];
} = {
  forceNew: true,
  reconnectionAttempts: Infinity,
  timeout: 10000,
  transports: ["websocket"],
};

const socket : Socket = io(server, connectionOptions);

const App=() => {
 

  const [user, setUser] = useState({
    name: '',
    userId: '',
    roomId: '',
    host: false,
    presenter: false,
  });

  const [users, setUsers] = useState<JoinedUsers[]>([]);
  

  useEffect(()=>{
    socket.on("userIsJoined",(data)=>{
      if(data.success){
        console.log("userJoined")
        setUsers(data.users);
      }else{
        console.log("userJoined error")
      }
    })

    socket.on("allUsers",data=>{
      setUsers(data);
    })

    socket.on("userJoinedMessageBroadCasted",(data)=>{
      toast.info(`${data} joined the room`);
    })

    socket.on("userLeftMessageBroadCasted",(data)=>{
     toast.info(`${data} left the room`);
    })
    return () => {
      socket.off("userIsJoined");
      socket.off("allUsers");
      socket.off("userJoinedMessageBroadCasted");
      socket.off("userLeftMessageBroadCasted");
    };
  
  },[])
  


  return (
<div className="App-main">
  <ToastContainer/>
  <Router>
<Routes>
  <Route path="/" element={<Home/>}/>
<Route  path="/rooms-join" element={<Forms socket={socket} setUser={setUser}/>}/>
<Route path="/:roomId" element={<Room user={user} socket={socket} users={users} setUsers={setUsers} />} />
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />

          
         
</Routes>
</Router>

</div>
  )
}

export default App
