import { Typography } from "antd";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import Breadcrumb from "@components/Breadcrumb";
import Layout from "@components/Layout";
import RTKComponent from "@components/RTKComponent";
import { useGetCourseQuery } from "@features/course/courseApi";

const CourseSlugPage: NextPage = () => {
  const router = useRouter();
  const { code } = router.query;

  const { Title, Paragraph } = Typography;

  const { data: courseData, isError, isFetching } = useGetCourseQuery(code);

  const { t } = useTranslation("common");

  const breadcrumbItems = [
    { href: "/", text: t`nav.home` },
    { href: router.asPath, text: code as string },
  ];

  return (
    <Layout>
      <Breadcrumb items={breadcrumbItems} />

      <RTKComponent isError={isError} isFetching={isFetching}>
        <Title level={3}>{courseData?.name}</Title>
        <Paragraph>{courseData?.description}</Paragraph>
      </RTKComponent>
    </Layout>
  );
};

export default CourseSlugPage;
