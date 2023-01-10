import apiSlice from "@features/apiSlice";
import authReducer from "@features/auth/authSlice";
import courseReducer from "@features/course/courseSlice";
import userAgreementReducer from "@features/userAgreement/userAgreementSlice";

const reducers = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  course: courseReducer,
  userAgreement: userAgreementReducer,
};

export default reducers;
