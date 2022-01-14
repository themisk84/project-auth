import React, { useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import { API_URL } from "utils/urls";
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
const ErrorMessage = styled.p`
  color: rgba(255, 61, 96, 1);
  font-size: 15px;
  margin: 0;
`;

const Button = styled.button`
  background-color: #1877f2;
  border: none;
  margin-top: 20px;
  height: 30px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  &:hover {
    background-color: green;
  }
`;

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);
  const error = useSelector((store) => store.user.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/user");
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

    fetch(API_URL("signin"), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  // const handleSecretContentChange = (event) =>
  // setSecretContent(event.target.value);

  return (
    <Bg>
      <FormWrapper>
        <Link to="/user"></Link>
        <Form onSubmit={onHandleSignIn}>
          <Fieldset>
            <Legend>Sign in:</Legend>
            <label htmlFor="username" />
            Username:
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <input
              placeholder="username"
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
            <label htmlFor="password" />
            Password:
            <input
              placeholder="password"
              id="password"
              type="text"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button primary type="submit">
              Sign in!
            </Button>
          </Fieldset>
        </Form>
      </FormWrapper>
    </Bg>
  );
};

export default SignIn;
