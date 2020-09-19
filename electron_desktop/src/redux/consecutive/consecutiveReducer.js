import {
  ADD_CONSECUTIVE_SESSION_REQUEST,
  ADD_CONSECUTIVE_SESSION_SUCCESS,
  ADD_CONSECUTIVE_SESSION_FAILURE,
  GET_CONSECUTIVE_SESSION_FAILURE,
  GET_CONSECUTIVE_SESSION_REQUEST,
  GET_CONSECUTIVE_SESSION_SUCCESS,
} from "./consecutiveType";
const consecutiveSession_addReducer = (
  state = { loading: true, consecutive_session: {}, error: "" },
  action
) => {
  switch (action.type) {
    case ADD_CONSECUTIVE_SESSION_REQUEST:
      return { ...state, loading: true };
    case ADD_CONSECUTIVE_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        consecutive_session: action.payload,
        error: "",
      };
    case ADD_CONSECUTIVE_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        consecutive_session: {},
        error: action.error,
      };
    default:
      return state;
  }
};

const get_consecutiveSessionReducer = (
  state = { loading: true, consecutive_sessions: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_CONSECUTIVE_SESSION_REQUEST:
      return { ...state, loading: true };
    case GET_CONSECUTIVE_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        consecutive_sessions: action.payload,
        error: "",
      };
    case GET_CONSECUTIVE_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        consecutive_sessions: [],
      };
    default:
      return state;
  }
};

export { get_consecutiveSessionReducer, consecutiveSession_addReducer };
