import { useState } from "react";

import { HomeOutlined, MenuOutlined } from "@ant-design/icons";
import { Col, Space, Button, Drawer } from "antd";
import useTranslation from "next-translate/useTranslation";

import LocaleSwitcher from "@components/LocaleSwitcher";
import { StyledLink } from "@components/StyledComponents";
import { HeaderType } from "@constants/types";

interface MenuItemType {
  icon: JSX.Element;
  label: JSX.Element;
  key: string;
}

const MobileHeader = ({
  menuItems,
  setShowLogin,
  setShowRegister,
}: HeaderType): JSX.Element => {
  const { t } = useTranslation("common");
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <Col md={0} sm={18} xs={18}>
        <StyledLink href="/">
          <Space>
            <HomeOutlined />
            {t`nav.home`}
          </Space>
        </StyledLink>
      </Col>
      <Col md={0} sm={6} xs={6}>
        <Space style={{ float: "right", justifyContent: "right" }}>
          <Button
            icon={<MenuOutlined />}
            type="primary"
            onClick={() => setShowDrawer(true)}
          />
        </Space>
        <Drawer
          open={showDrawer}
          placement="left"
          title={t`nav.drawer`}
          width={250}
          onClose={() => setShowDrawer(false)}
        >
          <Space direction="vertical">
            {(menuItems as MenuItemType[]).map(
              (item) =>
                item.key !== "/" && (
                  <StyledLink href={item.key} key={item.key}>
                    {/* <StyledSpace>
                      {item.icon}
                      {item.label}
                    </StyledSpace> */}
                    {item.label}
                  </StyledLink>
                ),
            )}
            <Button
              type="primary"
              onClick={() => {
                setShowDrawer(false);
                setShowLogin(true);
              }}
            >
              {t`nav.login`}
            </Button>
            <Button
              onClick={() => {
                setShowDrawer(false);
                setShowRegister(true);
              }}
            >
              {t`nav.register`}
            </Button>
            <LocaleSwitcher />
          </Space>
        </Drawer>
      </Col>
    </>
  );
};

export default MobileHeader;