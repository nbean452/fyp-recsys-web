import searchSliceReducer from "./slices/searchSlice";
import userAgreementReducer from "./slices/userAgreementSlice";

const reducers = {
  courseSearch: searchSliceReducer,
  userAgreement: userAgreementReducer,
};

export default reducers;
