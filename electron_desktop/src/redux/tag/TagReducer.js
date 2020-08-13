import {
  ADD_TAG_FAILURE,
  ADD_TAG_SUCCESS,
  ADD_TAG_REQUEST,
  GET_TAG_FAILURE,
  GET_TAG_REQUEST,
  GET_TAG_SUCCESS,
  UPDATE_TAG_REQUEST,
  UPDATE_TAG_FAILURE,
  UPDATE_TAG_SUCCESS,
  GET_ONE_TAG_REQUEST,
  GET_ONE_TAG_SUCCESS,
  GET_ONE_TAG_FAILURE,
} from "./TagType";

const tagReducer = (state = { loading: true, tag: {}, error: "" }, action) => {
  switch (action.type) {
    case ADD_TAG_REQUEST:
      return { ...state, loading: true };
    case ADD_TAG_SUCCESS:
      return { ...state, loading: false, tag: action.payload, error: "" };
    case ADD_TAG_FAILURE:
      return { ...state, loading: false, error: action.error, tag: {} };
    default:
      return state;
  }
};

const get_tagReducer = (
  state = { loading: true, tags: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_TAG_REQUEST:
      return { ...state, loading: true };
    case GET_TAG_SUCCESS:
      return { ...state, loading: false, tags: action.payload, error: "" };
    case GET_TAG_FAILURE:
      return { ...state, loading: false, error: action.error, tags: [] };
    default:
      return state;
  }
};

export { get_tagReducer, tagReducer };
