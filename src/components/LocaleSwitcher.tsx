import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Button } from "antd";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import locales, { LocaleType } from "@utils/locales";

import { StyledLink } from "./StyledComponents";

const LocaleSwitcher = () => {
  const { t, lang } = useTranslation("common");
  const router = useRouter();

  const items: MenuProps["items"] = locales.map((locale: LocaleType) => {
    if (locale.value === lang || locale.value === "default") return null;
    return {
      key: locale.value,
      label: (
        <StyledLink
          href={router.asPath}
          lang={locale.value}
          locale={locale.value}
        >
          {locale.label}
        </StyledLink>
      ),
    };
  });

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button>
        <Space>
          {t`common`}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default LocaleSwitcher;
