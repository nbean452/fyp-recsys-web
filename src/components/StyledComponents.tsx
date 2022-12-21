import { Layout } from "antd";
import NextLink from "next/link";
import styled from "styled-components";

import color from "@constants/color";

type StyledLinkProps = {
  primary?: boolean;
  className?: string;
};

// no styles yet!
export const StyledLink = styled(NextLink)<StyledLinkProps>`
  /* ${(props) => props.primary && "color: white;"} */
`;

export const StyledLayout = styled(Layout)`
  margin: 0;
  min-height: 100vh;
  padding: 0;
`;

// no styles yet!
export const StyledHeader = styled(Layout.Header)`
  background: ${color.header} !important;
`;

// no styles yet!
export const StyledContent = styled(Layout.Content)`
  padding: 50px;
`;

export const StyledFooter = styled(Layout.Footer)``;
