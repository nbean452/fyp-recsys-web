import authReducer from "@features/auth/authSlice";
import courseReducer from "@features/course/courseSlice";
import userAgreementReducer from "@features/userAgreement/userAgreementSlice";

import apiSlice from "./api/apiSlice";

const reducers = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  course: courseReducer,
  userAgreement: userAgreementReducer,
};

export default reducers;
