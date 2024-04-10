
import { useEffect, useLayoutEffect, useState } from 'react';
import './whiteboard.css'
import rough from 'roughjs'
import { Socket } from 'socket.io-client';


const roughGenerator=rough.generator();


interface Element {
  type: string;
  offsetX: number;
  offsetY: number;
  height?: number;
  width?: number;
  path?: Point[]; // Making path optional
  stroke: string;
}

type Point = [number, number];



interface WhiteBoardProps {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  elements: Element[];
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
  tool:string;
  color:string;
  user:  { name: string; userId: string;roomId: string;  host: boolean; presenter: boolean }
  socket:Socket
}

const WhiteBoard: React.FC<WhiteBoardProps> = ({ canvasRef, ctxRef, elements, setElements,tool, color, user,socket }) => {

  const [isDrawing, setIsDrawing]=useState(false);
  const [img, setImg]=useState('');

  useEffect(()=>{
    socket.on("whiteBoardDataResponse", (data)=>{
         setImg(data.imgURL);
    })
  },[])

useEffect(()=>{
        
  const canvas=canvasRef.current;
  

  if(canvas){
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
  const ctx=canvas.getContext("2d")
if(ctx){
  ctx.strokeStyle=color;
  ctx.lineWidth=2;
  ctx.lineCap="round"
}


  ctxRef.current=ctx
  }

},[])



useEffect(()=>{
  if(ctxRef.current)
    ctxRef.current.strokeStyle=color;
},[color])

useLayoutEffect(() => {
  const canvas = canvasRef.current;
  if (canvasRef.current && ctxRef.current) {
    if (elements.length > 0) {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    if (canvas) {
      const roughCanvas = rough.canvas(canvas);
      elements.forEach((element) => {
        if (element.type === 'pencil') {
          const pathPoints: Point[] = element.path || []; // Provide a default value for path
          roughCanvas.linearPath(pathPoints, {
            stroke: element.stroke,
            strokeWidth: 5,
            roughness: 0,
          });
        } else if (element.type === 'rect') {
          roughCanvas.draw(
            roughGenerator.rectangle(
              element.offsetX,
              element.offsetY,
              element.width || 0, // Provide a default value for width
              element.height || 0, // Provide a default value for height
              {
                stroke: element.stroke,
                strokeWidth: 5,
                roughness: 0,
              }
            )
          );
        } else if (element.type === 'line') {
          roughCanvas.draw(
            roughGenerator.line(
              element.offsetX,
              element.offsetY,
              element.width || 0, // Provide a default value for width
              element.height || 0, // Provide a default value for height
              {
                stroke: element.stroke,
                strokeWidth: 5,
                roughness: 0,
              }
            )
          );
        } else if (element.type === 'ellipse') {
          roughCanvas.draw(
            roughGenerator.ellipse(
              element.offsetX + (element.width || 0) / 2, // Provide a default value for width
              element.offsetY + (element.height || 0) / 2, // Provide a default value for height
              element.width || 0, // Provide a default value for width
              element.height || 0, // Provide a default value for height
              {
                stroke: element.stroke,
                strokeWidth: 5,
                roughness: 0,
              }
            )
          );
        }
      });

      if (canvasRef.current) {
        const canvasImage = canvasRef.current.toDataURL();
        socket.emit('whiteboardData', canvasImage);
      }
    }
  }
}, [elements, canvasRef]);

const handleMouseDown=(e:React.MouseEvent)=>{
    const {offsetX, offsetY}=e.nativeEvent
    

     if(tool==="pencil"){
      setElements((prevElements)=>[
        ...prevElements,
        {
          type:"pencil",  
          offsetX,
          offsetY,
          path:[[offsetX,offsetY]],
          stroke:color,
  
        },
       ]
  
       )
     }
  else if(tool==="line"){
    setElements((prevElements)=>[
      ...prevElements,
      {
        type:"line",
        offsetX,
        offsetY,
        width:offsetX,
        height:offsetY,
        stroke:color,

      },
     ])
  }
  else if(tool==="rect"){
    setElements((prevElements)=>[
      ...prevElements,
      {
        type:"rect",
        offsetX,
        offsetY,
        width:0,
        height:0,
        stroke:color,

      },
     ])
  }
  else if (tool === "ellipse") {
    setElements((prevElements) => [
      ...prevElements,
      {
        type: "ellipse",
        offsetX,
        offsetY,
        width: 0,
        height: 0,
        stroke: color,
      },
    ]);
  }
    setIsDrawing(true);
}

const handleMouseMove = (e: React.MouseEvent) => {
  const { offsetX, offsetY } = e.nativeEvent;

  if (isDrawing) {
    if (tool === "pencil") {
      const currentElement = elements[elements.length - 1];
      if (currentElement.type === "pencil" && currentElement.path !== undefined) {
        const newPath = [...currentElement.path, [offsetX, offsetY]];

        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                path: newPath,
              };
            } else {
              return ele;
            }
          })as Element[] 
        );
      }
    } else if (tool === "line") {
      setElements((prevElements) =>
        prevElements.map((ele, index) => {
          if (index === elements.length - 1) {
            return {
              ...ele,
              width: offsetX,
              height: offsetY,
            };
          } else {
            return ele;
          }
        })
      );
    } else if (tool === "rect") {
      setElements((prevElements) =>
        prevElements.map((ele, index) => {
          if (index === elements.length - 1) {
            return {
              ...ele,
              width: offsetX - ele.offsetX,
              height: offsetY - ele.offsetY,
            };
          } else {
            return ele;
          }
        })
      );
    } else if (tool === "ellipse") {
      setElements((prevElements) =>
        prevElements.map((ele, index) => {
          if (index === elements.length - 1) {
            return {
              ...ele,
              width: offsetX - ele.offsetX,
              height: offsetY - ele.offsetY,
            };
          } else {
            return ele;
          }
        })
      );
    }
  }
};


 const handleMouseUp=()=>{
    setIsDrawing(false);
 }

 if(!user?.presenter){
   return(
    <div className="main-can1"
>
<img src={img} alt="Real time whiteboard image shared by presenter" />
    </div>
   )
 }

  return(
  
  <div className="main-can1"
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}>
  <canvas 
   ref={canvasRef}

   >

  </canvas> 
  </div>
  
  )

};

export default WhiteBoard;
