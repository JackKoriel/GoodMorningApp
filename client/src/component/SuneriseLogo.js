import React from "react";
import styled from "styled-components";

const SuneriseLogo = () => {
  return (
    <Logo
      src="https://res.cloudinary.com/dhj5ncbxs/image/upload/v1639003210/onePiece/sunrise-logo.svg"
      alt="sunrise-logo"
    />
  );
};

const Logo = styled.img`
  width: 30%;
  min-width: 100px;
  /* margin-left: 20px; */
`;

export default SuneriseLogo;
