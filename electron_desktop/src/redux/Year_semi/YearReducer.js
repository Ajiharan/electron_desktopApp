import {
  ADD_YEAR_SEMISTER_FAILURE,
  ADD_YEAR_SEMISTER_SUCCESS,
  ADD_YEAR_SEMISTER_REQUEST,
  GET_YEAR_SEMISTER_FAILURE,
  GET_YEAR_SEMISTER_REQUEST,
  GET_YEAR_SEMISTER_SUCCESS,
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

const get_year_semiReducer = (
  state = { loading: true, year_semi: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_YEAR_SEMISTER_REQUEST:
      return { ...state, loading: true };
    case GET_YEAR_SEMISTER_SUCCESS:
      return { ...state, loading: false, year_semi: action.payload, error: "" };
    case GET_YEAR_SEMISTER_FAILURE:
      return { ...state, loading: false, error: action.error, year_semi: {} };
    default:
      return state;
  }
};

export { year_semiReducer, get_year_semiReducer };
