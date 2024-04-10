
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import './navbar.css'
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import useAuth from '../../hooks/auth/useAuth';
import useSingleUserData from '../../hooks/data/useSingleUserData';


const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuth(); 
  const userData = useSingleUserData();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };




  return(
        <>
        <header>
            <div className="container">
                <input type="checkbox" name="check" id="check" />
                <div className="logo-container">
                   
                   <img src="images/newlogo.png"/>
                </div>

                <div className="nav-btn">
                    <div className="nav-links">
                        <ul>
                            <li className="nav-link" style={{'--i': '.6s'}as any}>
                                <a ><Link className="hm-link" to="/">Home</Link></a>
                            </li>
                            <li className="nav-link" style={{'--i': '.85s'}as any}>
                                <a href="#">Menu<FontAwesomeIcon icon={faCaretDown} /></a>
                                <div className="dropdown">
                                    <ul>
                                        <li className="dropdown-link">
                                            <a href="#">Link 1</a>
                                        </li>
                                        <li className="dropdown-link">
                                            <a href="#">Link 2</a>
                                        </li>
                                        <li className="dropdown-link">
                                            <a href="#">Link 3<FontAwesomeIcon icon={faCaretDown} /></a>
                                            <div className="dropdown second">
                                                <ul>
                                                    <li className="dropdown-link">
                                                        <a href="#">Link 1</a>
                                                    </li>
                                                    <li className="dropdown-link">
                                                        <a href="#">Link 2</a>
                                                    </li>
                                                    <li className="dropdown-link">
                                                        <a href="#">Link 3</a>
                                                    </li>
                                                    <li className="dropdown-link">
                                                        <a href="#">More<FontAwesomeIcon icon={faCaretDown} /></a>
                                                        <div className="dropdown second">
                                                            <ul>
                                                                <li className="dropdown-link">
                                                                    <a href="#">Link 1</a>
                                                                </li>
                                                                <li className="dropdown-link">
                                                                    <a href="#">Link 2</a>
                                                                </li>
                                                                <li className="dropdown-link">
                                                                    <a href="#">Link 3</a>
                                                                </li>
                                                                <div className="arrow"></div>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                    <div className="arrow"></div>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="dropdown-link">
                                            <a href="#">Link 4</a>
                                        </li>
                                        <div className="arrow"></div>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-link" style={{'--i': '1.1s'}as any}>
                                <a href="#">Services<FontAwesomeIcon icon={faCaretDown} /></a>
                                <div className="dropdown">
                                    <ul>
                                        <li className="dropdown-link">
                                            <a href="#">Link 1</a>
                                        </li>
                                        <li className="dropdown-link">
                                            <a href="#">Link 2</a>
                                        </li>
                                        <li className="dropdown-link">
                                            <a href="#">Link 3<FontAwesomeIcon icon={faCaretDown} /></a>
                                            <div className="dropdown second">
                                                <ul>
                                                    <li className="dropdown-link">
                                                        <a href="#">Link 1</a>
                                                    </li>
                                                    <li className="dropdown-link">
                                                        <a href="#">Link 2</a>
                                                    </li>
                                                    <li className="dropdown-link">
                                                        <a href="#">Link 3</a>
                                                    </li>
                                                    <li className="dropdown-link">
                                                        <a href="#">More<FontAwesomeIcon icon={faCaretDown} /></a>
                                                        <div className="dropdown second">
                                                            <ul>
                                                                <li className="dropdown-link">
                                                                    <a href="#">Link 1</a>
                                                                </li>
                                                                <li className="dropdown-link">
                                                                    <a href="#">Link 2</a>
                                                                </li>
                                                                <li className="dropdown-link">
                                                                    <a href="#">Link 3</a>
                                                                </li>
                                                                <div className="arrow"></div>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                    <div className="arrow"></div>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="dropdown-link">
                                            <a href="#">Link 4</a>
                                        </li>
                                        <div className="arrow"></div>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-link" style={{'--i': '1.35s'}as any}>
                                <a href="#">About</a>
                            </li>
                        </ul>
                    </div>
                    <div className="log-sign" style={{'--i': '1.8s'}as any}>
                    {isLoggedIn ? (
                                <>
                            
                            <span className="usr-nm">{userData?.name}</span>

                                    <button onClick={handleLogout} className="btn transparent">Log out</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="btn transparent">Log in</Link>
                                    <Link to="/signup" className="btn solid">Sign Up</Link>
                                </>
                            )}
               
                    </div>
                </div>

                <div className="hamburger-menu-container">
                    <div className="hamburger-menu">
                        <div></div>
                    </div>
                </div>
            </div>
        </header>
  
        </>
    );
}

export default Navbar;
