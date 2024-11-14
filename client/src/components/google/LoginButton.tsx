import React, { useEffect, useState } from "react";
import { GoogleCredentialResponse } from "../../types/types";
import "./LoginButton.css"

const LoginButton = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById('googleButton'),
      { theme: 'filled_blue', size: 'large' } // Customize button options as needed
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
      console.log('JWT from server:', data);
      localStorage.setItem('token', data.sessionToken);
    } catch (error) {
      console.error('Failed to authenticate:', error);
    }
  };
  return (
    <div id="googleButton" data-testid="googleButton"></div>
  );
};

export default LoginButton;