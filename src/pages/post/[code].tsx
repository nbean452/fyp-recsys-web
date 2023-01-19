import { Typography } from "antd";
import { GetServerSideProps, NextPage } from "next";

import Layout from "@components/Layout";

interface PostSlugProps {
  code: string;
}

const PostSlugPage: NextPage<PostSlugProps> = ({ code }) => {
  return (
    <Layout>
      <Typography.Text>{code}</Typography.Text>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.query;
  return {
    props: {
      code,
    },
  };
};

export default PostSlugPage;
