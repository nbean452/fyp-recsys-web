import { useState } from "react";

import {
  Modal,
  Typography,
  Input,
  Form,
  Button,
  Spin,
  Space,
  Rate,
} from "antd";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import {
  useUpdateReviewMutation,
  useCreateReviewMutation,
} from "@features/review/reviewApi";
import { useSelector } from "@utils/hooks";
import { success } from "@utils/notification";

interface RatingModalType {
  show: boolean;
  onCancel: any;
  course: any;
  review: any;
  type: "update" | "create";
}

const RatingModal = ({
  show,
  onCancel,
  course,
  type,
  review,
}: RatingModalType): JSX.Element => {
  const { Text } = Typography;
  const { t } = useTranslation("common");
  const [errMsg, setErrMsg] = useState<string>("");

  const { id: userId } = useSelector((state) => state.auth);

  const [updateReview, { isLoading: isUpdateLoading }] =
    useUpdateReviewMutation();
  const [createReview, { isLoading: isCreateLoading }] =
    useCreateReviewMutation();

  const router = useRouter();

  const handleSubmit = async (values: any) => {
    const { comment, rating } = values;
    try {
      if (type === "update") {
        await updateReview({
          comment,
          course: course.id,
          id: review.id,
          rating,
          user: userId,
        }).unwrap();
        success(t`notification.success`, "success update review");
      } else {
        await createReview({
          comment,
          course: course.id,
          rating,
          user: userId,
        }).unwrap();
        success(t`notification.success`, "success create review");
      }
      router.reload();
    } catch (err: any) {
      if (!err?.data) {
        setErrMsg("No server response");
      } else if (err?.status === 400) {
        setErrMsg(err.data.detail);
      } else if (err?.status === 401) {
        setErrMsg(err.data.detail);
      } else {
        setErrMsg("Review Failed");
      }
    }
  };

  return (
    <Modal
      footer={null}
      open={show}
      title={`Review ${course.code}`}
      onCancel={onCancel}
    >
      <Form
        autoComplete="off"
        initialValues={review}
        name="review"
        onFinish={handleSubmit}
      >
        {errMsg && <Text>{errMsg}</Text>}
        <Form.Item
          name="rating"
          rules={[{ message: "Please input rating!", required: true }]}
        >
          <Rate />
        </Form.Item>
        <Form.Item name="comment">
          <Input.TextArea placeholder="Comment..." />
        </Form.Item>

        <Form.Item>
          <Space align="center">
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
            {(isCreateLoading || isUpdateLoading) && <Spin />}
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RatingModal;
