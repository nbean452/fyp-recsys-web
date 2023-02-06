import React from "react";

import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Typography } from "antd";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import { logOut } from "@features/auth/authSlice";
import { useSelector, useDispatch } from "@utils/hooks";
import { success } from "@utils/notification";

interface LoginRegisterButtonProps {
  handleLoginClick: () => void;
  handleRegisterClick: () => void;
  direction?: "horizontal" | "vertical";
}

const LoginRegisterButton = ({
  handleLoginClick,
  handleRegisterClick,
  direction,
}: LoginRegisterButtonProps) => {
  const { t } = useTranslation("common");
  const { username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const router = useRouter();

  const { Text } = Typography;

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "profile":
        router.push("/profile/");
        break;
      case "courses":
        router.push("/profile/courses/");
        break;
      case "logout":
        dispatch(logOut());
        success("Logout", "Successful logout");
        break;
      default:
        break;
    }
  };

  const items: MenuProps["items"] = [
    { key: "profile", label: "Profile" },
    { key: "courses", label: "Courses" },
    { type: "divider" },
    { key: "logout", label: t`nav.logout` },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return username ? (
    <Dropdown menu={menuProps} trigger={["click"]}>
      <Button>
        <UserOutlined />
        <Text>{username}</Text>
      </Button>
    </Dropdown>
  ) : (
    <Space direction={direction}>
      <Button type="primary" onClick={handleLoginClick}>
        {t`nav.login`}
      </Button>
      <Button onClick={handleRegisterClick}>{t`nav.register`}</Button>
    </Space>
  );
};

LoginRegisterButton.defaultProps = {
  direction: "horizontal",
};

export default LoginRegisterButton;
