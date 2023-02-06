import { Row, Col, Typography, Space } from "antd";

import LocaleSwitcher from "@components/LocaleSwitcher";
import { StyledFooter, StyledLink } from "@components/StyledComponents";

const Footer = (): JSX.Element => (
  <StyledFooter>
    <Row justify="space-between">
      <Col>
        <Typography.Text>
          Made by nbean452 on{" "}
          <StyledLink href="https://github.com/nbean452" target="_blank">
            Github
          </StyledLink>
        </Typography.Text>
      </Col>
      <Col>
        <Space direction="horizontal">
          <LocaleSwitcher />
        </Space>
      </Col>
    </Row>
  </StyledFooter>
);

export default Footer;
