import { Typography } from "antd";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import Breadcrumb from "@components/Breadcrumb";
import Layout from "@components/Layout";
import RTKComponent from "@components/RTKComponent";
import { CourseWithRating } from "@constants/types";
import { useGetCourseQuery } from "@features/course/courseApi";

interface CourseSlugProps {
  code: string;
}

const CourseSlugPage: NextPage<CourseSlugProps> = ({ code }) => {
  const router = useRouter();

  const { Title, Paragraph } = Typography;

  const { data: course, isError, isFetching } = useGetCourseQuery(code);

  const { t } = useTranslation("common");

  const breadcrumbItems = [
    { href: "/", text: t`nav.home` },
    { href: `/course/${code}`, text: code },
  ];

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

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

export const getStaticPaths: GetStaticPaths = async () => {
  const url =
    process.env.NODE_ENV === "production"
      ? (process.env.NEXT_PUBLIC_PROD_URL as string)
      : (process.env.NEXT_PUBLIC_DEV_URL as string);

  const res = await fetch(`${url}/courses/`);
  const data = await res.json();

  const courses: CourseWithRating[] = data.results;

  const paths = courses.map((course) => ({ params: { code: course.code } }));

  return {
    fallback: true,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { code } = params as { code: string };

  return {
    props: { code },
    revalidate: 5,
  };
};

export default CourseSlugPage;
