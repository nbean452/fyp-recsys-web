import { Typography, Row, Col, Card } from "antd";
import { NextPage } from "next";

import Layout from "@components/Layout";
import SearchCourse from "@components/SearchCourse";
import { StyledLink } from "@components/StyledComponents";
import type { CourseWithRating } from "@constants/types";
import { useGetCoursesQuery } from "@features/course/courseApi";

const CoursesPage: NextPage = () => {
  const { Text } = Typography;
  const { Meta } = Card;

  // TODO, move to a const file
  const page = 1;
  const limit = 25;
  const offset = (page - 1) * limit;

  const { data, isSuccess } = useGetCoursesQuery({ limit, offset });

  const courses: CourseWithRating[] = data?.results;

  return (
    <Layout>
      <Text>Courses</Text>

      <SearchCourse />

      <Row gutter={[16, 16]}>
        {isSuccess &&
          courses.map((item, index) => (
            <Col key={index} lg={8} md={12} sm={24} xl={6} xs={24}>
              <Card>
                <Meta
                  description={<Text ellipsis>{item.name}</Text>}
                  title={
                    <StyledLink href={`/course/${item.code}`}>
                      {item.code}
                    </StyledLink>
                  }
                />
              </Card>
            </Col>
          ))}
      </Row>
    </Layout>
  );
};

export default CoursesPage;
