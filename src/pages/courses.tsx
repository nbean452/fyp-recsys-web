import { useEffect } from "react";

import { Typography, Row, Col, Card } from "antd";
import { NextPage } from "next";

import Layout from "@components/Layout";
import SearchCourse from "@components/SearchCourse";
import { StyledLink } from "@components/StyledComponents";
import { useGetCoursesQuery } from "@features/course/courseApi";
import { clearCourse, setCourses } from "@features/course/courseSlice";
import { useDispatch, useSelector } from "@utils/hooks";

const CoursesPage: NextPage = () => {
  const { Text } = Typography;
  const { Meta } = Card;

  const dispatch = useDispatch();

  const { courses } = useSelector((state) => state.course);

  const { data, isSuccess } = useGetCoursesQuery({});

  useEffect(() => {
    if (data?.results)
      dispatch(setCourses({ courses: data.results, totalCourses: data.count }));
    return () => {
      dispatch(clearCourse());
    };
  }, [dispatch, data]);
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
