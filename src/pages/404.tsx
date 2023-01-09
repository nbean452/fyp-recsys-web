import { useRouter } from "next/router";

const NotFoundPage = (): void => {
  useRouter().push("/");
};

export default NotFoundPage;
