import authReducer from "./slices/authSlice";
import courseReducer from "./slices/courseSlice";
import userAgreementReducer from "./slices/userAgreementSlice";

const reducers = {
  auth: authReducer,
  course: courseReducer,
  userAgreement: userAgreementReducer,
};

export default reducers;
