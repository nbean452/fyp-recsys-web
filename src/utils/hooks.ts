import get from "lodash/get";
import { useRouter } from "next/router";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";

import type { RootState, AppDispatch } from "@features/configureStore";

export const useGetQueryParams = (
  param: string = "filter",
  defaultValue: string | number = "",
) => {
  const router = useRouter();
  return get(router.query, param, `${defaultValue}`) as string;
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch: () => AppDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
