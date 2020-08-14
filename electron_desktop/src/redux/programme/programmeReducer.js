import {
  ADD_PROGRAMME_FAILURE,
  ADD_PROGRAMME_REQUEST,
  ADD_PROGRAMME_SUCCESS,
  GET_ONE_PROGRAMME_FAILURE,
  GET_ONE_PROGRAMME_REQUEST,
  GET_ONE_PROGRAMME_SUCCESS,
  GET_PROGRAMME_FAILURE,
  GET_PROGRAMME_REQUEST,
  GET_PROGRAMME_SUCCESS,
  UPDATE_PROGRAMME_FAILURE,
  UPDATE_PROGRAMME_REQUEST,
  UPDATE_PROGRAMME_SUCCESS,
} from "./programmeType";

const addProgrammeReducer = (
  state = { loading: true, programme: {}, error: "" },
  action
) => {
  switch (action.type) {
    case ADD_PROGRAMME_REQUEST:
      return { ...state, loading: true };
    case ADD_PROGRAMME_SUCCESS:
      return { ...state, loading: false, programme: action.payload, error: "" };
    case ADD_PROGRAMME_FAILURE:
      return { ...state, loading: false, programme: {}, error: action.error };
    default:
      return state;
  }
};

const viewProgrammeReducer = (
  state = { loading: true, programme: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_PROGRAMME_REQUEST:
      return { ...state, loading: true };
    case GET_PROGRAMME_SUCCESS:
      return {
        ...state,
        loading: false,
        programme: action.payload,
        error: "",
      };
    case GET_PROGRAMME_FAILURE:
      return { ...state, loading: false, programme: [], error: action.error };
    default:
      return state;
  }
};

const update_programmeReducer = (
  state = { loading: true, message: "", error: "" },
  action
) => {
  switch (action.type) {
    case UPDATE_PROGRAMME_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PROGRAMME_SUCCESS:
      return { ...state, loading: false, message: action.message, error: "" };
    case UPDATE_PROGRAMME_FAILURE:
      return { ...state, loading: false, message: "", error: action.error };
    default:
      return state;
  }
};

export { addProgrammeReducer, viewProgrammeReducer, update_programmeReducer };
