import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";
import { BLACK, WHITE } from "../styles/colors";

const HeaderConatiner = styled.div`
  width: 100%;
  height: 96px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  @media (max-width: 1200px) {
    height: 72px;
  }
`;

const HomeText = styled(Link)`
  position: relative;
  display: block;
  overflow: hidden;
  cursor: pointer;
  background-color: ${BLACK};
  color: ${WHITE};
  text-decoration: none;
  font-family: "Helvetica Neue";
  font-weight: 700;
  font-size: 14px;
  padding: 8px 32px 8px 12px;
`;

const Header = () => {
  return (
    <HeaderConatiner>
      <HomeText to="/">COLONIZER TRAINING CAMP</HomeText>
    </HeaderConatiner>
  );
};

export default Header;
