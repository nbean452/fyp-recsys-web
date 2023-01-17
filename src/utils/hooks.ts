import get from "lodash/get";
import isUndefined from "lodash/isUndefined";
import qs from "qs";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";

import DEFAULT_PAGINATION_CONFIG from "@constants/pagination";
import type { RootState, AppDispatch } from "@features/configureStore";

interface UndefinedQueries {
  filter?: string;
  page?: string;
  limit?: string;
}

interface DefinedQueries {
  filter: string;
  page: number;
  limit: number;
}

export const useGetQueryParams = () => {
  const search = get(window.location, "search", "");
  const undefinedQueries: UndefinedQueries = qs.parse(search.substring(1));

  const { filter, page, limit } = undefinedQueries;

  const queries = {};

  if (!isUndefined(filter))
    Object.assign(queries, { filter: undefinedQueries.filter });
  else Object.assign(queries, { filter: "" });

  if (!isUndefined(page))
    Object.assign(queries, { page: Number(undefinedQueries.page) });
  else Object.assign(queries, { page: 1 });

  if (!isUndefined(limit))
    Object.assign(queries, { limit: Number(undefinedQueries.limit) });
  else
    Object.assign(queries, {
      limit: DEFAULT_PAGINATION_CONFIG.defaultPageSize,
    });

  return queries as DefinedQueries;
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch: () => AppDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
