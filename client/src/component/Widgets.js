import React from "react";
import styled from "styled-components";
import Horoscope from "./Horoscope";
import News from "./News";
import Weather from "./Weather";

const Widgets = () => {
  return (
    <Master>
      <Weather />
      <News />
      <Horoscope />
    </Master>
  );
};

const Master = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
  width: 100%;
  background-color: var(--brown-color);
  padding-right: 25px;
  padding-left: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export default Widgets;
