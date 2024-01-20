import { useRef, useState } from "react"
import WhiteBoard from "../../components/Whiteboard/WhiteBoard";
import './room.css'
import { Socket } from 'socket.io-client';

interface Props{
  user:  { name: string; roomId: string; userid: string; host: boolean; presenter: boolean }
  socket:Socket
  
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

const Room = ({user,socket}:Props) => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

const [tool,setTool]=useState("pencil");
const [color,setColor]=useState("black");
const [elements, setElements] = useState<Element[]>([]);
const [history, setHistory] = useState<Element[][]>([]);

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

  return (
    <div>
         <h1>Whiteboard sharing app
          <span>[User online : 0]</span>
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

    </div>
  )
}

export default Room