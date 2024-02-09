
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

const server = "http://localhost:8000";

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
  const [ loginUser, setLoginUser] = useState({})

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
  

  const uuid = () => {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };


  return (
<div>
  <ToastContainer/>
  <Router>
<Routes>
  <Route path="/" element={<Home/>}/>
<Route  path="/rooms-join-create" element={<Forms uuid={uuid} socket={socket} setUser={setUser}/>}/>
<Route  path="/:roomId" element={<Room user={user} socket={socket} users={users}/>}/>
<Route path="/login" element={  <Login setLoginUser={setLoginUser}/>}/>
          
          
          <Route path="/signup" element={<Signup/>}/>
          
         
</Routes>
</Router>

</div>
  )
}

export default App
