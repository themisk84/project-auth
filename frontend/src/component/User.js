import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import Message from "./Message";
import { API_URL } from "utils/urls";
import user from "../reducers/user";

const Bg = styled.main`
  margin-top: 0;
  height: 120vh;
  width: 100vw;
  background-color: rgba(66, 177, 162, 1);
`;
const Logout = styled.button`
  background-color: rgba(0, 0, 0, 0.68);
  color: white;
  font-family: "Italiana", serif;
  font-size: 20px;
  padding: 5px;
  margin: 30px;
  font-weight: 900;
  &:hover {
    background-color: transparent;
    color: black;
  }
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  margin: auto;
  text-align: center;
`;

const Button = styled.button`
  margin: auto;
  color: black;
  background-color: rgba(230, 27, 98, 1);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  font-family: "Italiana", serif;
  font-size: 30px;
  font-weight: 900;
  font-size: 30px;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: rgba(230, 27, 98, 1);
  }
`;

const Heading = styled.h1`
  font-family: "Italiana", serif;
  font-size: 30px;
`;

const User = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const message = useSelector((store) => store.user.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const logout = () => {
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setMessage(null));
  };

  const handleMessage = (event) => {
    event.preventDefault();
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(API_URL("secretContent"), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.response);
        if (accessToken) {
          dispatch(user.actions.setMessage(data.response));
        } else {
          dispatch(user.actions.setError(data.response));
        }
      });
  };
  return (
    <Bg>
      <Link to="/">
        <Logout onClick={logout}>Log out</Logout>
      </Link>
      <UserContainer>
        <Heading>Welcome {username}!</Heading>
        <p>Click the button to see your secret message...</p>
        <Button onClick={handleMessage}>Top secret</Button>
      </UserContainer>
      {message && <Message />}
    </Bg>
  );
};
export default User;
