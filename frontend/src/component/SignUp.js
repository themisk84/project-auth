import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SIGNUP_URL } from "../utils/urls";
import user from "reducers/user";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #1d1d1d;
  margin: 30px;
  padding: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: #1877f2;
  border: none;
  margin-top: 20px;
  height: 30px;
  color: white;
`;

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secretContent, setSecretContent] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const onHandleSignUp = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        secretContent,
      }),
    };

    fetch(SIGNUP_URL, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
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

  const onHandleUsernameChange = (event) => setUsername(event.target.value);
  const onHandlePasswordChange = (event) => setPassword(event.target.value);
  const onHandleSecretContentChange = (event) =>
    setSecretContent(event.target.value);

  return (
    <FormWrapper>
      <Form onSubmit={onHandleSignUp}>
        <h1>Sign up</h1>
        <label htmlFor="username" />
        <input
          id="username"
          type="text"
          value={username}
          onChange={onHandleUsernameChange}
        />
        <label htmlFor="password" />
        <input
          id="password"
          type="text"
          value={password}
          onChange={onHandlePasswordChange}
        />
        <label htmlFor="secretContent"> secretContent </label>
        <input
          type="text"
          id="secretContent"
          value={secretContent}
          onChange={onHandleSecretContentChange}
        />
        <Button type="submit">Sign Up </Button>
      </Form>
    </FormWrapper>
  );
};

export default SignUp;
