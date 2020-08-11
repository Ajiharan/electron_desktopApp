import {
  ADD_YEAR_SEMISTER_FAILURE,
  ADD_YEAR_SEMISTER_SUCCESS,
  ADD_YEAR_SEMISTER_REQUEST,
  GET_YEAR_SEMISTER_FAILURE,
  GET_YEAR_SEMISTER_REQUEST,
  GET_YEAR_SEMISTER_SUCCESS,
  UPDATE_YEAR_SEMISTER_REQUEST,
  UPDATE_YEAR_SEMISTER_SUCCESS,
  UPDATE_YEAR_SEMISTER_FAILURE,
  GET_ONE_YEAR_SEMISTER_REQUEST,
  GET_ONE_YEAR_SEMISTER_FAILURE,
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

const update_year_semiReducer = (
  state = { loading: true, message: "", error: "" },
  action
) => {
  switch (action.type) {
    case UPDATE_YEAR_SEMISTER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_YEAR_SEMISTER_SUCCESS:
      return { ...state, loading: false, message: action.message, error: "" };
    case UPDATE_YEAR_SEMISTER_FAILURE:
      return { ...state, loading: false, message: "", error: action.error };
    default:
      return state;
  }
};

const get_one_year_semisterReducer = (
  state = { loading: true, year_semi: {}, error: "" },
  action
) => {
  switch (action.type) {
    case GET_ONE_YEAR_SEMISTER_REQUEST:
      return { ...state, loading: true };
    case GET_YEAR_SEMISTER_SUCCESS:
      return { ...state, loading: false, year_semi: action.payload, error: "" };
    case GET_ONE_YEAR_SEMISTER_FAILURE:
      return { ...state, loading: true, year_semi: {}, error: action.error };
    default:
      return state;
  }
};

export {
  year_semiReducer,
  get_year_semiReducer,
  update_year_semiReducer,
  get_one_year_semisterReducer,
};
