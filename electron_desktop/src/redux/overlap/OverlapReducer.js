import {
  ADD_OVERLAP_FAILURE,
  ADD_OVERLAP_REQUEST,
  ADD_OVERLAP_SUCCESS,
} from "./OverlapType";

const addOverlapReducer = (
  state = { loading: true, overlap_session: {}, error: "" },
  action
) => {
  switch (action.type) {
    case ADD_OVERLAP_REQUEST:
      return { ...state, loading: true };
    case ADD_OVERLAP_SUCCESS:
      return {
        ...state,
        loading: false,
        overlap_session: action.payload,
        error: "",
      };
    case ADD_OVERLAP_FAILURE:
      return {
        ...state,
        loading: false,
        overlap_session: {},
        error: action.error,
      };
    default:
      return state;
  }
};

export { addOverlapReducer };
