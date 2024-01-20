
import './App.css'
import { Socket } from 'socket.io-client';
import { io } from 'socket.io-client'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

import Room from './pages/Roompage/Room'
import Forms from './components/Forms/Forms'
import { useEffect, useState } from 'react';

const server = "http://localhost:8000";

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
    roomId: '',
    userid: '',
    host: false,
    presenter: false,
  });

  useEffect(()=>{
    socket.on("userIsJoined",(data)=>{
      if(data.success){
        console.log("userJoined")
      }else{
        console.log("userJoined error")
      }
    })
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
  <Router>
<Routes>
<Route  path="/" element={<Forms uuid={uuid} socket={socket} setUser={setUser}/>}/>
<Route  path="/:roomId" element={<Room user={user} socket={socket}/>}/>
</Routes>
</Router>

</div>
  )
}

export default App
