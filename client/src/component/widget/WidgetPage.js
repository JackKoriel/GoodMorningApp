import React from "react";
import styled from "styled-components";
import Widgets from "./Widgets";

const WidgetPage = () => {
  return (
    <Wrappper>
      <Widgets />
    </Wrappper>
  );
};

const Wrappper = styled.div`
  background: var(--beige-color);
  max-width: 700px;
  width: 700px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  -ms-overflow-style: none; /*for IE*/
  scrollbar-width: none; /*for Firefox*/
  /*for Chrome*/
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default WidgetPage;
