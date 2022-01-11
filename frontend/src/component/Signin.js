import React from "react";
import styled from "styled-components";

import User from "./User";

const FormWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Signin = ({
  username,
  onChangeUsername,
  password,
  onChangePassword,
  onSignIn,
  signedIn,
  secretContent,
  message,
  userId,
  onChangeMessage,
}) => {
  return (
    <FormWrapper>
      {signedIn ? (
        <User
          userId={userId}
          secretContent={secretContent}
          username={username}
          message={message}
          onChange={onChangeMessage}
        />
      ) : (
        <Form onSubmit={onSignIn}>
          <h1>Sign in</h1>
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={onChangeUsername}
          />
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="text"
            value={password}
            onChange={onChangePassword}
          />
          <button type="submit">Log in!</button>
        </Form>
      )}
    </FormWrapper>
  );
};

export default Signin;
