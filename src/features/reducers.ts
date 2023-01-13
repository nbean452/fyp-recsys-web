import apiSlice from "@features/apiSlice";
import authReducer from "@features/auth/authSlice";
import userAgreementReducer from "@features/userAgreement/userAgreementSlice";

const reducers = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  userAgreement: userAgreementReducer,
};

export default reducers;
