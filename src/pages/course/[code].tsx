import { useState } from "react";

import { Button, Card, Col, Rate, Space, Typography } from "antd";
import isEmpty from "lodash/isEmpty";
import { GetServerSideProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

import Breadcrumb from "@components/Breadcrumb";
import CourseAvailability from "@components/CourseAvailability";
import Layout from "@components/Layout";
import ReviewModal from "@components/ReviewModal";
import RTKComponent from "@components/RTKComponent";
import { StyledLink } from "@components/StyledComponents";
import { CourseWithReview } from "@constants/types";
import {
  useGetCourseQuery,
  useGetCourseRecommendationsQuery,
} from "@features/course/courseApi";

interface CourseSlugProps {
  code: string;
}

const CourseSlugPage: NextPage<CourseSlugProps> = ({ code }) => {
  const { Title, Text, Paragraph } = Typography;

  const [showReview, setShowReview] = useState<boolean>(false);

  const {
    data: course,
    isError,
    isFetching,
  }: {
    data?: CourseWithReview;
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

        <Button type="primary" onClick={() => setShowReview(true)}>
          Add Review
        </Button>

        <Card>
          <Title>Reviews</Title>
          {!isEmpty(course?.reviews) ? (
            course?.reviews.map((review) => (
              <Card>
                <Space>
                  <Rate defaultValue={review.rating} disabled />
                  <Text>{review.user.username}</Text>
                </Space>
                <Paragraph
                  ellipsis={{ expandable: true, rows: 2, symbol: "more" }}
                >
                  {review.comment}
                </Paragraph>
              </Card>
            ))
          ) : (
            <Paragraph>No ratings yet!</Paragraph>
          )}
        </Card>

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

        <Title level={2}>Description</Title>
        <Paragraph>{course?.description}</Paragraph>
      </RTKComponent>
      <ReviewModal
        courseId={course?.id as number}
        show={showReview}
        onCancel={() => setShowReview(false)}
        onOk={() => setShowReview(false)}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    code: query.code,
  },
});

export default CourseSlugPage;
