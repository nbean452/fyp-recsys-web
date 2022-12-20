import { ReactNode } from "react";

import { Col, Layout as AntdLayout, Row, Space, Typography } from "antd";
import Link from "next/link";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const {
    Header: AntdHeader,
    Footer: AntdFooter,
    Content: AntdContent,
  } = AntdLayout;

  const { Text } = Typography;

  return (
    <AntdLayout style={{ margin: "0", minHeight: "100vh", padding: "0" }}>
      <AntdHeader>
        <Space>
          <Link href="/">Home</Link>
          <Link href="products">Products</Link>
        </Space>
      </AntdHeader>
      <AntdContent style={{ padding: "50px" }}>
        <Space direction="vertical">{children}</Space>
      </AntdContent>
      <AntdFooter>
        <Row justify="space-between">
          <Col>
            <Text>
              Made with love on{" "}
              <Link href="https://github.com/nbean452">Github</Link>
            </Text>
          </Col>
          <Col>
            <Space direction="horizontal">
              <Text>IG</Text>
              <Text>FB</Text>
            </Space>
          </Col>
        </Row>
      </AntdFooter>
    </AntdLayout>
  );
};

export default Layout;
