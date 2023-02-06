import { UpOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Button } from "antd";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import type { LabelValue } from "@constants/types";
import locales from "@utils/locales";

import { StyledLink } from "./StyledComponents";

const LocaleSwitcher = () => {
  const { lang } = useTranslation("common");
  const router = useRouter();

  const items: MenuProps["items"] = locales.map((locale: LabelValue) =>
    locale.value === lang || locale.value === "default"
      ? null
      : {
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
        },
  );

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button>
        <Space>
          {locales.find((locale) => locale.value === lang)?.label}
          <UpOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default LocaleSwitcher;
