import { Typography } from "antd";
import { GetServerSideProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

import Breadcrumb from "@components/Breadcrumb";
import Layout from "@components/Layout";
import RTKComponent from "@components/RTKComponent";
import { useGetCourseQuery } from "@features/course/courseApi";

interface CourseSlugProps {
  // course: CourseWithRating;
  // isError: boolean;
  // isFetching: boolean;
  code: string;
}

const CourseSlugPage: NextPage<CourseSlugProps> = ({
  code,
  // course,
  // isError,
  // isFetching,
}) => {
  // const router = useRouter();
  // const { code } = router.query;

  const { Title, Paragraph } = Typography;

  const { data: course, isError, isFetching } = useGetCourseQuery(code);

  const { t } = useTranslation("common");

  const breadcrumbItems = [
    { href: "/", text: t`nav.home` },
    { href: `/course/${code}`, text: code },
  ];

  return (
    <Layout>
      <Breadcrumb items={breadcrumbItems} />

      <RTKComponent isError={isError} isFetching={isFetching}>
        <Title level={3}>{course?.name}</Title>
        <Paragraph>{course?.description}</Paragraph>
      </RTKComponent>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // const { data: course, isError, isFetching } = useGetCourseQuery(query.code);
  return {
    props: { code: query.code },
  };
};

export default CourseSlugPage;
