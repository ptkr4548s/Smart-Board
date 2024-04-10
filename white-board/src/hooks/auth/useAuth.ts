// useAuth.ts
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:8000/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in the Authorization header
        },
      })
        .then((response) => {
          if (response.ok) {
            setIsLoggedIn(true); // Token is valid
          } else {
            setIsLoggedIn(false); // Token is invalid
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setIsLoggedIn(false); // Error occurred, assume user is not logged in
        });
    } else {
      setIsLoggedIn(false); // No token found
    }
  }, []);

  return isLoggedIn;
};

export default useAuth;

