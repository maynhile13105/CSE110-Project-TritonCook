import React, { useState, useEffect } from 'react';
import { Profile } from '../../types/types';

function UserIcon() {
  const [userProfile, setUserProfile] = useState<Profile>({
    id: "",
    name: "",
    email: "",
    picture: ""
  });

  useEffect(() => {
    // Check if user is already logged in by checking for a token
    const token = localStorage.getItem('google-token');
    if (token) {
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('google-token');
    try {
      console.log(token)
      const res = await fetch('http://localhost:8080/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const profileData = await res.json();
      console.log(profileData.user)
      setUserProfile(profileData.user);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  return (
    <div>
      {userProfile.id !== "" ? (
          <img src={userProfile.picture} alt="profile" />
      ) : (
        <img src='images/profile.svg' alt='profile' />
      )}
    </div>
  );
}

export default UserIcon;
