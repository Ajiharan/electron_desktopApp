import {
    ADD_SUITABLE_GROUPID_REQUEST,
    ADD_SUITABLE_GROUPID_SUCCESS,
    ADD_SUITABLE_GROUPID_FAILURE,
  } from "./SuitableGroupIdType";
  
  const addSuitableGroupIdReducer = (
    state = { loading: true, suitableGroupId: {}, error: "" },
    action
  ) => {
    switch (action.type) {
      case ADD_SUITABLE_GROUPID_REQUEST:
        return { ...state, loading: true };
      case ADD_SUITABLE_GROUPID_SUCCESS:
        return {
          ...state,
          loading: false,
          suitableGroupId: action.payload,
          error: "",
        };
      case ADD_SUITABLE_GROUPID_FAILURE:
        return {
          ...state,
          loading: false,
          suitableGroupId: {},
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export { addSuitableGroupIdReducer };
  