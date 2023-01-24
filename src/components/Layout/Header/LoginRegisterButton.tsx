import React from "react";

import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space } from "antd";
import useTranslation from "next-translate/useTranslation";
// import { useRouter } from "next/router";

// import { StyledLink } from "@components/StyledComponents";
// import { LabelValue } from "@constants/types";
// import { logOut } from "@features/auth/authSlice";
import { useSelector } from "@utils/hooks";
import locales from "@utils/locales";
// import { info } from "@utils/notification";

interface LoginRegisterButtonProps {
  handleLoginClick: () => void;
  handleRegisterClick: () => void;
  direction?: "horizontal" | "vertical";
}

const LoginRegisterButton = ({
  handleLoginClick,
  handleRegisterClick,
  direction,
}: LoginRegisterButtonProps) => {
  const { t, lang } = useTranslation("common");
  const { username } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // const router = useRouter();

  // const items: MenuProps["items"] = locales.map((locale: LabelValue) =>
  //   locale.value === lang || locale.value === "default"
  //     ? null
  //     : {
  //         key: locale.value,
  //         label: (
  //           <StyledLink
  //             href={router.asPath}
  //             lang={locale.value}
  //             locale={locale.value}
  //           >
  //             {locale.label}
  //           </StyledLink>
  //         ),
  //       },
  // );

  const items: MenuProps["items"] = [
    { key: "1", label: <h1>hi</h1> },
    { type: "divider" },
    { key: "2", label: <h1>hi</h1> },
    { type: "divider" },
    {
      key: "3",
      label: (
        <Button type="ghost" onClick={handleLoginClick}>
          hi
        </Button>
      ),
    },
  ];

  return username ? (
    // <Button
    //   type="primary"
    //   onClick={() => {
    //     info(t`notification.info`, t`notification.message.loggedOut`);
    //     dispatch(logOut());
    //   }}
    // >
    //   {t`nav.logout`}
    // </Button>
    <Dropdown menu={{ items }}>
      <Button>
        <Space>
          {locales.find((locale) => locale.value === lang)?.label}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  ) : (
    <Space direction={direction}>
      <Button type="primary" onClick={handleLoginClick}>
        {t`nav.login`}
      </Button>
      <Button onClick={handleRegisterClick}>{t`nav.register`}</Button>
    </Space>
  );
};

LoginRegisterButton.defaultProps = {
  direction: "horizontal",
};

export default LoginRegisterButton;
