import { useEffect, useState } from "react";

import { Typography, Row, Col, Card } from "antd";
import { NextPage } from "next";
import superagent from "superagent";

import Layout from "@components/Layout";
import SearchCourse from "@components/SearchCourse";
import { StyledLink } from "@components/StyledComponents";
import type { CourseWithRating } from "@constants/types";

const CoursesPage: NextPage = () => {
  const { Text } = Typography;
  const { Meta } = Card;

  const [courses, setCourses] = useState<Array<CourseWithRating>>([]);

  // superagent
  //   .post("/api/pet")
  //   .send({ name: "Manny", species: "cat" }) // sends a JSON post body
  //   .set("X-API-Key", "foobar")
  //   .set("accept", "json")
  //   .end((err, res) => {
  //     // Calling the end function will send the request
  //   });

  useEffect(() => {
    // fetch("http://localhost:9000/courses")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((json: Array<Course>) => {
    //     setCourses(json);
    //   });
    superagent.get("http://localhost:9000/courses").end((err, res) => {
      console.log("res.body:", res.body.results);
      setCourses(res.body.results);
    });
  }, []);
  return (
    <Layout>
      <Text>Courses</Text>

      <SearchCourse />

      <Row gutter={[16, 16]}>
        {courses.map((item, index) => (
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
