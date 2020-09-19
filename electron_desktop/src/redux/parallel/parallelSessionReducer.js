import {
  ADD_PARALLEL_SESSION_FAILURE,
  ADD_PARALLEL_SESSION_REQUEST,
  ADD_PARALLEL_SESSION_SUCCESS,
  GET_PARALLEL_SESSION_FAILURE,
  GET_PARALLEL_SESSION_REQUEST,
  GET_PARALLEL_SESSION_SUCCESS,
} from "./parallelSessionType";
const parallelSession_addReducer = (
  state = { loading: true, parallel_session: {}, error: "" },
  action
) => {
  switch (action.type) {
    case ADD_PARALLEL_SESSION_REQUEST:
      return { ...state, loading: true };
    case ADD_PARALLEL_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        parallel_session: action.payload,
        error: "",
      };
    case ADD_PARALLEL_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        parallel_session: {},
        error: action.error,
      };
    default:
      return state;
  }
};

const get_parallelSessionReducer = (
  state = { loading: true, parallel_sessions: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_PARALLEL_SESSION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PARALLEL_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        parallel_sessions: action.payload,
        error: "",
      };
    case GET_PARALLEL_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        parallel_sessions: [],
      };
    default:
      return state;
  }
};

export { parallelSession_addReducer, get_parallelSessionReducer };
