

import Navbar from '../../components/Navbar/Navbar';
import LandingPage from '../../homeComponents/front/LandingPage';
import DeliverySection from '../../homeComponents/deliverySection/DeliverySection';
import styles from './home.module.css'; // Import the CSS module
import About from '../../homeComponents/about/About';
import Contact from '../../homeComponents/connect/Contact';
import Footer from '../../components/footer/Footer';

const Home = () => {
  return (
    <div className={styles['home-container']}> {/* Use local class names */}
      <Navbar />
      <LandingPage/>
      <DeliverySection/>
      <About/>
      <Contact/>
     <Footer/>
    </div>
  );
};

export default Home;

