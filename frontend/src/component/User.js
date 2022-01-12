import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import Message from "./Message";
import { SECRET_URL } from "utils/urls";
import user from "../reducers/user";

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 300px;
  margin: 20px auto;
`;

const Button = styled.button`
  width: 200px;
  margin-top: 10px;
`;

const User = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signup");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(SECRET_URL, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.setItems(data.response));
          dispatch(user.actions.setError(null));
        } else {
          dispatch(user.actions.setItems([]));
          dispatch(user.actions.setError(data.response));
        }
      });
  }, [accessToken]);

  // const handleMessage = (event) => {
  //   event.preventDefault();
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       headers: {
  //         Authorization: accessToken,
  //       },
  //     },
  //   };
  //   fetch(SECRET_URL, options)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setUser(data);
  //     });
  // };
  return (
    <UserContainer>
      Welcome {username} your user id is {userId}
      <Button onClick={onChangeMessage}>Your secret message!</Button>
      {message && <Message username={username} secretContent={secretContent} />}
    </UserContainer>
  );
};
export default User;
