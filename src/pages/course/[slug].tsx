import { Breadcrumb, Card } from "antd";
import upperCase from "lodash/upperCase";
import { NextPage } from "next";
import { useRouter } from "next/router";

import Image from "@components/Image";
import Layout from "@components/Layout";
import { StyledLink } from "@components/StyledComponents";

import iProtect from "../../../public/img/iprotect-mobile.png";

const CourseSlugPage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { Meta } = Card;
  const { Item } = Breadcrumb;

  const courseName = upperCase(slug as string);

  return (
    <Layout>
      <Breadcrumb>
        <Item>
          <StyledLink href="/">Home</StyledLink>
        </Item>
        <Item>
          <StyledLink href={router.asPath}>{courseName}</StyledLink>
        </Item>
      </Breadcrumb>
      <Card cover={<Image alt="iProtect" src={iProtect} priority />} hoverable>
        <Meta description={`Course ${courseName}`} title={courseName} />
      </Card>
    </Layout>
  );
};

export default CourseSlugPage;
