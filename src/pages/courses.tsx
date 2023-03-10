import { Typography, Row, Col, Card, Button, Space } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";

import Layout from "@components/Layout";
import RTKComponent from "@components/RTKComponent";
import SearchCourse from "@components/SearchCourse";
import { StyledLink } from "@components/StyledComponents";
import type { CourseWithReview } from "@constants/types";
import { useGetCoursesQuery } from "@features/course/courseApi";
import { useGetQueryParams } from "@utils/hooks";

const CoursesPage: NextPage = () => {
  const { Text } = Typography;
  const { Meta } = Card;

  const router = useRouter();

  const { filter, limit, page } = useGetQueryParams();

  const offset = (page - 1) * limit;

  const { data, isFetching, isError } = useGetCoursesQuery({
    filter,
    limit,
    offset,
  });

  const courses: CourseWithReview[] = data?.results;

  return (
    <Layout>
      <Text>Courses</Text>

      <SearchCourse />

      <RTKComponent isError={isError} isFetching={isFetching}>
        <Text>
          Showing {offset + 1} -{" "}
          {limit * page > data?.count ? data?.count : limit * page} courses from
          a total of {data?.count} {data?.count > 1 ? "courses" : "course"}
        </Text>

        <Row gutter={[16, 16]}>
          {courses?.map((course) => (
            <Col key={course.name} lg={8} md={12} sm={24} xl={6} xs={24}>
              <Card>
                <Meta
                  description={<Text ellipsis>{course.title}</Text>}
                  title={
                    <StyledLink href={`/course/${course.code}`}>
                      {course.code}
                    </StyledLink>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Space>
          <Button
            disabled={page <= 1}
            onClick={() =>
              router.push({
                pathname: router.pathname,
                query: { ...router.query, page: `${page - 1}` },
              })
            }
          >
            Previous
          </Button>
          <Button
            disabled={data ? page >= Math.ceil(data.count / limit) : true}
            onClick={() =>
              router.push({
                pathname: router.pathname,
                query: { ...router.query, page: `${page + 1}` },
              })
            }
          >
            Next
          </Button>
        </Space>
      </RTKComponent>
    </Layout>
  );
};

export default CoursesPage;
