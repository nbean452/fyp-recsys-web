import { useState } from "react";

import { AutoComplete, Input } from "antd";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import { BaseCourse, LabelValue } from "@constants/types";
import { useGetCoursesQuery } from "@features/course/courseApi";

const SearchCourse = () => {
  const { t } = useTranslation("common");
  const { Search } = Input;

  const router = useRouter();
  const [search, setSearch] = useState<string>(router.query.filter as string);
  const { data } = useGetCoursesQuery({ filter: search, limit: 25, offset: 0 });
  const courses: BaseCourse[] = data?.results;

  const [options, setOptions] = useState<LabelValue[]>([]);

  const handleSearchSelect = (value: string) => {
    setSearch(value);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, filter: value },
    });
  };

  const handleChange = (value: string) => {
    setSearch(value);
    setOptions(
      value === ""
        ? []
        : courses.map((course) => ({
            label: course.name,
            value: course.name,
          })),
    );
  };

  return (
    <AutoComplete
      options={options}
      style={{
        alignItems: "center",
        display: "flex",
        height: "100%",
        width: "500px",
      }}
      value={search}
      onChange={handleChange}
      onClear={() => setSearch("")}
      onSelect={handleSearchSelect}
    >
      <Search
        placeholder={t`nav.search`}
        style={{
          height: "100%",
          width: "500px",
        }}
        onSearch={handleSearchSelect}
      />
    </AutoComplete>
  );
};

export default SearchCourse;
