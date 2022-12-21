import { Card } from "antd";
import { startCase } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";

import Image from "@components/Image";
import Layout from "@components/Layout";

import iProtect from "../../../public/img/iprotect-mobile.png";

const CourseSlugPage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { Meta } = Card;

  return (
    <Layout>
      <Card cover={<Image alt="iProtect" src={iProtect} priority />} hoverable>
        <Meta
          description={`Course ${startCase(slug as string)}`}
          title={startCase(slug as string)}
        />
      </Card>
    </Layout>
  );
};

export default CourseSlugPage;
