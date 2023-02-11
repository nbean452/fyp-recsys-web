import { Typography } from "antd";
import { useRouter } from "next/router";

import Layout from "@components/Layout";
import { useSelector } from "@utils/hooks";

const ProfileCoursesPage = () => {
  const { Title, Text } = Typography;

  const { username } = useSelector((state) => state.auth);

  const router = useRouter();

  if (!username) router.push("/");
  return (
    <Layout>
      <Title>Profile Courses</Title>
      <Text>Content</Text>
    </Layout>
  );
};

// should be dynamic!

export default ProfileCoursesPage;
