
import './footer.css'
const Footer = () => {
  return (
<footer className="footer">
  <div className="footer__addr">
            <img src="images/newlogo.png"/>
              

    
    <form className="subscribe-form">
        <h2>Subscribe out newsletter</h2>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
      </form>
  </div>
  
  <ul className="footer__nav">
    <li className="nav__item">
      <h2 className="nav__title">Media</h2>

      <ul className="nav__ul">
        <li>
          <a href="#">Online</a>
        </li>

        <li>
          <a href="#">Print</a>
        </li>
            
        <li>
          <a href="#">Alternative Ads</a>
        </li>
      </ul>
    </li>
    
    <li className="nav__item">
      <h2 className="nav__title">Technology</h2>
      
      <ul className="nav__ul">
        <li>
          <a href="#">Hardware Design</a>
        </li>
        
        <li>
          <a href="#">Software Design</a>
        </li>
        
        <li>
          <a href="#">Digital Signage</a>
        </li>
        

      </ul>
    </li>
    
    <li className="nav__item">
      <h2 className="nav__title">Legal</h2>
      
      <ul className="nav__ul">
        <li>
          <a href="#">Privacy Policy</a>
        </li>
        
        <li>
          <a href="#">Terms of Use</a>
        </li>
        
        <li>
          <a href="#">Sitemap</a>
        </li>
      </ul>
    </li>
  </ul>
  
  <div className="legal">
    <p>&copy; 2024 Something. All rights reserved.</p>
    
    <div className="legal__links">
      <span>Made with <span className="heart">♥</span> by Prashant</span>
    </div>
  </div>
</footer>
  )
}

export default Footer
