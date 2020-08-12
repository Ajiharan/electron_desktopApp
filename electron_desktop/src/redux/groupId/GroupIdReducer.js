import {
  ADD_GROUPID_FAILURE,
  ADD_GROUPID_REQUEST,
  ADD_GROUPID_SUCCESS,
  GET_GROUPID_FAILURE,
  GET_GROUPID_REQUEST,
  GET_GROUPID_SUCCESS,
  GET_ONE_GROUPID_FAILURE,
  GET_ONE_GROUPID_REQUEST,
  GET_ONE_GROUPID_SUCCESS,
  UPDATE_GROUPID_FAILURE,
  UPDATE_GROUPID_REQUEST,
  UPDATE_GROUPID_SUCCESS,
} from "./GroupIdType";

const groupId_addReducer = (
  state = { loading: true, groupid: {}, error: "" },
  action
) => {
  switch (action.type) {
    case ADD_GROUPID_REQUEST:
      return { ...state, loading: true };
    case ADD_GROUPID_SUCCESS:
      return { ...state, loading: false, groupid: action.payload, error: "" };
    case ADD_GROUPID_FAILURE:
      return { ...state, loading: false, groupid: {}, error: action.error };
    default:
      return state;
  }
};

const get_groupIdReducer = (
  state = { loading: true, group_id: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_GROUPID_REQUEST:
      return { ...state, loading: true };
    case GET_GROUPID_SUCCESS:
      return { ...state, loading: false, group_id: action.payload, error: "" };
    case GET_GROUPID_FAILURE:
      return { ...state, loading: false, error: action.error, group_id: {} };
    default:
      return state;
  }
};
const update_groupIdReducer = (
  state = { loading: true, message: "", error: "" },
  action
) => {
  switch (action.type) {
    case UPDATE_GROUPID_REQUEST:
      return { ...state, loading: true };
    case UPDATE_GROUPID_SUCCESS:
      return { ...state, loading: false, message: action.message, error: "" };
    case UPDATE_GROUPID_FAILURE:
      return { ...state, loading: false, message: "", error: action.error };
    default:
      return state;
  }
};

export { groupId_addReducer, get_groupIdReducer, update_groupIdReducer };
