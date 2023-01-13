import { Typography, Row, Col, Card, Button, Spin } from "antd";
import get from "lodash/get";
import parseInt from "lodash/parseInt";
import { NextPage } from "next";
import { useRouter } from "next/router";

import Layout from "@components/Layout";
import SearchCourse from "@components/SearchCourse";
import { StyledLink } from "@components/StyledComponents";
import type { CourseWithRating } from "@constants/types";
import { useGetCoursesQuery } from "@features/course/courseApi";

const CoursesPage: NextPage = () => {
  const { Text } = Typography;
  const { Meta } = Card;

  const router = useRouter();
  const page = parseInt(get(router.query, "page", "1") as string);
  const filter = get(router.query, "filter", "") as string;

  // TODO, move to a const file
  const limit = 5;
  const offset = (page - 1) * limit;

  const { data, isFetching } = useGetCoursesQuery({ filter, limit, offset });

  const courses: CourseWithRating[] = data?.results;

  return (
    <Layout>
      <Text>Courses</Text>

      <SearchCourse />

      {isFetching ? (
        <Spin size="large" />
      ) : (
        <>
          <Text>{data?.count}</Text>
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

          <Row gutter={[16, 16]}>
            {courses.map((item, index) => (
              <Col key={index} lg={8} md={12} sm={24} xl={6} xs={24}>
                <Card>
                  <Meta
                    description={<Text ellipsis>{item.title}</Text>}
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
        </>
      )}
    </Layout>
  );
};

export default CoursesPage;
