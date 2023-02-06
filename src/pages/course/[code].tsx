import { Typography } from "antd";
import { GetServerSideProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

import Breadcrumb from "@components/Breadcrumb";
import Layout from "@components/Layout";
import RTKComponent from "@components/RTKComponent";
import { StyledLink } from "@components/StyledComponents";
import {
  useGetCourseQuery,
  useGetCourseRecommendationsQuery,
} from "@features/course/courseApi";

interface CourseSlugProps {
  code: string;
}

const CourseSlugPage: NextPage<CourseSlugProps> = ({ code }) => {
  const { Title, Paragraph } = Typography;

  const { data: course, isError, isFetching } = useGetCourseQuery(code);

  const { data: courseRecs } = useGetCourseRecommendationsQuery(code);

  const { t } = useTranslation("common");

  const breadcrumbItems = [
    { href: "/courses", text: t`nav.courses` },
    { href: `/course/${code}`, text: code },
  ];

  return (
    <Layout>
      <Breadcrumb items={breadcrumbItems} />

      <RTKComponent isError={isError} isFetching={isFetching}>
        <Title level={1}>{course?.name}</Title>

        <Title level={2}>Description</Title>
        <Paragraph>{course?.description}</Paragraph>

        <Title level={2}>Similar Courses</Title>
        {courseRecs?.map((course: any) => (
          <StyledLink href={`/course/${course.code}`}>{course.name}</StyledLink>
        ))}
      </RTKComponent>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    code: query.code,
  },
});

export default CourseSlugPage;
