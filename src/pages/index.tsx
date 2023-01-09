import { Typography } from "antd";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

import Layout from "@components/Layout";

const HomePage: NextPage = () => {
  const { t } = useTranslation("home");

  const { Text, Title } = Typography;

  return (
    <Layout>
      <Title>{t`heading`}</Title>
      <Text>{t`subheading`}</Text>
    </Layout>
  );
};

export default HomePage;
