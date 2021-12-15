import React from "react";
import styled from "styled-components";

const UnstyledHeader = ({ className }) => {
  return (
    <div className={className}>
      <img src="Logo.svg" alt="Huler Todo" />
    </div>
  );
};

const Header = styled(UnstyledHeader)`
  display: block;
  background-color: ${(props) => props.theme.colors.grey1};
  padding: 48px 48px 0 48px;

  > div {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.small}) {
    padding: 20px 20px 0 20px;
  }
`;

export default Header;
