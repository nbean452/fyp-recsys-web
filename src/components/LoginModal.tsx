import { useState } from "react";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Modal, Typography, Input, Form, Button, Spin, Space } from "antd";
import useTranslation from "next-translate/useTranslation";

import { useLoginMutation } from "@features/auth/authApi";
import { setAuth } from "@features/auth/authSlice";
import { setLoginModalVisibility } from "@features/misc/modalVisibilitySlice";
import { useDispatch, useSelector } from "@utils/hooks";
import { success } from "@utils/notification";

// This component is placed in <Header/>
const LoginModal = (): JSX.Element => {
  const { Text } = Typography;
  const { t } = useTranslation("common");
  const [errMsg, setErrMsg] = useState<string>("");

  const { loginVisible: isOpen } = useSelector(
    (state) => state.modalVisibility,
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setLoginModalVisibility(false));
  };

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (values: any) => {
    const { username, password } = values;
    try {
      const res = await login({ password, username }).unwrap();
      dispatch(setAuth(res));
      success(t`notification.success`, t`notification.message.loggedIn`);
      handleClose();
    } catch (err: any) {
      if (!err?.data) {
        setErrMsg("No server response");
      } else if (err?.status === 400) {
        setErrMsg(err.data.detail);
      } else if (err?.status === 401) {
        setErrMsg(err.data.detail);
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <Modal
      footer={null}
      open={isOpen}
      title="Login"
      onCancel={handleClose}
      onOk={handleClose}
    >
      <Form autoComplete="off" name="login" onFinish={handleSubmit}>
        {errMsg && <Text>{errMsg}</Text>}
        <Form.Item
          name="username"
          rules={[{ message: "Please input your username!", required: true }]}
        >
          <Input placeholder="Enter your username" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ message: "Please input your password!", required: true }]}
        >
          <Input.Password
            placeholder="Enter your password"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item>
          <Space align="center">
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
            {isLoading && <Spin />}
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
