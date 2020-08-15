import {
  ADD_GEN_SUBGROUPID_FAILURE,
  ADD_GEN_SUBGROUPID_REQUEST,
  ADD_GEN_SUBGROUPID_SUCCESS,
  GET_GEN_SUBGROUPID_FAILURE,
  GET_GEN_SUBGROUPID_REQUEST,
  GET_GEN_SUBGROUPID_SUCCESS,
} from "./genSubIdType";

const genSubGroupId_addReducer = (
  state = { loading: true, gen_subgroupid: {}, error: "" },
  action
) => {
  switch (action.type) {
    case ADD_GEN_SUBGROUPID_REQUEST:
      return { ...state, loading: true };
    case ADD_GEN_SUBGROUPID_SUCCESS:
      return {
        ...state,
        loading: false,
        gen_subgroupid: action.payload,
        error: "",
      };
    case ADD_GEN_SUBGROUPID_FAILURE:
      return {
        ...state,
        loading: false,
        gen_subgroupid: {},
        error: action.error,
      };
    default:
      return state;
  }
};

const get_genSubGroupIdReducer = (
  state = { loading: true, gen_subgroupids: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_GEN_SUBGROUPID_REQUEST:
      return { ...state, loading: true };
    case GET_GEN_SUBGROUPID_SUCCESS:
      return {
        ...state,
        loading: false,
        gen_subgroupids: action.payload,
        error: "",
      };
    case GET_GEN_SUBGROUPID_FAILURE:
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

export { genSubGroupId_addReducer, get_genSubGroupIdReducer };
