import { useState, useEffect } from 'react';

interface UserData {
  name: string;
  email: string;
  password: string;
}

const useSingleUserData = (): UserData | null => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
     
        const email = localStorage.getItem('email');

        if (email) {
     
          const response = await fetch(`http://localhost:8000/users/userdata/${email}`);
          if (response.ok) {
            const userData = await response.json();
            setUserData(userData);
            console.log(userData);
          } else {
            console.error('Failed to fetch user data:', response.statusText); 
          }
        } else {
          console.error('Email not found in local storage'); 
        }
      } catch (error) {
        console.error('Error fetching user data:', error); 
      }
    };

    fetchUserData();

  }, []);

  return userData;
};


export default useSingleUserData;


