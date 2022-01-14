import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Bg = styled.main`
  margin-top: 0;
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url("assets/bg-img.jpg");
  color: white;
  text-align: center;
`;
const Header = styled.h1`
  padding: 60px;
  margin: 0;
  font-family: "Italiana", serif;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: rgba(66, 177, 162, 1);
  justify-content: center;
  width: 90%;
  height: 500px;
  margin: 10% auto;
  opacity: 0.5;
  @media (min-width: 768px) {
    flex-direction: row;
    width: 50%;
    height: 300px;
  }
`;
const B1 = styled.div`
  height: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  a:link {
    text-decoration: none;
  }

  @media (min-width: 768px) {
    width: 50%;
    height: 100%;
  }
`;
const B2 = styled.div`
  height: 50%;
  background-color: rgba(253, 248, 248, 0.5);
  width: 100%;
  a:link {
    text-decoration: none;
  }

  @media (min-width: 768px) {
    width: 50%;
    height: 100%;
  }
`;
const ButtonU = styled.p`
  margin-top: 100px;
  color: white;
  font-size: 50px;
  font-family: "Italiana", serif;

  &:hover {
    color: black;
    font-size: 60px;
    font-weight: 900;
  }
`;

const ButtonI = styled.p`
  margin-top: 100px;
  font-size: 50px;
  color: black;
  font-family: "Italiana", serif;
  cursor: pointer;
  &:hover {
    color: grey;
    font-weight: 900;
    font-size: 60px;
  }
`;

const Start = () => {
  return (
    <Bg>
      <Header>Hello you!</Header>
      <Container>
        <B1>
          <Link to="/signup">
            <ButtonU>Sign up</ButtonU>
          </Link>
        </B1>
        <B2>
          <Link to="/signin">
            <ButtonI>Sign in</ButtonI>
          </Link>
        </B2>
      </Container>
    </Bg>
  );
};

export default Start;
