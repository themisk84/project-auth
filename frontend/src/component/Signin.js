import React, { useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { SIGNIN_URL } from "utils/urls";
import user from "reducers/user";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin: 30px;
  padding: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const SignInHeader = styled.h1`
  text-align: center;
`;

// const InputContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 10px;
//   width: 50%;
// `;

const Button = styled.button`
  background-color: #1877f2;
  border: none;
  margin-top: 20px;
  height: 30px;
  color: white;
`;

const AccountButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  background-color: #42b72a;
  width: 50%;
  color: white;
  margin-top: 20px;
  height: 30px;
`;

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const onHandleSignIn = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };

    fetch(SIGNIN_URL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.responseusername));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
        }
      });
  };

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  // const handleSecretContentChange = (event) =>
  // setSecretContent(event.target.value);

  return (
    <FormWrapper>
      <Form onSubmit={onHandleSignIn}>
        <SignInHeader>Sign in</SignInHeader>

        <label htmlFor="username" />
        <input
          placeholder="username"
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />

        <label htmlFor="password" />
        <input
          placeholder="password"
          id="password"
          type="text"
          value={password}
          onChange={handlePasswordChange}
        />

        <Button type="submit">Log in!</Button>
        {/* <AccountButton onClick={onChangeSignUp}>
          Create an account
        </AccountButton> */}
      </Form>
    </FormWrapper>
  );
};

export default Signin;
