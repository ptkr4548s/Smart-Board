import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import './chatroom.css'

interface Message {
  message: string;
  name: string;
}

interface Props{
  setOpenedChatTab:(value:boolean)=>void
  socket:Socket
}
const ChatRoom = ({setOpenedChatTab,socket}:Props) => {
 
  const [chat, setChat] = useState<Message[]>([]);

   const [message,setMessage]=useState('');

   useEffect(()=>{
     socket.on("messageResponse",(data:Message)=>{
      setChat((prevChats)=>[...prevChats,data]);
     })
   })

   const handleSubmit=(e:React.FormEvent)=>{
  e.preventDefault();
  if(message.trim()!==''){
    const newMessage:Message= {message,name:'You'}
  socket.emit("message",{newMessage});
  setChat((prevChats)=>[...prevChats,newMessage])
  setMessage('');
  }
   }


  return (
  
         <div
         className="side-box"
         
         style={{width:"250px", left: "0%"}}>
           <button type="button"
           onClick={()=>setOpenedChatTab(false)} >
             Close
           </button>
      
           <div className="user-display" style={{height:"70%"}} >
            { chat.map((msg,index)=>(
<p key={index}>
  {msg.name}{msg.message}
</p>
             ))}

           </div>
           <div>
            <form onSubmit={handleSubmit}>
            <input type="text"
             placeholder="Enter message"
             value={message}
             onChange={(e)=>setMessage(e.target.value)}
             />
            <button type="submit">Send</button>
            </form>
           </div>
         </div>
       )
     }

export default ChatRoom