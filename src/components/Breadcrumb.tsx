import { Breadcrumb as AntdBreadcrumb } from "antd";

import { StyledLink } from "@components/StyledComponents";

interface BreadcrumbProps {
  items: {
    href: string;
    text: string | number;
  }[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <AntdBreadcrumb>
      {items.map((item) => (
        <AntdBreadcrumb.Item>
          <StyledLink href={item.href}>{item.text}</StyledLink>
        </AntdBreadcrumb.Item>
      ))}
    </AntdBreadcrumb>
  );
};

export default Breadcrumb;
