import React from "react";

import "./ProfileCard.css";

const ProfileCard = ({
  firstName,
  lastName,
  email,
  avatar,
  onProfileCardClose
}) => {
  return (
    <div className="profile-card-wrapper">
      <div className="profile-card-content">
        <div className="profile-card-left-section">
          <div className="profile-card-name">
            {firstName} {lastName}
          </div>
          <div className="profile-card-email">{email}</div>
        </div>
        <div className="profile-card-right-section">
          <img src={avatar} />
        </div>
      </div>
      <div className="profile-card-controls">
        <button
          className="profile-card-close-button"
          onClick={onProfileCardClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
