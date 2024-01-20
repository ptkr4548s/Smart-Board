import Createroom from './CreateRoomForm/Createroom'
import './forms.css'
import { Socket } from 'socket.io-client';
import Joinroom from './JoinRoomForm/Joinroom'
interface Props{
  uuid:() =>string;
  socket:Socket
  setUser: (user: { name: string; roomId: string; userid: string; host: boolean; presenter: boolean }) => void;

}


const Forms = ({uuid,socket,setUser}:Props) => {
  return (
    <div className="main-cont">
        <div className="sub-cont">
            <h1>Create Room</h1>
            <Createroom uuid={uuid} socket={socket} setUser={setUser}/>
        </div>
        <div className="sub-cont">
            <h1>Join Room</h1>
            <Joinroom uuid={uuid}  socket={socket} setUser={setUser}/>
        </div>
    </div>
  )
}

export default Forms