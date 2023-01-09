import { useEffect, useState } from "react";

import { AutoComplete, Input } from "antd";
import useTranslation from "next-translate/useTranslation";

import { LabelValue } from "@constants/types";
import { clearSearch, setSearch } from "@redux/slices/courseSlice";
import { useDispatch, useSelector } from "@utils/hooks";

const SearchCourse = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.course);
  const { t } = useTranslation("common");
  const { Search } = Input;

  const [options, setOptions] = useState<LabelValue[]>([]);

  useEffect(() => {
    return () => {
      dispatch(clearSearch());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AutoComplete
      options={options}
      style={{
        alignItems: "center",
        display: "flex",
        height: "100%",
        width: "200px",
      }}
      value={search}
      onChange={(value) => {
        dispatch(setSearch(value));
        setOptions(
          value === ""
            ? []
            : [
                { label: `${value}@mail.com`, value: `${value}@mail.com` },
                { label: `${value}@yahoo.com`, value: `${value}@yahoo.com` },
                { label: `${value}@gmail.com`, value: `${value}@gmail.com` },
              ],
        );
      }}
      onClear={() => dispatch(clearSearch())}
    >
      <Search
        placeholder={t`nav.search`}
        style={{
          height: "100%",
          width: "200px",
        }}
      />
    </AutoComplete>
  );
};

export default SearchCourse;
