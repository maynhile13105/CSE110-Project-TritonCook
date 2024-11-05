import React, { useEffect } from 'react';
import { GoogleCredentialResponse } from '../../types';

const Home = () => {
  const clientId = 'process.env.REACT_APP_GOOGLE_CLIENT_ID'; // Replace with your Google Client ID

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

  const handleCredentialResponse = (response: GoogleCredentialResponse) => {
    console.log('Encoded JWT ID token:', response.credential);
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
