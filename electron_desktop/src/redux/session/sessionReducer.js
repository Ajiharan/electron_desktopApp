import {
  ADD_SESSION_FAILURE,
  ADD_SESSION_REQUEST,
  ADD_SESSION_SUCCESS,
  GET_SESSION_FAILURE,
  GET_SESSION_REQUEST,
  GET_SESSION_SUCCESS, UPDATE_SESSION_FAILURE, UPDATE_SESSION_REQUEST, UPDATE_SESSION_SUCCESS,
} from "./sessionType";

const session_addReducer = (
  state = { loading: true, session: {}, error: "" },
  action
) => {
  switch (action.type) {
    case ADD_SESSION_REQUEST:
      return { ...state, loading: true };
    case ADD_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        session: action.payload,
        error: "",
      };
    case ADD_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        session: {},
        error: action.error,
      };
    default:
      return state;
  }
};

const update_session_Reducer = (
    state = { loading: true, message: "", error: "" },
    action
) => {
  switch (action.type) {
    case UPDATE_SESSION_REQUEST:
      return { ...state, loading: true };
    case UPDATE_SESSION_SUCCESS:
      return { ...state, loading: false, message: action.message, error: "" };
    case UPDATE_SESSION_FAILURE:
      return { ...state, loading: false, message: "", error: action.error };
    default:
      return state;
  }
};

const get_session = (
    state = { loading: true, session: [], error: "" },
    action
) => {
  switch (action.type) {
    case GET_SESSION_REQUEST:
      return { ...state, loading: true };
    case GET_SESSION_SUCCESS:
      return { ...state, loading: false, session: action.payload, error: "" };
    case GET_SESSION_FAILURE:
      return { ...state, loading: false, error: action.error, session: {} };
    default:
      return state;
  }
};
export { session_addReducer, get_session ,update_session_Reducer};
