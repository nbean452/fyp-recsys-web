import { useEffect, useState } from "react";

import { Typography, Row, Col, Card, Button } from "antd";
import { includes } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";

import Layout from "@components/Layout";
import RTKComponent from "@components/RTKComponent";
import SearchCourse from "@components/SearchCourse";
import { StyledLink } from "@components/StyledComponents";
import type { CourseWithRating } from "@constants/types";
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

  const courses: CourseWithRating[] = data?.results;

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // console.log(`App is changing to ${url} `);
      if (includes(url, "/course/")) setLoading(true);
    };

    // const handleRouteComplete = (url: string) => {
    //   console.log(`App changed to ${url} `);

    //   setLoading(false);
    // };

    router.events.on("routeChangeStart", handleRouteChange);
    // router.events.on("routeChangeComplete", handleRouteComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      // router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, [router.events]);

  if (loading) {
    return <h1>redirecting and building...</h1>;
  }

  return (
    <Layout>
      <Text>Courses</Text>

      <SearchCourse />

      <RTKComponent isError={isError} isFetching={isFetching}>
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
      </RTKComponent>
    </Layout>
  );
};

export default CoursesPage;
