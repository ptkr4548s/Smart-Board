import { useState } from 'react';
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import './joinroom.css';
import uuidGenerator from '../../../utils/roomidGenerator';

interface Props {
  socket: Socket;
  
  setUser: (user: { name: string; roomId: string; userId: string; host: boolean; presenter: boolean }) => void;
}

const Joinroom: React.FC<Props> = ({ socket, setUser }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [roomIdError, setRoomIdError] = useState<string | null>(null); // State variable for room code error
  const navigate = useNavigate();

  const validateRoomId = (id: string) => {
    // Regular expression pattern to match UUID format
    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidPattern.test(id);
  };

  const handleRoomJoin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setNameError("Name cannot be blank");
      return;
    }

    if (!validateRoomId(roomId)) {
      setRoomIdError("Invalid room code ");
      return;
    }

    const roomData = {
      name,
      userId: uuidGenerator(),
      roomId,
      host: true,
      presenter: false
    };
    setUser(roomData);
    navigate(`/${roomId}`);
    socket.emit("userJoined", roomData);
  };

  return (
    <form className="joinroom-form">
      <div className="joinroom-input-group">
        <input
          type="text"
          placeholder="Room Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(null);
          }}
          className="joinroom-input"
        />
        {nameError && <div className="error-message-j">{nameError}</div>}
      </div>
      <div className="joinroom-input-group">
        <input
          type="text"
          placeholder="Room code"
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value);
            setRoomIdError(null);
          }}
          className="joinroom-input"
        />
        {roomIdError && <div className="error-message-j">{roomIdError}</div>} {/* Render error message if roomIdError is not null */}
      </div>
      <button type="submit" onClick={handleRoomJoin} className="joinroom-button">Join Room</button>
    </form>
  );
};

export default Joinroom;
