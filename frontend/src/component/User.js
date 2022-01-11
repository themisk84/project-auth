import React from "react";
import styled from "styled-components";

import Message from "./Message";

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
`;

const User = ({
  username,
  userId,
  onChangeMessage,
  message,
  secretContent,
}) => {
  return (
    <div>
      Welcome {username} your user id is {userId}
      <button onClick={onChangeMessage}>
        Click here to se your secret message!
      </button>
      {message && <Message username={username} secretContent={secretContent} />}
    </div>
  );
};

export default User;
