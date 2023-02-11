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

import { useCreateReviewMutation } from "@features/review/reviewApi";
import { useSelector } from "@utils/hooks";
import { success } from "@utils/notification";

interface RatingModalType {
  show: boolean;
  onOk: any;
  onCancel: any;
  courseId: number;
}

const RatingModal = ({
  show,
  onOk,
  onCancel,
  courseId,
}: RatingModalType): JSX.Element => {
  const { Text } = Typography;
  const { t } = useTranslation("common");
  const [errMsg, setErrMsg] = useState<string>("");
  const { id } = useSelector((state) => state.auth);

  const [createReview, { isLoading }] = useCreateReviewMutation();
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    const { comment, rating } = values;
    try {
      await createReview({
        comment,
        course: courseId,
        rating,
        user: id,
      }).unwrap();
      success(t`notification.success`, "success give review");
      router.reload();
      onOk();
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
      title="Review"
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form autoComplete="off" name="review" onFinish={handleSubmit}>
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
            {isLoading && <Spin />}
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RatingModal;
