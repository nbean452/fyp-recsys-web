import { useState } from "react";

import { HomeOutlined, MenuOutlined } from "@ant-design/icons";
import { Col, Space, Button, Drawer } from "antd";
import useTranslation from "next-translate/useTranslation";
import { useDispatch } from "react-redux";

import LoginRegisterButton from "@components/Layout/Header/LoginRegisterButton";
import { StyledLink } from "@components/StyledComponents";
import { HeaderType } from "@constants/types";
import {
  setLoginModalVisibility,
  setRegisterModalVisibility,
} from "@features/misc/modalVisibilitySlice";

interface MenuItemType {
  icon: JSX.Element;
  label: JSX.Element;
  key: string;
}

const MobileHeader = ({ menuItems }: HeaderType): JSX.Element => {
  const { t } = useTranslation("common");
  const [showDrawer, setShowDrawer] = useState(false);

  const dispatch = useDispatch();

  const handleLoginClick = () => {
    setShowDrawer(false);
    dispatch(setLoginModalVisibility(true));
  };
  const handleRegisterClick = () => {
    setShowDrawer(false);
    dispatch(setRegisterModalVisibility(true));
  };

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
            <LoginRegisterButton
              direction="vertical"
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
            />
          </Space>
        </Drawer>
      </Col>
    </>
  );
};

export default MobileHeader;
