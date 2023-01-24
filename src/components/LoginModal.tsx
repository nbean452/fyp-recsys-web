import { useState } from "react";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Modal, Typography, Input, Form, Button } from "antd";
import useTranslation from "next-translate/useTranslation";

import { useLoginMutation } from "@features/auth/authApi";
import { setCredentials } from "@features/auth/authSlice";
import { useDispatch } from "@utils/hooks";
import { success } from "@utils/notification";

interface LoginModalType {
  show: boolean;
  onOk: any;
  onCancel: any;
}

const LoginModal = ({ show, onOk, onCancel }: LoginModalType): JSX.Element => {
  const { Text } = Typography;
  const { t } = useTranslation("common");
  const [errMsg, setErrMsg] = useState<string>("");

  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const handleSubmit = async (values: any) => {
    const { username, password } = values;
    try {
      const res = await login({ password, username }).unwrap();
      dispatch(setCredentials(res));
      success(t`notification.success`, t`notification.message.loggedIn`);
      onOk();
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
      open={show}
      title="Login"
      onCancel={onCancel}
      onOk={onOk}
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
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
