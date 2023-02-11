import { Card, Typography } from "antd";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";

import CourseAvailability from "@components/CourseAvailability";
import Layout from "@components/Layout";
import RTKComponent from "@components/RTKComponent";
import { StyledLink } from "@components/StyledComponents";
import { useGetTakenCourseQuery } from "@features/profile/profileApi";
import { useSelector } from "@utils/hooks";

const ProfilePage = () => {
  const { Title, Paragraph } = Typography;

  const { username } = useSelector((state) => state.auth);

  const router = useRouter();

  if (!username) router.push("/");

  const { data, isError, isFetching } = useGetTakenCourseQuery(username);

  return (
    <Layout>
      <Title>Profile</Title>
      <RTKComponent isError={isError} isFetching={isFetching}>
        {!isEmpty(data?.takenCourse) ? (
          data?.takenCourse.map((course: any) => (
            <Card>
              <Title level={3}>
                <StyledLink href={`/course/${course.code}`}>
                  {course.name}
                </StyledLink>
              </Title>

              <CourseAvailability unparsedAvailability={course.availability} />
            </Card>
          ))
        ) : (
          <Paragraph>No courses registered!</Paragraph>
        )}
      </RTKComponent>
    </Layout>
  );
};

export default ProfilePage;
