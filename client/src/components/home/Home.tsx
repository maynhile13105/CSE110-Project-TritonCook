import React, { useEffect } from 'react';
import { GoogleCredentialResponse } from '../../types/types';

const Home = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large' } // Customize button options as needed
    );

    google.accounts.id.prompt();
  }, []);

  const handleCredentialResponse = async (response: GoogleCredentialResponse) => {
    const token = response.credential;
    console.log('Encoded JWT ID token:', token);

    try {
      const res = await fetch('http://localhost:8080/api/google-signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      console.log('JWT from server:', data)
    } catch (error) {
      console.error('Failed to authenticate:', error);
    }
  };

  return (
    <div>
      <h2>Google Sign-In</h2>
      <div id="buttonDiv"></div>
      <h1>TritonCook</h1>
      <p>Et ullamco consectetur magna ex enim consequat irure deserunt culpa aliqua pariatur amet duis eu. Dolore labore ex exercitation proident aute cillum laborum anim exercitation nisi Lorem magna. Esse Lorem magna cupidatat anim anim nostrud occaecat ad pariatur nostrud occaecat in exercitation. Veniam eiusmod occaecat occaecat qui occaecat mollit. In esse reprehenderit quis officia in. Culpa elit sunt elit ipsum esse irure sunt.</p>
    </div>
  );
};

export default Home;
