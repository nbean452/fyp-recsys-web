import { Spin, Typography } from "antd";

import { StyledSpace } from "@components/StyledComponents";

interface RTKComponentType {
  isError: boolean;
  isFetching: boolean;
  children: JSX.Element | JSX.Element[];
}

const RTKComponent = ({
  isError,
  isFetching,
  children,
}: RTKComponentType): JSX.Element => {
  const { Text } = Typography;

  if (isFetching) return <Spin size="large" />;
  if (isError) return <Text>Error!</Text>;
  return <StyledSpace direction="vertical">{children}</StyledSpace>;
};

export default RTKComponent;
