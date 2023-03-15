import { useState } from "react";

import { Button, Card, Col, Rate, Row, Space, Typography } from "antd";
import { find } from "lodash";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";

import Layout from "@components/Layout";
import ReviewModal from "@components/ReviewModal";
import RTKComponent from "@components/RTKComponent";
import { StyledLink } from "@components/StyledComponents";
import { CourseWithReview, ReviewWithUser } from "@constants/types";
import { useGetCFRecommendationsQuery } from "@features/course/courseApi";
import { useGetTakenCourseQuery } from "@features/profile/profileApi";
import { useSelector } from "@utils/hooks";

const ProfilePage = () => {
  const { Title, Paragraph, Text } = Typography;

  const { username, id } = useSelector((state) => state.auth);

  const router = useRouter();

  if (!username) router.push("/");

  const {
    data,
    isError: isCourseError,
    isFetching: isCourseFetching,
  }: {
    data?: {
      takenCourse: CourseWithReview[];
    };
    isError: boolean;
    isFetching: boolean;
  } = useGetTakenCourseQuery(username);

  const {
    data: recommendedCourses,
    isError: isRecommendedError,
    isFetching: isRecommendedFetching,
  }: {
    data?: CourseWithReview[];
    isError: boolean;
    isFetching: boolean;
  } = useGetCFRecommendationsQuery(id);

  const [showReview, setShowReview] = useState<boolean>(false);
  const [course, setCourse] = useState<CourseWithReview | {}>({});

  const [reviewType, setReviewType] = useState<"create" | "update">("create");
  const [reviewData, setReviewData] = useState<ReviewWithUser | {} | undefined>(
    {},
  );

  const findUserReview = (course: CourseWithReview) =>
    find(course.reviews, (item) => item.user.username === username);

  const renderButton = (course: CourseWithReview) =>
    findUserReview(course) ? (
      <Button
        type="primary"
        onClick={() => {
          setCourse(course);
          setShowReview(true);
          setReviewType("update");
          setReviewData(findUserReview(course));
        }}
      >
        Edit Review
      </Button>
    ) : (
      <Button
        type="primary"
        onClick={() => {
          setCourse(course);
          setShowReview(true);
          setReviewType("create");
        }}
      >
        Add Review
      </Button>
    );

  const renderUserReview = (course: CourseWithReview) => {
    const userReview = findUserReview(course);

    return userReview ? (
      <>
        <Rate defaultValue={userReview.rating} disabled />
        <Text>{userReview.comment}</Text>
      </>
    ) : (
      <Text>No reviews yet!</Text>
    );
  };

  return (
    <Layout>
      <Title>Profile</Title>
      <Title level={2}>Users like you liked these courses</Title>
      <RTKComponent
        isError={isRecommendedError}
        isFetching={isRecommendedFetching}
      >
        {(recommendedCourses as any)?.detail !== "No Content" ? (
          recommendedCourses?.map((recommendedCourse: CourseWithReview) => (
            <StyledLink
              href={`/course/${recommendedCourse.code}`}
              key={recommendedCourse.code}
            >
              {recommendedCourse.name}
            </StyledLink>
          ))
        ) : (
          <Paragraph>
            No recommendations for you yet! Rate some courses and come back
            later!
          </Paragraph>
        )}
      </RTKComponent>
      <Title level={2}>Courses Taken By You</Title>
      <RTKComponent isError={isCourseError} isFetching={isCourseFetching}>
        <Row align="stretch" gutter={[16, 16]}>
          {!isEmpty(data?.takenCourse) ? (
            data?.takenCourse.map((course) => (
              <Col key={course.name} lg={8} md={12} sm={24} xl={6} xs={24}>
                <Card
                  style={{
                    alignSelf: "stretch",
                    height: "100%",
                    justifySelf: "stretch",
                  }}
                >
                  <Space direction="vertical">
                    <Title level={3}>
                      <StyledLink href={`/course/${course.code}`}>
                        {course.name}
                      </StyledLink>
                    </Title>

                    {renderButton(course)}

                    {renderUserReview(course)}

                    {/* <CourseAvailability
                  unparsedAvailability={course.availability}
                /> */}
                  </Space>
                </Card>
              </Col>
            ))
          ) : (
            <Paragraph>No courses registered!</Paragraph>
          )}
        </Row>
      </RTKComponent>
      <ReviewModal
        course={course}
        review={reviewData}
        show={showReview}
        type={reviewType}
        onCancel={() => setShowReview(false)}
      />
    </Layout>
  );
};

export default ProfilePage;
