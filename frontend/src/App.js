import React, { useState, useEffect } from "react";

import SignUp from "./component/SignUp";
import Signin from "./component/Signin";
import ButtonSignin from "component/ButtonSignin";
import { SIGNUP_URL, SIGNIN_URL, SECRET_URL } from "./utils/urls";

import User from "component/User";
import Message from "component/Message";

export const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secretContent, setSecretContent] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState(false);

  const handleSignUp = (event) => {
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

    fetch(SIGNUP_URL, options).then((res) => {
      res.json();
    });
  };

  const handleSignIn = (event) => {
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
        setUser(data);
      });

    setSignedIn(true);
  };

  console.log(user);
  const handleMessage = (event) => {
    event.preventDefault();
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(SECRET_URL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      });

    setMessage(true);
  };

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleSecretContentChange = (event) =>
    setSecretContent(event.target.value);

  return (
    <div>
      {signedIn ? (
        <User
          userId={userId}
          secretContent={secretContent}
          username={username}
          message={message}
          onChangeMessage={handleMessage}
        />
      ) : (
        <Signin
          onSignIn={handleSignIn}
          username={username}
          password={password}
          onChangePassword={handlePasswordChange}
          onChangeUsername={handleUsernameChange}
          secretContent={secretContent}
          // message={message}
          // onChangeMessage={handleMessage}
        />
      )}

      {/* )  (
        <SignUp
          onSignUp={handleSignUp}
          username={username}
          onChangeUsername={handleUsernameChange}
          password={password}
          onChangePassword={handlePasswordChange}
          secretContent={secretContent}
          onChangeSecretContent={handleSecretContentChange}
        />
      )} */}
    </div>
  );
};
