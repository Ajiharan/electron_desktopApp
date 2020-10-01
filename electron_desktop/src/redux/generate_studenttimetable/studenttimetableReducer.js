import {
    ADD_STUDENTTIMETABLE_FAILURE,
    ADD_STUDENTTIMETABLE_REQUEST,
    ADD_STUDENTTIMETABLE_SUCCESS,
    GET_STUDENTTIMETABLE_FAILURE,
    GET_STUDENTTIMETABLE_REQUEST,
    GET_STUDENTTIMETABLE_SUCCESS,
  } from "./studenttimetableType";
  
  const studenttimetable_addReducer = (
    state = { loading: true,
       studenttimetabledata: {}, 
       error: "" },
        action
  ) => {
    switch (action.type) {
      case ADD_STUDENTTIMETABLE_REQUEST:
        return { ...state, loading: true };
      case ADD_STUDENTTIMETABLE_SUCCESS:
        return {
          ...state,
          loading: false,
          studenttimetabledata: action.payload,
          error: "",
        };
      case ADD_STUDENTTIMETABLE_FAILURE:
        return {
          ...state,
          loading: false,
          studenttimetabledata: {},
          error: action.error,
        };
      default:
        return state;
    }
  };
  
 
  export { studenttimetable_addReducer };
  