import React, { useState, useEffect, useContext } from 'react';
import { Profile } from '../../types/types';
import { error } from 'console';
import { AppContext } from '../../context/AppContext';

function UserIcon() {
  const {userProfile, setUserProfile} = useContext(AppContext);

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("images/profile.svg");

  useEffect(() => {
    // Check if user is already logged in by checking for a token
    const token = localStorage.getItem('token');
    if (token != "") {
      console.log("fetching pf")
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async (): Promise<void> => {
    const token = localStorage.getItem('token');
    try {
      console.log("token: ", token);
      const res = await fetch('http://localhost:8080/userInfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const profileData = await res.json();
      console.log("profileData: ", profileData.user);
      setUserProfile(profileData.user);

      // Load the image asynchronously
      await loadImage(profileData.user.picture);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const loadImage = async (url: string): Promise<void> => {
    if (!url) return;

    try {
      const img = new Image();
      img.src = url;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          setImageSrc(url);
          setIsImageLoaded(true);
          resolve();
        };
        img.onerror = (err) => {
          console.error('Failed to load profile:', err);
          reject(err);
        };
      });
    } catch (error) {
      console.error('Failed to fetch profile', error);
    }
  };
  
  return (
    <div>
      {isImageLoaded ? (
        <img src={imageSrc} alt="userprofile" className="userprofile"/>
      ) : (
        <img src="images/profile.svg" alt="defaultprofile" className="defaultprofile" />
      )}
    </div>
  );
}

export default UserIcon;
