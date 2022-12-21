import { Card, Col, Row, Typography } from "antd";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

import NextImage from "@components/Image";
import Layout from "@components/Layout";

import iProtect from "../../public/img/iprotect-mobile.png";

const { Meta } = Card;
const { Text, Title } = Typography;

const CardComponent = (
  <Card cover={<NextImage alt="iProtect" src={iProtect} />} hoverable>
    <Meta description="Made using Next.js" title="iProtect" />
  </Card>
);

const HomePage: NextPage = () => {
  const { t } = useTranslation("home");

  return (
    <Layout>
      <Title>{t`heading`}</Title>
      <Text>{t`subheading`}</Text>
      <Row gutter={[16, 16]}>
        {new Array(5).fill(CardComponent).map((item) => (
          <Col md={12} sm={24} xl={6}>
            {item}
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default HomePage;
