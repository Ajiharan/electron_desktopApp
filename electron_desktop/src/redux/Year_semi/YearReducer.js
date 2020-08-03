import {
  ADD_YEAR_SEMISTER_FAILURE,
  ADD_YEAR_SEMISTER_SUCCESS,
  ADD_YEAR_SEMISTER_REQUEST,
} from "./yearType";

const initialState = {
  loading: true,
  year_semi: {},
  error: "",
};

const year_semiReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_YEAR_SEMISTER_REQUEST:
      return { ...state, loading: true };
    case ADD_YEAR_SEMISTER_SUCCESS:
      return { ...state, loading: false, year_semi: action.payload, error: "" };
    case ADD_YEAR_SEMISTER_FAILURE:
      return { ...state, loading: false, error: action.error, year_semi: {} };
    default:
      return state;
  }
};

export default year_semiReducer;
