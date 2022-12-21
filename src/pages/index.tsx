import { useState } from "react";

import { AutoComplete, Card, Col, Input, Row, Typography } from "antd";
import isMobile from "is-mobile";
import { kebabCase } from "lodash";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

import Image from "@components/Image";
import Layout from "@components/Layout";
import { StyledLink } from "@components/StyledComponents";
import { clearSearch, setSearch } from "@redux/slices/searchSlice";
import { useDispatch, useSelector } from "@utils/hooks";

const HomePage: NextPage = () => {
  const { t } = useTranslation("home");
  const tCommon = useTranslation("common").t;

  const { search } = useSelector((state) => state.courseSearch);
  const dispatch = useDispatch();
  const { Search } = Input;

  const { Meta } = Card;
  const { Text, Title } = Typography;

  // placeholder
  const courses = [
    {
      course: {
        code: "CS 115",
        name: "Introduction to Computer Science 1",
      },
      imageURL: "https://source.unsplash.com/random/1440x700/?city,night",
    },
    {
      course: {
        code: "MATH 135",
        name: "Algebra for Honours Mathematics",
      },
      imageURL: "https://source.unsplash.com/random/1440x700/?city",
    },
    {
      course: {
        code: "MATH 137",
        name: "Calculus 1 for Honours Mathematics",
      },
      imageURL: "https://source.unsplash.com/random/1440x700/?night",
    },
    {
      course: {
        code: "CS 135",
        name: "Designing Functional Programs",
      },
      imageURL: "https://source.unsplash.com/random/1440x700/?forest",
    },
    {
      course: {
        code: "STAT 230",
        name: "Probability",
      },
      imageURL: "https://source.unsplash.com/random/1440x700/?fruit",
    },
    {
      course: {
        code: "CS 240",
        name: "Data Structures and Data Management",
      },
      imageURL: "https://source.unsplash.com/random/1440x700/?canyon",
    },
  ];

  // placeholder
  const [options, setOptions] = useState([
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ]);

  return (
    <Layout>
      <AutoComplete
        options={options}
        style={{
          alignItems: "center",
          display: "flex",
          height: "100%",
          width: isMobile() ? "100%" : "500px",
        }}
        value={search}
        onChange={(value) => {
          dispatch(setSearch(value));

          setOptions([
            { label: `${value}@mail.com`, value: `${value}@mail.com` },
            { label: `${value}@yahoo.com`, value: `${value}@yahoo.com` },
            { label: `${value}@gmail.com`, value: `${value}@gmail.com` },
          ]);
        }}
        onClear={() => dispatch(clearSearch())}
      >
        <Search
          placeholder={tCommon`nav.search`}
          style={{
            height: "100%",
            width: isMobile() ? "100%" : "500px",
          }}
        />
      </AutoComplete>
      <Title>{t`heading`}</Title>
      <Text>{t`subheading`}</Text>

      <Row gutter={[16, 16]}>
        {courses.map((item, index) => (
          <Col key={index} lg={8} md={12} sm={24} xl={6}>
            <StyledLink href={`/course/${kebabCase(item.course.code)}`}>
              <Card
                cover={
                  <Image
                    alt={item.course.name}
                    height={100}
                    src={item.imageURL}
                    width={200}
                    priority
                  />
                }
                hoverable
              >
                <Meta
                  description={<Text ellipsis>{item.course.name}</Text>}
                  title={item.course.code}
                />
              </Card>
            </StyledLink>
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default HomePage;
