import { UserOutlined } from "@ant-design/icons";
import { Modal, Space, Typography, Input } from "antd";

interface LoginModalType {
  show: boolean;
  onOk: any;
  onCancel: any;
}

const LoginModal = ({ show, onOk, onCancel }: LoginModalType): JSX.Element => {
  const { Text } = Typography;

  // const RegisterModal = (
  //   <Modal open={show} title="Register" onCancel={() => setShow(false)}>
  //     <Space direction="vertical" style={{ width: "100%" }}>
  //       <Text>Username</Text>
  //       <Input placeholder="Enter your username" prefix={<UserOutlined />} />
  //       <Text>Password</Text>
  //       <Input.Password placeholder="Enter your password" />
  //       <Text>Confirm Password</Text>
  //       <Input.Password placeholder="Enter your password again" />
  //     </Space>
  //   </Modal>
  // );

  return (
    <Modal open={show} title="Login" onCancel={onCancel} onOk={onOk}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text>Username</Text>
        <Input placeholder="Enter your username" prefix={<UserOutlined />} />
        <Text>Password</Text>
        <Input.Password placeholder="Enter your password" />
      </Space>
    </Modal>
  );
};

export default LoginModal;
