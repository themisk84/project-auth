import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/urls";
import user from "reducers/user";

const Bg = styled.main`
  margin-top: 0;
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: rgba(66, 177, 162, 1);
  /* background-image: url("assets/bg-img.jpg"); */
  color: black;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 400px;
  margin: auto;
  border-radius: 10px;
  padding: 20px;
  background-color: rgba(202, 199, 199, 0.7);
`;
const Legend = styled.legend`
  font-size: 30px;
  font-family: "Italiana", serif;
  color: black;
`;
const Fieldset = styled.fieldset`
  border: 2px solid;
  display: flex;
  flex-direction: column;
  height: 370px;
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Button = styled.button`
  background-color: #1877f2;
  border: none;
  margin-top: 20px;
  height: 30px;
  color: white;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background-color: green;
  }
`;

const ErrorMessage = styled.p`
  color: rgba(255, 61, 96, 1);
  font-size: 15px;
  margin: 0;
`;

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secretContent, setSecretContent] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);
  const error = useSelector((store) => store.user.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/user");
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

    fetch(API_URL("signup"), options)
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
          console.log(data);
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response.name));
          });
        }
      });
  };
  console.log(error);
  const onHandleUsernameChange = (event) => setUsername(event.target.value);
  const onHandlePasswordChange = (event) => setPassword(event.target.value);
  const onHandleSecretContentChange = (event) =>
    setSecretContent(event.target.value);

  return (
    <Bg>
      <FormWrapper>
        <Form onSubmit={onHandleSignUp}>
          <Fieldset>
            <Legend>Sign up:</Legend>
            <label htmlFor="username" />
            username:
            {error === "MongoError" && (
              <ErrorMessage>That user already exist!</ErrorMessage>
            )}
            <input
              id="username"
              type="text"
              value={username}
              onChange={onHandleUsernameChange}
            />
            <label htmlFor="password" />
            password:
            <input
              id="password"
              type="text"
              value={password}
              onChange={onHandlePasswordChange}
            />
            <label htmlFor="secretContent"> secret message: </label>
            {error === "ValidationError" && (
              <ErrorMessage>Your need more than 10 characters</ErrorMessage>
            )}
            <input
              type="text"
              id="secretContent"
              value={secretContent}
              onChange={onHandleSecretContentChange}
            />
            <Button type="submit">Sign Up!</Button>
          </Fieldset>
        </Form>
      </FormWrapper>
    </Bg>
  );
};

export default SignUp;
