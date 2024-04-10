

export const handleLogin = (email: string, password: string): Promise<{ token: string }> => {

    


    return new Promise<{ token: string }>((resolve, reject) => {
      // Send login request to backend
      fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Pass email and password
      })
        .then((response) => {
          if (!response.ok) {
            // Handle different error scenarios based on response status
            if (response.status === 404) {
              throw new Error('User not found');
            } else if (response.status === 401) {
              throw new Error('Password incorrect');
            } else {
              throw new Error('Login failed');
            }
          }
          return response.json();
        })
        .then((data) => {
          // Resolve with the token received from the server
          resolve({ token: data.token });
        })
        .catch((error) => {
          console.error('Error:', error);
          // Reject the promise with the error
          reject(error);
        });
    });
  };
  
  
  

  export const handleSignup = (name: string, email: string, password: string, navigate: Function) => {
    // Send signup request to backend
    fetch('http://localhost:8000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }), // Pass username, email, and password
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Signup failed'); // Handle non-successful response
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); 
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
