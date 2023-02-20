import { useState } from "react";

import { Button, Card, Rate, Space, Typography } from "antd";
import { find } from "lodash";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";

import CourseAvailability from "@components/CourseAvailability";
import Layout from "@components/Layout";
import ReviewModal from "@components/ReviewModal";
import RTKComponent from "@components/RTKComponent";
import { StyledLink } from "@components/StyledComponents";
import { CourseWithReview, ReviewWithUser } from "@constants/types";
import { useGetTakenCourseQuery } from "@features/profile/profileApi";
import { useSelector } from "@utils/hooks";

const ProfilePage = () => {
  const { Title, Paragraph, Text } = Typography;

  const { username } = useSelector((state) => state.auth);

  const router = useRouter();

  if (!username) router.push("/");

  const { data, isError, isFetching } = useGetTakenCourseQuery(username);

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
      <Text>No Review </Text>
    );
  };

  return (
    <Layout>
      <Title>Profile</Title>
      <RTKComponent isError={isError} isFetching={isFetching}>
        {!isEmpty(data?.takenCourse) ? (
          data?.takenCourse.map((course: CourseWithReview) => (
            <Card key={course.name}>
              <Space direction="vertical">
                <Title level={3}>
                  <StyledLink href={`/course/${course.code}`}>
                    {course.name}
                  </StyledLink>
                </Title>

                {renderButton(course)}

                {renderUserReview(course)}

                <CourseAvailability
                  unparsedAvailability={course.availability}
                />
              </Space>
            </Card>
          ))
        ) : (
          <Paragraph>No courses registered!</Paragraph>
        )}
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
