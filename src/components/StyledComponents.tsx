import { Layout, Menu, Space, Typography } from "antd";
import NextLink from "next/link";
import styled from "styled-components";

import color from "@constants/color";

const { Text, Title } = Typography;
interface StyledComponentProps {
  align?: "start" | "center";
  fontSize?: string;
}
interface StyledLinkProps {
  primary?: boolean;
  className?: string;
}

interface StyledContainerProps {
  flexDirection?: "row" | "column";
}

export const StyledTitle = styled(Title)<StyledComponentProps>`
  text-align: ${({ align }) => align ?? "start"};
  ${({ fontSize }) =>
    fontSize &&
    `
        font-size: ${fontSize} !important;
      `}
`;

export const StyledText = styled(Text)<StyledComponentProps>`
  justify-content: ${({ align }) => align ?? "start"};
  ${({ fontSize }) =>
    fontSize &&
    `
        font-size: ${fontSize} !important;
      `}
  width: 100%;
  display: flex;
`;

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

  display: flex;
  flex-direction: column;
  gap: 32px;

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

export const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection ?? "row"};
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
