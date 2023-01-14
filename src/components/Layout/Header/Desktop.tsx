import { useState } from "react";

import { Col, Space, Button, MenuProps } from "antd";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import LocaleSwitcher from "@components/LocaleSwitcher";
import { StyledMenu } from "@components/StyledComponents";
import { HeaderType } from "@constants/types";

const DesktopHeader = ({
  menuItems,
  setShowLogin,
  setShowRegister,
}: HeaderType): JSX.Element => {
  const { t } = useTranslation("common");

  const router = useRouter();

  const [current, setCurrent] = useState(router.pathname);
  const handleClick: MenuProps["onClick"] = (e) => setCurrent(e.key);

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
          <Button type="primary" onClick={() => setShowLogin(true)}>
            {t`nav.login`}
          </Button>
          <Button onClick={() => setShowRegister(true)}>
            {t`nav.register`}
          </Button>
          <LocaleSwitcher />
        </Space>
      </Col>
    </>
  );
};

export default DesktopHeader;
