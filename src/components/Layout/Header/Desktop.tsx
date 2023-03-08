import { useState } from "react";

import { Col, Space, MenuProps } from "antd";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import LoginRegisterButton from "@components/Layout/Header/LoginRegisterButton";
import { StyledMenu } from "@components/StyledComponents";
import { HeaderType } from "@constants/types";
import {
  setLoginModalVisibility,
  setRegisterModalVisibility,
} from "@features/misc/modalVisibilitySlice";

const DesktopHeader = ({ menuItems }: HeaderType): JSX.Element => {
  const router = useRouter();

  const [current, setCurrent] = useState(router.pathname);
  const handleClick: MenuProps["onClick"] = (e) => setCurrent(e.key);

  const dispatch = useDispatch();

  const handleLoginClick = () => {
    dispatch(setLoginModalVisibility(true));
  };
  const handleRegisterClick = () => {
    dispatch(setRegisterModalVisibility(true));
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
        </Space>
      </Col>
    </>
  );
};

export default DesktopHeader;
