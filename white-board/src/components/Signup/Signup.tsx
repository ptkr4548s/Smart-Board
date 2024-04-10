import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleSignup } from '../../services/authService';
import './signup.css'; // Import CSS file for styling


const Signup = () => {
  const navigate=useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignup(name, email, password,navigate);
  };


  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      <p className="login_user">Already have an account?<Link className="navigate_login" to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;

