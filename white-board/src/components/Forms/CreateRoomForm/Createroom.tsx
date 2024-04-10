import { useState } from "react";
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import './createroom.css'; // Import modular CSS
import uuidGenerator from "../../../utils/roomidGenerator";

interface Props {

  socket: Socket;
  setUser: (user: { name: string; roomId: string; userId: string; host: boolean; presenter: boolean }) => void;
}

const Createroom: React.FC<Props> = ({  socket, setUser }) => {
  const [roomId, setRoomId] = useState(uuidGenerator());
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null); // State variable for name error
  const navigate = useNavigate();

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate if name is not empty
    if (!name.trim()) {
      setNameError("Name cannot be blank");
      return;
    }

    // Proceed to create room if name is not blank
    const roomData = {
      name,
      userId: uuidGenerator(),
      roomId,
      host: true,
      presenter: true
    };
    setUser(roomData);
    navigate(`/${roomId}`);
    socket.emit("userJoined", roomData);
  };

  return (
    <form className="createroom-form">
      <div className="input-group">
        <input
          type="text"
          value={name}
          placeholder="Room Name"
          onChange={(e) => {
            setName(e.target.value);
            setNameError(null); 
          }}
        />
        {nameError && <div className="error-message-c">{nameError}</div>} {/* Render error message if nameError is not null */}
      </div>
      <div className="input-group">
        <input
          value={roomId}
          type="text"
          placeholder="Generate room code"
          readOnly // Make the input read-only
        />
        <div className="button-group">
          <button type="button" onClick={() => setRoomId(uuidGenerator())}>Generate</button>
          <button type="button">Copy</button>
        </div>
      </div>
      <button className="solo-button" type="submit" onClick={handleCreateRoom}>Generate Room</button>
    </form>
  );
}

export default Createroom;

