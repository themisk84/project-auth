import React from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";

const criticAnimation = keyframes`
  0%    { opacity: 0;}  
  10%   { opacity: 0.1;}  
  20%   { opacity: 0.2;}
  30%   { opacity: 0.3;}
  40%   { opacity: 0.4;}
  50%   { opacity: 0.5;}
  60%    {opacity: 0.6;}
  70%   { opacity: 0.7;}
  80%   { opacity: 0.8;}
  90%   { opacity: 0.9;}
  100%  { opacity: 1;}
`;

const AnimationDiv = styled.div`
  height: 100px;
  overflow: hidden;
  text-align: center;
  margin: auto;
`;

const Animation = styled.div`
  text-align: center;
  position: relative;
  animation: ${criticAnimation} 15s;
`;
const Messages = styled.h1`
  font-family: "Italiana", serif;
`;

const Message = () => {
  const message = useSelector((store) => store.user.message);
  // const username = useSelector((store) => store.user.username);
  return (
    <div>
      <AnimationDiv>
        <Animation>
          <Messages>{message}</Messages>
        </Animation>
      </AnimationDiv>
    </div>
  );
};

export default Message;
