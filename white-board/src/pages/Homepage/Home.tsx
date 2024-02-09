import './home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div>Welcome to the whiteboard.</div>
      <div>Feel free to pen your imagination</div>
      <Link to="login"><button>Login</button></Link>
      <Link to="signup"><button>Signup</button></Link>
    </div>
  )
}

export default Home