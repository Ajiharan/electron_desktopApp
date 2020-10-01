import {
    ADD_SUITABLE_SESSION_REQUEST,
    ADD_SUITABLE_SESSION_SUCCESS,
    ADD_SUITABLE_SESSION_FAILURE,
  } from "./SuitableSessionType";
  
  const addSuitableSessionReducer = (
    state = { loading: true, suitableSession: {}, error: "" },
    action
  ) => {
    switch (action.type) {
      case ADD_SUITABLE_SESSION_REQUEST:
        return { ...state, loading: true };
      case ADD_SUITABLE_SESSION_SUCCESS:
        return {
          ...state,
          loading: false,
          suitableSession: action.payload,
          error: "",
        };
      case ADD_SUITABLE_SESSION_FAILURE:
        return {
          ...state,
          loading: false,
          suitableSession: {},
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export { addSuitableSessionReducer };
  