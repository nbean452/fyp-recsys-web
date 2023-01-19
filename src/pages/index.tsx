import { Typography } from "antd";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

import Layout from "@components/Layout";
import { StyledLink } from "@components/StyledComponents";

// import wallpaper from "../../../public/svg/wallpaper.svg";

const HomePage: NextPage = () => {
  const { t } = useTranslation("home");

  const { Text, Title } = Typography;

  return (
    <Layout>
      <Title>{t`heading`}</Title>
      <Text>{t`subheading`}</Text>
      <StyledLink href="/post/123">Post 123</StyledLink>
      <StyledLink href="/post/125">Post 125</StyledLink>
    </Layout>
  );
};

export default HomePage;
