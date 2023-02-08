import { Card, Col, Typography } from "antd";
import isEmpty from "lodash/isEmpty";
import { GetServerSideProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

import Breadcrumb from "@components/Breadcrumb";
import CourseAvailability from "@components/CourseAvailability";
import Layout from "@components/Layout";
import RTKComponent from "@components/RTKComponent";
import { StyledLink } from "@components/StyledComponents";
import { CourseWithRating } from "@constants/types";
import {
  useGetCourseQuery,
  useGetCourseRecommendationsQuery,
} from "@features/course/courseApi";

interface CourseSlugProps {
  code: string;
}

const CourseSlugPage: NextPage<CourseSlugProps> = ({ code }) => {
  const { Title, Paragraph } = Typography;

  const {
    data: course,
    isError,
    isFetching,
  }: {
    data?: CourseWithRating;
    isError: boolean;
    isFetching: boolean;
  } = useGetCourseQuery(code);

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

        {/* <Title level={2}>Description</Title>
        <Paragraph>{course?.description}</Paragraph> */}

        <Title level={2}>Semester Offerings</Title>
        <CourseAvailability
          unparsedAvailability={
            course?.availability as [string, string, string]
          }
        />
        <Col lg={8} md={12} sm={24}>
          <Card title="Pre-requisites">
            {!isEmpty(course?.prerequisites) ? (
              course?.prerequisites.map((prerequisite) => (
                <Paragraph>{prerequisite}</Paragraph>
              ))
            ) : (
              <Paragraph>None</Paragraph>
            )}
          </Card>
        </Col>
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
