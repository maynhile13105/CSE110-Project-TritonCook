import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./FriendsPage.css";
import { Profile } from "../../types/types";

const FriendsPage = () => {
  const [friends, setFriends] = useState<Profile[]>([]);
  const [followers, setFollowers] = useState<Profile[]>([]);
  const [followings, setFollowings] = useState<Profile[]>([]);

  
    return (
      <div className="user-list-container">
        <div id="section">
          <div className="section-title">Friends</div>
          {friends.length > 0 ?
            (<div className="list">
              ({friends.map((friend) => (
                <li key={friend.id} className="list-item">
                  <img src="/images/profile.svg"/>
                  <span className="username">{friend.name}</span>
                </li>
              ))})
              <p className="see-more">... See more</p>
            </div>
            ):(
              <div style={{fontSize:"30px"}}>
                No friends list to display
              </div>
              )
            }
        </div>
  
        <div id="section">
          <div className="section-title">Followers</div>
          {followers.length > 0 ?
            (<div className="list">
              ({followers.map((follower) => (
                <li key={follower.id} className="list-item">
                  <img src="/images/profile.svg"/>
                  <span className="username">{follower.name}</span>
                </li>
              ))})
              <p className="see-more">... See more</p>
            </div>
            ):(
              <div style={{fontSize:"30px"}}>
                No followers list to display
              </div>
              )
            }
        </div>
  
        <div id="section">
          <div className="section-title">Followings</div>
          {followings.length > 0 ?
            (<div className="list">
              ({followings.map((following) => (
                <li key={following.id} className="list-item">
                  <img src="/images/profile.svg"/>
                  <span className="username">{following.name}</span>
                </li>
              ))})
              <p className="see-more">... See more</p>
            </div>
            ):(
              <div style={{fontSize:"30px"}}>
                No followings list to display
              </div>
              )
            }
        </div>
      </div>
    );
  };

export default FriendsPage;