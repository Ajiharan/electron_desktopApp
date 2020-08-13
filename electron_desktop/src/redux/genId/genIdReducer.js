import {
  ADD_GEN_GROUPID_FAILURE,
  ADD_GEN_GROUPID_REQUEST,
  ADD_GEN_GROUPID_SUCCESS,
  GET_GEN_GROUPID_FAILURE,
  GET_GEN_GROUPID_REQUEST,
  GET_GEN_GROUPID_SUCCESS,
} from "./genIdType";

const genGroupId_addReducer = (
  state = { loading: true, gen_groupid: {}, error: "" },
  action
) => {
  switch (action.type) {
    case ADD_GEN_GROUPID_REQUEST:
      return { ...state, loading: true };
    case ADD_GEN_GROUPID_SUCCESS:
      return {
        ...state,
        loading: false,
        gen_groupid: action.payload,
        error: "",
      };
    case ADD_GEN_GROUPID_FAILURE:
      return { ...state, loading: false, gen_groupid: {}, error: action.error };
    default:
      return state;
  }
};

const get_genGroupIdReducer = (
  state = { loading: true, gen_groupids: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_GEN_GROUPID_REQUEST:
      return { ...state, loading: true };
    case GET_GEN_GROUPID_SUCCESS:
      return {
        ...state,
        loading: false,
        gen_groupids: action.payload,
        error: "",
      };
    case GET_GEN_GROUPID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        gen_groupids: [],
      };
    default:
      return state;
  }
};

export { genGroupId_addReducer, get_genGroupIdReducer };
