import styled from "@emotion/styled";
import { type PropsWithChildren } from "react";
import { BLACK, WHITE } from "../styles/colors";

const LayoutContainer = styled.div`
  position: relative;
  background-color: ${WHITE};
  color: ${BLACK};
  padding-top: 96px;
`;

const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  return <LayoutContainer>{children}</LayoutContainer>;
};

export default Layout;
