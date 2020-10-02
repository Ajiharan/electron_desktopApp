import {
    ADD_SUITABLE_CONSECUTIVESESSION_REQUEST,
    ADD_SUITABLE_CONSECUTIVESESSION_SUCCESS,
    ADD_SUITABLE_CONSECUTIVESESSION_FAILURE,
  } from "./SuitableConsecutiveSessionType";
  
  const addSuitableConsecutiveSessionReducer = (
    state = { loading: true, suitableConsecutiveSession: {}, error: "" },
    action
  ) => {
    switch (action.type) {
      case ADD_SUITABLE_CONSECUTIVESESSION_REQUEST:
        return { ...state, loading: true };
      case ADD_SUITABLE_CONSECUTIVESESSION_SUCCESS:
        return {
          ...state,
          loading: false,
          suitableConsecutiveSession: action.payload,
          error: "",
        };
      case ADD_SUITABLE_CONSECUTIVESESSION_FAILURE:
        return {
          ...state,
          loading: false,
          suitableConsecutiveSession: {},
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export { addSuitableConsecutiveSessionReducer };
  