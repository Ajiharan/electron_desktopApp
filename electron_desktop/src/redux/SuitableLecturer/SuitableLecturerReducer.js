import {
    ADD_SUITABLE_LECTURER_REQUEST,
    ADD_SUITABLE_LECTURER_SUCCESS,
    ADD_SUITABLE_LECTURER_FAILURE,
  } from "./SuitableLecturerType";
  
  const addSuitableLecturerReducer = (
    state = { loading: true, suitableLecturer: {}, error: "" },
    action
  ) => {
    switch (action.type) {
      case ADD_SUITABLE_LECTURER_REQUEST:
        return { ...state, loading: true };
      case ADD_SUITABLE_LECTURER_SUCCESS:
        return {
          ...state,
          loading: false,
          suitableLecturer: action.payload,
          error: "",
        };
      case ADD_SUITABLE_LECTURER_FAILURE:
        return {
          ...state,
          loading: false,
          suitableLecturer: {},
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export { addSuitableLecturerReducer };
  