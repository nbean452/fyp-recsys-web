import { Typography } from "antd";
import { NextPage } from "next";

import Layout from "@components/Layout";

const CoursesPage: NextPage = () => {
  const { Text } = Typography;

  return (
    <Layout>
      <Text>Courses</Text>
    </Layout>
  );
};

export default CoursesPage;
