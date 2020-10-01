import {
    ADD_LOCATIONTIMETABLE_FAILURE,
    ADD_LOCATIONTIMETABLE_REQUEST,
    ADD_LOCATIONTIMETABLE_SUCCESS,
    GET_LOCATIONTIMETABLE_FAILURE,
    GET_LOCATIONTIMETABLE_REQUEST,
    GET_LOCATIONTIMETABLE_SUCCESS,
  } from "./locationtimetableType";
  
  const locationtimetable_addReducer = (
    state = { loading: true,
       locationtimetabledata: {}, 
       error: "" },
        action
  ) => {
    switch (action.type) {
      case ADD_LOCATIONTIMETABLE_REQUEST:
        return { ...state, loading: true };
      case ADD_LOCATIONTIMETABLE_SUCCESS:
        return {
          ...state,
          loading: false,
          locationtimetabledata: action.payload,
          error: "",
        };
      case ADD_LOCATIONTIMETABLE_FAILURE:
        return {
          ...state,
          loading: false,
          locationtimetabledata: {},
          error: action.error,
        };
      default:
        return state;
    }
  };
  
 
  export { locationtimetable_addReducer };
  