import { useState } from "react";
import { Socket } from 'socket.io-client';
import {useNavigate} from 'react-router-dom'

interface Props{
  uuid: () => string
  socket:Socket
  setUser: (user: { name: string; roomId: string; userid: string; host: boolean; presenter: boolean }) => void;

}
const Createroom = ({uuid, socket,setUser}:Props) => {

const [roomId, setRoomId]=useState(uuid())
const [name, setName]=useState("")

const navigate = useNavigate();



const handleCreateRoom=(e:React.FormEvent)=>{
   e.preventDefault();

   const roomData={
    name,
    roomId,
    userid:uuid(),
    host:true,
    presenter:true
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
     value={name}
     placeholder="Enter your name"
     onChange={(e)=>setName(e.target.value)}
            />
        </div>
        <div>
            <div>
                <input
                value={roomId}
                type="text"
                placeholder="Generate room code"
                />
                <div>
                    <button type="button" onClick={()=>setRoomId(uuid())}>Generate</button>
                    <button type="button">Copy</button>
                    
                </div>
            </div>
            </div>
            <button type="submit" onClick={handleCreateRoom}>Generate Room</button>
    </form>
  )
}

export default Createroom