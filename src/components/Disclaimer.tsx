import { Button, Modal, Typography } from "antd";
import useTranslation from "next-translate/useTranslation";

import { setUserAgreement } from "@features/misc/userAgreementSlice";
import { useDispatch, useSelector } from "@utils/hooks";

const Disclaimer = () => {
  const { agreed } = useSelector((state) => state.userAgreement);
  const { t } = useTranslation("common");
  const { Text } = Typography;

  const dispatch = useDispatch();
  const handleOk = () => dispatch(setUserAgreement(true));
  return (
    <Modal
      cancelButtonProps={{ disabled: true }}
      closable={false}
      footer={
        <Button type="primary" onClick={handleOk}>
          OK
        </Button>
      }
      open={!agreed}
      title={t`disclaimer.title`}
    >
      <Text>{t`disclaimer.text`}</Text>
    </Modal>
  );
};

export default Disclaimer;
