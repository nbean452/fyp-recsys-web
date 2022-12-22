import { ReactNode, useState } from "react";

import {
  InstagramOutlined,
  FacebookOutlined,
  HomeOutlined,
  BookOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  MenuProps,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";

import {
  StyledContent,
  StyledFooter,
  StyledHeader,
  StyledLayout,
  StyledLink,
  StyledMenu,
} from "@components/StyledComponents";

import LocaleSwitcher from "./LocaleSwitcher";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const { Text } = Typography;
  const { t } = useTranslation("common");

  const router = useRouter();

  const [current, setCurrent] = useState(router.pathname);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const handleClick: MenuProps["onClick"] = (e) => setCurrent(e.key);

  const menuItems: MenuProps["items"] = [
    {
      icon: <HomeOutlined />,
      key: "/",
      label: <StyledLink href="/">{t`nav.home`}</StyledLink>,
    },
    {
      icon: <BookOutlined />,
      key: "/courses",
      label: <StyledLink href="/courses">{t`nav.courses`}</StyledLink>,
    },
  ];

  return (
    <>
      <Head>
        <title>Course Recommender System</title>
        <meta content="Generated by create next app" name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/img/favicon/favicon.ico" rel="icon" />
      </Head>
      <StyledLayout>
        <StyledHeader>
          <Row gutter={[16, 16]} justify="space-between">
            <Col sm={12} xs={0}>
              <StyledMenu
                items={menuItems}
                mode="horizontal"
                selectedKeys={[current]}
                triggerSubMenuAction="click"
                onClick={handleClick}
              />
            </Col>
            <Col sm={12} xs={0}>
              <Space style={{ float: "right", justifyContent: "right" }}>
                <Button type="primary" onClick={() => setShowLogin(true)}>
                  {t`nav.login`}
                </Button>
                <Button type="primary" onClick={() => setShowRegister(true)}>
                  {t`nav.register`}
                </Button>
                <LocaleSwitcher />
              </Space>
            </Col>
            <Col sm={0} xs={18}>
              <StyledLink href="/">
                <Space>
                  <HomeOutlined />
                  {t`nav.home`}
                </Space>
              </StyledLink>
            </Col>
            <Col sm={0} xs={6}>
              <Space style={{ float: "right", justifyContent: "right" }}>
                <Button
                  icon={<MenuOutlined />}
                  type="primary"
                  onClick={() => setShowDrawer(true)}
                />
              </Space>
              <Drawer
                open={showDrawer}
                placement="right"
                title="Basic Drawer"
                width={250}
                onClose={() => setShowDrawer(false)}
              >
                <Space direction="vertical">
                  <StyledLink href="/courses">{t`nav.courses`}</StyledLink>
                  <Button
                    type="primary"
                    onClick={() => {
                      setShowDrawer(false);
                      setShowLogin(true);
                    }}
                  >
                    {t`nav.login`}
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setShowDrawer(false);
                      setShowRegister(true);
                    }}
                  >
                    {t`nav.register`}
                  </Button>
                  <LocaleSwitcher />
                </Space>
              </Drawer>
            </Col>
          </Row>
          <Modal
            open={showLogin}
            title="Login"
            onCancel={() => setShowLogin(false)}
          >
            Components here...
          </Modal>
          <Modal
            open={showRegister}
            title="Register"
            onCancel={() => setShowRegister(false)}
          >
            Components here...
          </Modal>
        </StyledHeader>

        <StyledContent>
          <Space direction="vertical">{children}</Space>
        </StyledContent>

        <StyledFooter>
          <Row justify="space-between">
            <Col>
              <Text>
                Made by nbean452 on{" "}
                <StyledLink href="https://github.com/nbean452">
                  Github
                </StyledLink>
              </Text>
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
      </StyledLayout>
    </>
  );
};

export default Layout;
