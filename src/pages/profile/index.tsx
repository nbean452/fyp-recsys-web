import { Typography } from "antd";
import { useRouter } from "next/router";

import Layout from "@components/Layout";
import { useSelector } from "@utils/hooks";

const ProfilePage = () => {
  const { Title, Text } = Typography;

  const { username } = useSelector((state) => state.auth);

  const router = useRouter();

  if (!username) router.push("/");
  else
    <Layout>
      <Title>Title</Title>
      <Text>Content</Text>
    </Layout>;
};

// should be dynamic!

export default ProfilePage;
