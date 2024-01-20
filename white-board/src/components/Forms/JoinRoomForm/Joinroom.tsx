import { Socket } from 'socket.io-client';
import './joinroom.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface Props{
  socket:Socket
  uuid:()=>string
  setUser: (user: { name: string; roomId: string; userid: string; host: boolean; presenter: boolean }) => void;
}

const Joinroom = ({socket,setUser,uuid}:Props) => {

const [roomId,setRoomId]=useState("");
const [name,setName]=useState("");
const navigate = useNavigate();

const handleRoomJoin=(e:React.FormEvent)=>{
  e.preventDefault();

  const roomData={
    name,
    roomId,
    userid:uuid(),
    host:true,
    presenter:false
   };
   setUser(roomData);
   navigate(`/${roomId}`)
   socket.emit("userJoined",roomData);
}

  return (
    <form>
    <div>
        <input
 type="text"
 placeholder="Enter your name"
 onChange={(e)=>setName(e.target.value)}
        />
    </div>
    <div>
        <div>
            <input
            type="text"
            placeholder="Generate room code"
            onChange={(e)=>setRoomId(e.target.value)}
            />
     
        </div>
        </div>
        <button type="submit" onClick={handleRoomJoin}>Generate Room</button>
</form>
  )
}

export default Joinroom