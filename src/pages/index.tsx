import { Card, Col, Row } from "antd";
import { NextPage } from "next";

import NextImage from "@components/Image";
import Layout from "@components/Layout";

import iProtect from "../../public/img/iprotect-mobile.png";

const { Meta } = Card;

const CardComponent = (
  <Card cover={<NextImage alt="iProtect" src={iProtect} />} hoverable>
    <Meta description="Made using Next.js" title="iProtect" />
  </Card>
);

const HomePage: NextPage = () => (
  <Layout>
    <Row gutter={[16, 16]}>
      {new Array(5).fill(CardComponent).map((item) => (
        <Col md={12} sm={24} xl={6}>
          {item}
        </Col>
      ))}
    </Row>
  </Layout>
);

export default HomePage;
