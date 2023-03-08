import { Button, Col, Row, Typography } from "antd";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";

import HighlightText from "@components/HighlightText";
import Image from "@components/Image";
import Layout from "@components/Layout";
import {
  StyledContainer,
  StyledLink,
  StyledText,
  StyledTitle,
} from "@components/StyledComponents";
import { TextsType } from "@constants/types";
import { getImg } from "@utils/getImg";

interface StyledRowProps {
  reversed?: boolean;
}

interface StyledColProps {
  grid: "image" | "text";
}

const StyledRow = styled(Row)<StyledRowProps>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: ${({ reversed }) =>
    reversed ? '"image text"' : '"text image"'};
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "image"
      "text";
  }
`;

const StyledCol = styled(Col)<StyledColProps>`
  grid-area: ${({ grid }) => grid};
`;

const HomePage: NextPage = () => {
  const { t } = useTranslation("home");
  const texts: TextsType[] = t("heading", {}, { returnObjects: true });

  const { Text, Title } = Typography;

  return (
    <Layout>
      <StyledContainer flexDirection="column" style={{ margin: "10%" }}>
        <StyledTitle align="center" fontSize="60px">
          <HighlightText texts={texts} />
        </StyledTitle>
        <StyledText align="center">{t`subheading`}</StyledText>
        <StyledContainer>
          <StyledLink href="/courses">
            <Button type="primary">{t`getStarted`}</Button>
          </StyledLink>
          <StyledLink href="/docs">
            <Button>{t`docs`}</Button>
          </StyledLink>
        </StyledContainer>
      </StyledContainer>

      <StyledRow gutter={[16, 16]} reversed>
        <StyledCol grid="text">
          <Title level={2}>
            Gone Are The Days of Searching the Web for Computing Courses
          </Title>
          <Text>
            I, as the project maker did not like the hassle of finding similar
            courses to what I have taken in the past. On top of that, I was
            tired of searching each COMP department&apos;s course subject
            description files one by one just to find out that the course was
            not for you! So I made this project in hopes to help future COMP
            students to focus on programming rather than focusing on looking for
            COMP courses!
          </Text>
        </StyledCol>
        <StyledCol grid="image">
          <Image alt="item" placeholder="blur" src={getImg("confused")} />
        </StyledCol>
      </StyledRow>

      <StyledRow gutter={[16, 16]}>
        <StyledCol grid="image">
          <Image alt="item" placeholder="blur" src={getImg("placeholder")} />
        </StyledCol>
        <StyledCol grid="text">
          <Title level={2}>What makes us special?</Title>
          <Text>
            We provide recommendations using Natural Language Processing
            technique and grouped users
          </Text>
          <Title level={2}>Don&apos;t Trust Our Recommendations?</Title>
          <Text>
            If you don&apos;t want our ML generated recommendations, you can
            always take a look at the course description, semester availability
            and reviews to understand more about each course!
          </Text>
        </StyledCol>
      </StyledRow>
    </Layout>
  );
};

export default HomePage;

/**
 * 
 * Photo by <a href="https://unsplash.com/@punttim?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tim Gouw</a> on <a href="https://unsplash.com/photos/1K9T5YiZ2WU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  
 */
