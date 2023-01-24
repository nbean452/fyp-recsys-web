import { useState } from "react";

import { Col, Space, MenuProps } from "antd";
import { useRouter } from "next/router";

import LoginRegisterButton from "@components/Layout/Header/LoginRegisterButton";
import LocaleSwitcher from "@components/LocaleSwitcher";
import { StyledMenu } from "@components/StyledComponents";
import { HeaderType } from "@constants/types";

const DesktopHeader = ({
  menuItems,
  setShowLogin,
  setShowRegister,
}: HeaderType): JSX.Element => {
  const router = useRouter();

  const [current, setCurrent] = useState(router.pathname);
  const handleClick: MenuProps["onClick"] = (e) => setCurrent(e.key);

  const handleLoginClick = () => {
    setShowLogin(true);
  };
  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  return (
    <>
      <Col md={12} sm={0} xs={0}>
        <StyledMenu
          items={menuItems}
          mode="horizontal"
          selectedKeys={[current]}
          triggerSubMenuAction="click"
          onClick={handleClick}
        />
      </Col>
      <Col md={12} sm={0} xs={0}>
        <Space style={{ float: "right", justifyContent: "right" }}>
          <LoginRegisterButton
            handleLoginClick={handleLoginClick}
            handleRegisterClick={handleRegisterClick}
          />
          <LocaleSwitcher />
        </Space>
      </Col>
    </>
  );
};

export default DesktopHeader;
