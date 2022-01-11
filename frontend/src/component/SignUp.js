import React from "react";
import styled from "styled-components";

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
const SignUp = ({
  username,
  onChangeUsername,
  password,
  onChangePassword,
  secretContent,
  onChangeSecretContent,
  onSignUp,
}) => {
  return (
    <FormWrapper>
      <Form onSubmit={onSignUp}>
        <h1>Sign up</h1>
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
        <label htmlFor="secretContent"> secretContent </label>
        <input
          type="text"
          id="secretContent"
          value={secretContent}
          onChange={onChangeSecretContent}
        />
        <button type="submit">Sign Up </button>
      </Form>
    </FormWrapper>
  );
};

export default SignUp;
