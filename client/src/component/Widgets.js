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
  flex: 0.25;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
  width: 100%;
  background-color: var(--brown-color);
  padding-right: 25px;
  padding-left: 25px;
`;

export default Widgets;
