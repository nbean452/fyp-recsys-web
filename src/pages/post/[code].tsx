import { Typography } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";

import Layout from "@components/Layout";

const PostSlugPage: NextPage = () => {
  const router = useRouter();
  const { code } = router.query;
  return (
    <Layout>
      <Typography.Text>{code}</Typography.Text>
    </Layout>
  );
};

export default PostSlugPage;
