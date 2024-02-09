import { useEffect, useRef, useState } from "react"
import WhiteBoard from "../../components/Whiteboard/WhiteBoard";
import ChatRoom from "../../components/ChatRoom/ChatRoom";

import './room.css'
import html2pdf from 'html2pdf.js'


import { Socket } from 'socket.io-client';

interface JoinedUsers{
  name: string
  userId: string
  roomId: string
  host: boolean
  presenter: boolean
}

interface Props{
  user:  { name: string; userId: string; roomId: string; host: boolean; presenter: boolean }
  socket:Socket
  users:JoinedUsers[]
  
}

interface Element {
  type: string;
  offsetX: number;
  height:number;
  width:number;
  offsetY: number;
  path: number[][];
  stroke: string;
}

const Room = ({user,socket,users}:Props) => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

const [tool,setTool]=useState("pencil");
const [color,setColor]=useState("black");
const [elements, setElements] = useState<Element[]>([]);
const [history, setHistory] = useState<Element[][]>([]);
const [openedUserTab, setOpenedUserTab]=useState(false);
const [openedChatTab, setOpenedChatTab]=useState(false);






useEffect(()=>{
   return ()=>{
    socket.emit("userLeft",user)
   }
},[])

const handleClearCanvas=()=>{
  const canvas=canvasRef.current;
  if(canvas){
  const ctx=canvas.getContext("2d");
  if(ctx){
   ctx.fillStyle="white";
   ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height)
   }
  }
   setElements([])



}
const undoOperation = () => {
  setHistory((prevHistory) => {
    const updatedHistory: Element[][] = [...prevHistory, elements];
    return updatedHistory;
  });

  setElements((prevElements) => prevElements.slice(0, prevElements.length - 1));
};

const redoOperation = () => {
  setElements((prevElements) => [
    ...prevElements,
    ...history[history.length - 1],
  ]);

  setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
};

const handleDownload = () => {
  const whiteboardContainer = document.querySelector('.canvas-box');

  if (whiteboardContainer) {
    html2pdf(whiteboardContainer, {
      margin: 0,
      filename: 'whiteboard.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a3', orientation: 'landscape' },
    });
  }
};


  return (
    <div>
      <button type="button"
      onClick={()=>setOpenedUserTab(true)}>
        Users
      </button>
 
      {
       openedUserTab && (
          <div
          className="side-box"
          style={{width:"250px", left: "0%"}}>
            <button type="button" onClick={()=>setOpenedUserTab(false)}>
              Close
            </button>
       
            <div className="user-display">
            {users.map((usr, index) => (
  <p key={index} className="side-box-users">
    {usr.name}
    { user.userId === usr.userId && " (You)"}
   </p>
))}

            </div>
          </div>
        )
      }
          <button type="button" onClick={()=>setOpenedChatTab(true)}>
              Chat
            </button>
          {
       openedChatTab && (
<ChatRoom setOpenedChatTab={setOpenedChatTab} socket={socket}/>
        )
      }
         <h1>Whiteboard sharing app
          <span>[User online : {users.length}]</span>
         </h1>
         {
          user?.presenter&&(
          <div className="board-elements">
          <div className="tool-options">
              <div>
                  <label htmlFor="pencil">Pencil</label>
              <input
                type="radio"
                name="tool"
                value="pencil"
                checked={tool=== "pencil"}
                onChange={(e)=>setTool(e.target.value)}/>
              </div>
              <div>
                  <label htmlFor="line">Line</label>
              <input
                type="radio"
                name="tool"
                value="line"
                checked={tool=== "line"}
                onChange={(e)=>setTool(e.target.value)}/>
              </div>
              <div>
                  <label htmlFor="rect">Rect</label>
              <input
                type="radio"
                name="tool"
                value="rect"
                checked={tool=== "rect"}
                onChange={(e)=>setTool(e.target.value)}/>
              </div>
              <div>
                  <label htmlFor="Ellipse">Ellipse</label>
              <input
                type="radio"
                name="tool"
                value="ellipse"
                checked={tool=== "ellipse"}
                onChange={(e)=>setTool(e.target.value)}/>
              </div>

          </div>
          <div>
              <div>
                  <label htmlFor="color">Select Color:</label>
                  <input
                  type="color"
                  id="color" 
                  onChange={(e)=>setColor(e.target.value)}
                  />
              </div>
              
          </div>
          <div>
    <label htmlFor="text">Text</label>
    <input
      type="radio"
      name="tool"
      value="text"
      checked={tool === "text"}
      onChange={(e) => setTool(e.target.value)}
    />
  </div>
          <div >
            

<button
disabled={elements.length===0}
onClick={()=> undoOperation()}
>Undo
</button>
<button
disabled={history.length<1}
onClick={()=> redoOperation()}
>Redo
</button>
          </div>
          <div>
              <button onClick={handleClearCanvas}>Clear Canvas</button>
          </div>
       </div>
          )
         }
        

          <div className="canvas-box">

            <WhiteBoard canvasRef={canvasRef} ctxRef={ctxRef}
            elements={elements}
            setElements={setElements}
            color={color}
          tool={tool}
          user={user}
          socket={socket}
            />
          </div>

          <div className="dnld-btn">
            <button onClick={handleDownload}>Download</button>
          </div>

    </div>
  )
}

export default Room