import { InstagramOutlined, FacebookOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Space } from "antd";

import { StyledFooter, StyledLink } from "@components/StyledComponents";

const Footer = (): JSX.Element => (
  <StyledFooter>
    <Row justify="space-between">
      <Col>
        <Typography.Text>
          Made by nbean452 on{" "}
          <StyledLink href="https://github.com/nbean452">Github</StyledLink>
        </Typography.Text>
      </Col>
      <Col>
        <Space direction="horizontal">
          <StyledLink href="https://www.instagram.com">
            <InstagramOutlined />
          </StyledLink>
          <StyledLink href="https://www.facebook.com">
            <FacebookOutlined />
          </StyledLink>
        </Space>
      </Col>
    </Row>
  </StyledFooter>
);

export default Footer;
