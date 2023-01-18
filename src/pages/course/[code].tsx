import { Typography } from "antd";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

import Breadcrumb from "@components/Breadcrumb";
import Layout from "@components/Layout";
import RTKComponent from "@components/RTKComponent";
import { CourseWithRating } from "@constants/types";
import { useGetCourseQuery } from "@features/course/courseApi";

interface CourseSlugProps {
  code: string;
}

const CourseSlugPage: NextPage<CourseSlugProps> = ({ code }) => {
  const { Title, Paragraph } = Typography;

  const { data: course, isError, isFetching } = useGetCourseQuery(code);

  const { t } = useTranslation("common");

  const breadcrumbItems = [
    { href: "/", text: t`nav.home` },
    { href: `/course/${code}`, text: code },
  ];

  return (
    <Layout>
      <Breadcrumb items={breadcrumbItems} />

      <RTKComponent isError={isError} isFetching={isFetching}>
        <Title level={3}>{course?.name}</Title>
        <Paragraph>{course?.description}</Paragraph>
      </RTKComponent>
    </Layout>
  );
};

// TODO: improve this! maybe make hook for this
// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   // const { data: course, isError, isFetching } = useGetCourseQuery(query.code);
//   console.log("query:", query);
//   return {
//     props: { code: query.code },
//   };
// };

export const getStaticPaths: GetStaticPaths = async () => {
  const url =
    process.env.NODE_ENV === "production"
      ? (process.env.NEXT_PUBLIC_PROD_URL as string)
      : (process.env.NEXT_PUBLIC_DEV_URL as string);

  const res = await fetch(`${url}/courses/?limit=1000&page=0`);
  const data = await res.json();

  // Get the paths we want to pre-render based on posts
  // const paths = posts.map((post) => ({
  //   params: { id: post.id },
  // }));
  // console.log("data.results:", data.results);

  const courses: CourseWithRating[] = data.results;
  // const json = courses;

  // console.log("json:", json);
  // console.log("courses:", courses);

  const paths = courses.map((course) => ({ params: { code: course.code } }));

  return {
    fallback: false, // can also be true or 'blocking'
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { code } = params as { code: string };
  return {
    // Passed to the page component as props
    props: { code },
  };
};

export default CourseSlugPage;
