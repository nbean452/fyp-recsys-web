import { useState } from "react";

import { Modal, Typography, Input, Form, Button } from "antd";
import snakecaseKeys from "snakecase-keys";

import { useRegisterMutation } from "@features/auth/authApi";
import { setAuth } from "@features/auth/authSlice";
import { setRegisterModalVisibility } from "@features/misc/modalVisibilitySlice";
import { useDispatch, useSelector } from "@utils/hooks";

// This component is placed in <Header/>
const RegisterModal = (): JSX.Element => {
  const { Text } = Typography;

  const [errMsg, setErrMsg] = useState<string>("");

  const { registerVisible: isOpen } = useSelector(
    (state) => state.modalVisibility,
  );

  const dispatch = useDispatch();

  const handleClose = () => dispatch(setRegisterModalVisibility(false));

  const [register] = useRegisterMutation();

  const handleSubmit = async (values: any) => {
    const requestObject = snakecaseKeys(values);

    try {
      const res = await register(requestObject).unwrap();
      dispatch(setAuth(res));
      handleClose();
    } catch (err: any) {
      if (!err?.data) {
        setErrMsg("No server response");
      } else if (err?.status === 400) {
        setErrMsg(err.data.detail);
      } else if (err?.status === 401) {
        setErrMsg(err.data.detail);
      } else {
        setErrMsg("Register Failed");
      }
    }
  };

  return (
    <Modal
      footer={null}
      open={isOpen}
      title="Register"
      onCancel={handleClose}
      onOk={handleClose}
    >
      <Form autoComplete="off" name="register" onFinish={handleSubmit}>
        {errMsg && <Text>{errMsg}</Text>}
        <Form.Item
          name="username"
          rules={[{ message: "Please input your username!", required: true }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ message: "Please input your email!", required: true }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="firstName"
          rules={[{ message: "Please input your first name!", required: true }]}
        >
          <Input placeholder="Enter your first name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[{ message: "Please input your last name!", required: true }]}
        >
          <Input placeholder="Enter your last name" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ message: "Please input your password!", required: true }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[
            { message: "Please input your password again!", required: true },
          ]}
        >
          <Input.Password placeholder="Enter your password again" />
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

export default RegisterModal;
