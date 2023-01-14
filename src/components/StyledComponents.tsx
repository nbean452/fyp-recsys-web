import { Layout, Menu, Space } from "antd";
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
  padding-inline: 48px !important;

  @media screen and (max-width: 600px) {
    padding-inline: 16px !important;
  }
`;

// no styles yet!
export const StyledContent = styled(Layout.Content)`
  padding: 48px;

  @media screen and (max-width: 600px) {
    padding: 16px;
  }
`;

export const StyledFooter = styled(Layout.Footer)``;

export const StyledMenu = styled(Menu)`
  display: flex;
  gap: 8px;
  min-width: 100%;

  &::before {
    all: unset;
  }
  & > li::after {
    inset-inline: 0 !important;
    border-radius: 0 !important;
  }
`;

export const StyledSpace = styled(Space)`
  width: 100%;
`;
