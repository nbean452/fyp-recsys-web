import {
  BookOutlined,
  HomeOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import { MenuProps, Row } from "antd";
import useTranslation from "next-translate/useTranslation";

import DesktopHeader from "@components/Layout/Header/Desktop";
import MobileHeader from "@components/Layout/Header/Mobile";
import LoginModal from "@components/LoginModal";
import RegisterModal from "@components/RegisterModal";
import { StyledHeader, StyledLink } from "@components/StyledComponents";

const Header = (): JSX.Element => {
  const { t } = useTranslation("common");

  const menuItems: MenuProps["items"] = [
    {
      icon: <HomeOutlined />,
      key: "/",
      label: <StyledLink href="/">{t`nav.home`}</StyledLink>,
    },
    {
      icon: <BookOutlined />,
      key: "/courses",
      label: <StyledLink href="/courses">{t`nav.courses`}</StyledLink>,
    },
    {
      icon: <PaperClipOutlined />,
      key: "/docs",
      label: <StyledLink href="/docs">{t`nav.docs`}</StyledLink>,
    },
  ];

  return (
    <StyledHeader>
      <Row gutter={[16, 16]} justify="space-between">
        <DesktopHeader menuItems={menuItems} />
        <MobileHeader menuItems={menuItems} />
        <LoginModal />
        <RegisterModal />
      </Row>
    </StyledHeader>
  );
};

export default Header;
