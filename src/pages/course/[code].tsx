import { Button, Card, Col, Rate, Space, Typography } from "antd";
import { concat } from "lodash";
import find from "lodash/find";
import isEmpty from "lodash/isEmpty";
import isUndefined from "lodash/isUndefined";
import { GetServerSideProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import Breadcrumb from "@components/Breadcrumb";
import CourseAvailability from "@components/CourseAvailability";
import Layout from "@components/Layout";
import RTKComponent from "@components/RTKComponent";
import { StyledLink, StyledSpace } from "@components/StyledComponents";
import { CourseWithReview } from "@constants/types";
import { setAuth } from "@features/auth/authSlice";
import {
  useGetCourseQuery,
  useGetCBFRecommendationsQuery,
} from "@features/course/courseApi";
import { setLoginModalVisibility } from "@features/misc/modalVisibilitySlice";
import { useUpdateTakenCourseMutation } from "@features/profile/profileApi";
import { useSelector } from "@utils/hooks";
import { success } from "@utils/notification";

interface CourseSlugProps {
  code: string;
}

const CourseSlugPage: NextPage<CourseSlugProps> = ({ code }) => {
  const { Title, Text, Paragraph } = Typography;

  const router = useRouter();
  const dispatch = useDispatch();

  const { username, takenCourse } = useSelector((state) => state.auth);

  const [updateTakenCourse] = useUpdateTakenCourseMutation();
  const { t } = useTranslation("common");
  // const [errMsg, setErrMsg] = useState<string>("");

  const getTakenCourseCodes = () =>
    takenCourse.map((course: any) => course.code);

  const {
    data: course,
    isError,
    isFetching,
  }: {
    data?: CourseWithReview;
    isError: boolean;
    isFetching: boolean;
  } = useGetCourseQuery(code);

  const handleSubmit = async () => {
    const newTakenCourseCodes = concat(getTakenCourseCodes(), course?.code);

    try {
      const res = await updateTakenCourse({
        takenCourse: newTakenCourseCodes,
        username,
      }).unwrap();
      dispatch(setAuth(res));
      success(
        t`notification.success`,
        t`notification.message.updatedTakenCourse`,
      );
      router.reload();
    } catch (err: any) {
      // if (!err?.data) {
      //   setErrMsg("No server response");
      // } else if (err?.status === 400) {
      //   setErrMsg(err.data.detail);
      // } else if (err?.status === 401) {
      //   setErrMsg(err.data.detail);
      // } else {
      //   setErrMsg("Login Failed");
      // }
    }
  };

  const { data: courseRecs } = useGetCBFRecommendationsQuery(code);

  const getIsTaken = () =>
    !isUndefined(find(getTakenCourseCodes(), (code) => code === course?.code));

  const isTaken = getIsTaken();

  const breadcrumbItems = [
    { href: "/courses", text: t`nav.courses` },
    { href: `/course/${code}`, text: code },
  ];

  const handleLogin = () => dispatch(setLoginModalVisibility(true));

  return (
    <Layout>
      <Breadcrumb items={breadcrumbItems} />

      <RTKComponent isError={isError} isFetching={isFetching}>
        <Title level={1}>{course?.name}</Title>

        <Button
          disabled={isTaken}
          onClick={username ? handleSubmit : handleLogin}
        >
          {isTaken ? "Already taken" : "Take course"}
        </Button>

        <Card>
          <Title>Reviews</Title>
          {!isEmpty(course?.reviews) ? (
            <StyledSpace direction="vertical">
              {course?.reviews.map((review) => (
                <Card key={review.user.username}>
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
              ))}
            </StyledSpace>
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
                <Paragraph key={prerequisite}>{prerequisite}</Paragraph>
              ))
            ) : (
              <Paragraph>None</Paragraph>
            )}
          </Card>
        </Col>
        <Title level={2}>Similar Courses</Title>
        {courseRecs?.map((course: CourseWithReview) => (
          <StyledLink href={`/course/${course.code}`} key={course.code}>
            {course.name}
          </StyledLink>
        ))}

        <Title level={2}>Description</Title>
        <Paragraph>{course?.description}</Paragraph>
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
