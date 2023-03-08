import apiSlice from "@features/apiSlice";
import authReducer from "@features/auth/authSlice";
import modalVisibilityReducer from "@features/misc/modalVisibilitySlice";
import userAgreementReducer from "@features/misc/userAgreementSlice";

const reducers = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  modalVisibility: modalVisibilityReducer,
  userAgreement: userAgreementReducer,
};

export default reducers;
