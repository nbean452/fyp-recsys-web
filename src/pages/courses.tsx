import { useEffect } from "react";

import { Typography, Row, Col, Card } from "antd";
import { NextPage } from "next";

import Layout from "@components/Layout";
import SearchCourse from "@components/SearchCourse";
import { StyledLink } from "@components/StyledComponents";
import {
  clearCourse,
  setCourses as reduxSetCourses,
} from "@features/course/courseSlice";
import { useDispatch, useSelector } from "@utils/hooks";
import request from "@utils/request";

const CoursesPage: NextPage = () => {
  const { Text } = Typography;
  const { Meta } = Card;

  const dispatch = useDispatch();

  const { courses, isLoading } = useSelector((state) => state.course);

  useEffect(() => {
    const handleFinish = (res: any) =>
      dispatch(reduxSetCourses(res.body.results));
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjczMzQyNjEwLCJpYXQiOjE2NzMzMzk2MTAsImp0aSI6IjcwMWI2ZDAyMTQzMDQwZTRiOGU1N2JiNDhjYjQ0ZGE1IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJuaWNiMTEyIiwiaXNfc3RhZmYiOnRydWV9.1IHVRNk1Z8obQcwiH43Q3cAXxWa4_Mdgk4G7h5KbuMQ";

    request("get", "courses/", token, handleFinish);
    return () => {
      dispatch(clearCourse());
    };
  }, [dispatch]);
  return (
    <Layout>
      <Text>Courses</Text>

      <SearchCourse />

      <Row gutter={[16, 16]}>
        {isLoading &&
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
