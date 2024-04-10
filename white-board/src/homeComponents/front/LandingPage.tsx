import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/auth/useAuth';
import styles from './landingpage.module.css';

const LandingPage = () => {

  const isLoggedIn = useAuth(); // Check if user is logged in
  const navigate = useNavigate();

  const handleCollaborateClick = () => {
    if (isLoggedIn) {
      navigate('/rooms-join'); // Navigate to rooms-join if user is logged in
    } else {
      navigate('/login'); // Navigate to login if user is not logged in
    }
  };


  return (
    <div className={styles.mainlanding}>
      <div className={styles.imageContainer1}>
        <img
          src="https://png.pngtree.com/png-vector/20220310/ourmid/pngtree-blank-sketchbook-vector-illustration-note-blank-vector-png-image_12564170.jpg"
          alt="Diagram Maker"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Diagram Maker</h1>
        <p className={styles.description}>
          Make a polished, professional diagram for free with SketchFlow. No matter what you have in mind, we have the tools you need to build it. Make an account and start diagramming today.
        </p>
        <div className={styles.buttons}>
          <button className={styles.createButton}>Create a Diagram</button>
          <p className={styles.orText}></p>
          <button className={styles.collaborateButton} onClick={handleCollaborateClick}>Collaborate with team</button>
        </div>
      </div>
      <div className={styles.imageContainer2}>
        <img
          src="https://s3-alpha.figma.com/hub/file/3464423282/76862c05-a20a-49d9-85a4-97275ad81d19-cover.png"
          alt="Collaborate"
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default LandingPage;

