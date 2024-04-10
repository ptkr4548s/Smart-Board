import { useEffect, useState, useRef } from 'react';
import { Socket } from 'socket.io-client';
import './chatroom.css';

interface Message {
  message: string;
  name: string;

}

interface Props {
  setOpenedChatTab: (value: boolean) => void;
  socket: Socket;
  userName:string;
}

const ChatRoom = ({ setOpenedChatTab, socket,userName }: Props) => {
  const [chat, setChat] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setChat(JSON.parse(storedMessages));
    }

    const messageResponseHandler = (data: Message) => {
      console.log("Received message:", data);
      setChat(prevChats => {
        const updatedChats = [...prevChats, data];
        localStorage.setItem('chatMessages', JSON.stringify(updatedChats));
        return updatedChats;
      });
    };

    socket.on("messageResponse", messageResponseHandler);

    return () => {
      socket.off("messageResponse", messageResponseHandler);
    };
  }, [socket]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== '') {
      const newMessage: Message = { message, name: userName };
      socket.emit("message", newMessage);
      setChat((prevChats) => [...prevChats, newMessage]);
      localStorage.setItem('chatMessages', JSON.stringify([...chat, newMessage]));
      setMessage('');
    }
  };

  useEffect(() => {
    // Scroll chat container to bottom when chat updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="side-box" style={{ width: "250px", left: "0%" }}>
      <button className="cht-close-btn" type="button" onClick={() => setOpenedChatTab(false)}>Close</button>
      <div className="user-display" style={{ height: "93%", overflowY: "auto" }} ref={chatContainerRef}>
        {chat.map((msg, index) => (
          <p className="side-box-users" key={index}>
            {msg.name}: {msg.message || "<No message>"}
          </p>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="cht-send-btn" type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;

