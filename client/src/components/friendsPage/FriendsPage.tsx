import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./FriendsPage.css";

const FriendsPage = () => {
    const friends = [
      { id: 1, username: "UserName1" },
      { id: 2, username: "UserName2" },
      { id: 3, username: "UserName3" },
    ];
  
    const followers = [
      { id: 4, username: "UserName5" },
      { id: 5, username: "UserName6" },
      { id: 6, username: "UserName7" },
    ];
  
    const following = [
      { id: 7, username: "UserName5" },
      { id: 8, username: "UserName6" },
      { id: 9, username: "UserName7" },
    ];
  
    return (
      <div className="user-list-container">
        <div className="section">
          <div className="section-title">Friends</div>
          <div className="list">
            {friends.map((friend) => (
              <li key={friend.id} className="list-item">
                <img src="/images/profile.svg"/>
                <span className="username">{friend.username}</span>
              </li>
            ))}
          </div>
          <p className="see-more">... See more</p>
        </div>
  
        <div className="section">
          <div className="section-title">Followers</div>
          <div className="list">
            {followers.map((follower) => (
              <li key={follower.id} className="list-item">
                <img src="/images/profile.svg"/>
                <span className="username">{follower.username}</span>
              </li>
            ))}
          </div>
          <p className="see-more">... See more</p>
        </div>
  
        <div className="section">
          <div className="section-title">Following</div>
          <div className="list">
            {following.map((following) => (
              <li key={following.id} className="list-item">
                <img src="/images/profile.svg"/>
                <span className="username">{following.username}</span>
              </li>
            ))}
          </div>
          <p className="see-more">... See more</p>
        </div>
      </div>
    );
  };

export default FriendsPage;