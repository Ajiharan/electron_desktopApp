import {
  ADD_SUB_GROUPID_FAILURE,
  ADD_SUB_GROUPID_SUCCESS,
  ADD_SUB_GROUPID_REQUEST,
  GET_SUB_GROUPID_FAILURE,
  GET_SUB_GROUPID_REQUEST,
  GET_SUB_GROUPID_SUCCESS,
  UPDATE_SUB_GROUPID_REQUEST,
  UPDATE_SUB_GROUPID_FAILURE,
  UPDATE_SUB_GROUPID_SUCCESS,
  GET_ONE_SUB_GROUPID_REQUEST,
  GET_ONE_SUB_GROUPID_SUCCESS,
  GET_ONE_SUB_GROUPID_FAILURE,
} from "./SubgroupIdType";

const sub_groupIdReducer = (
  state = { loading: true, sub_groupid: {}, error: "" },
  action
) => {
  switch (action.type) {
    case ADD_SUB_GROUPID_REQUEST:
      return { ...state, loading: true };
    case ADD_SUB_GROUPID_SUCCESS:
      return {
        ...state,
        loading: false,
        sub_groupid: action.payload,
        error: "",
      };
    case ADD_SUB_GROUPID_FAILURE:
      return { ...state, loading: false, error: action.error, sub_groupid: {} };
    default:
      return state;
  }
};

const get_SubGroupIdReducer = (
  state = { loading: true, sub_groupids: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_SUB_GROUPID_REQUEST:
      return { ...state, loading: true };
    case GET_SUB_GROUPID_SUCCESS:
      return {
        ...state,
        loading: false,
        sub_groupids: action.payload,
        error: "",
      };
    case GET_SUB_GROUPID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        sub_groupids: [],
      };
    default:
      return state;
  }
};

const update_subgroupIdReducer = (
  state = { loading: true, message: "", error: "" },
  action
) => {
  switch (action.type) {
    case UPDATE_SUB_GROUPID_REQUEST:
      return { ...state, loading: true };
    case UPDATE_SUB_GROUPID_SUCCESS:
      return { ...state, loading: false, message: action.message, error: "" };
    case UPDATE_SUB_GROUPID_FAILURE:
      return { ...state, loading: false, message: "", error: action.error };
    default:
      return state;
  }
};

export { sub_groupIdReducer, get_SubGroupIdReducer, update_subgroupIdReducer };
