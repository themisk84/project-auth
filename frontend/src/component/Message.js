import React from "react";
import User from "./User";

const Message = ({ username, secretContent }) => {
  return (
    <div>
      <h1>
        {username}This is your secret message: {secretContent}
      </h1>
    </div>
  );
};

export default Message;
