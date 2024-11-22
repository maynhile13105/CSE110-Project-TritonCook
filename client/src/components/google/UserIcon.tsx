import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

function UserIcon() {
  const {userProfile, setUserProfile} = useContext(AppContext);
  const {token} = useContext(AppContext);

  useEffect(() => {
    // Check if user is already logged in by checking for a token
    if (token) {
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    //const token = localStorage.getItem('token');
    try {
      console.log("token: ", token);
      const res = await fetch('http://localhost:8080/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const profileData = await res.json();
      console.log("profileData: ", profileData.user);
      setUserProfile(profileData.user);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };
  
  return (
    <div>
      {!userProfile.id && userProfile.picture? (
          <img src={userProfile.picture} alt="profile" />
      ) : (
        <img src='images/profile.svg' alt='profile' />
      )}
    </div>
  );
}

export default UserIcon;
