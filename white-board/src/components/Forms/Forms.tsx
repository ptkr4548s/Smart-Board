
// import {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import CreateRoomForm from './CreateRoomForm/Createroom';
import JoinRoomForm from './JoinRoomForm/Joinroom';
import useAuth from '../../hooks/auth/useAuth';
import Navbar from '../Navbar/Navbar';
import './forms.css';
import Footer from '../footer/Footer';

interface Props {
  
  socket: Socket;
  setUser: (user: { name: string; userId: string; roomId: string; host: boolean; presenter: boolean }) => void;
}

const Forms: React.FC<Props> = ({  socket, setUser }) => {
  
  const isLoggedIn = useAuth();
  const navigate = useNavigate();
  if (!isLoggedIn) {
    navigate('/login');
   
  }
  // const [pdfData, setPdfData] = useState([]);

  // Function to fetch saved works from the server
  // const fetchSavedWorks = async () => {
  //   try {
  //     const response = await fetch('https://drawingboard.onrender.com/api/files');
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Fetched data",data);
  //       // setPdfData(data); 
  //     } else {
  //       console.error('Failed to fetch saved works:', await response.text());
  //     }
  //   } catch (error) {
  //     console.error('Error fetching saved works:', error);
  //   }
  // };

  // Fetch saved works when component mounts
  // useEffect(() => {
  //   fetchSavedWorks();
  // }, []);



  return (
    <>
      <Navbar />
      <div className="forms-container">
      
        <div className="form-section">
          <h1>Create Room</h1>
          <CreateRoomForm socket={socket} setUser={setUser} />
        </div>
        <div className="form-section">
          <h1>Join Room</h1>
          <JoinRoomForm socket={socket} setUser={setUser} />
        </div>
      </div>
      {/* <div className="savedWorks">
        {pdfData.map((pdf: any) => (
          <embed key={pdf._id} src={pdf.imageData}  width="100%" height="500px" />
        ))}
      </div> */}
      <Footer/>
    </>
  );
};

export default Forms;
