import React from "react";
import styled from "styled-components";

const ErrorMsg = ({ children }) => <Wrapper>{children}</Wrapper>;

const Wrapper = styled.div`
  position: absolute;
  bottom: -100px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  border: 2px solid red;
  border-radius: 10px;
  height: 75px;
  width: fit-content;
  padding: 0 25px;
  justify-content: center;
  align-items: center;
  color: red;
  font-weight: 700;
  font-size: 14px;
  background-color: var(--beige-color);
  z-index: 10;
`;

export default ErrorMsg;
