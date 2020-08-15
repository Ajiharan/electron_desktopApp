import {
    ADD_BUILDING_FAILURE,
    ADD_BUILDING_REQUEST,
    ADD_BUILDING_SUCCESS,
    GET_ONE_BUILDING_FAILURE,
    GET_ONE_BUILDING_REQUEST,
    GET_ONE_BUILDING_SUCCESS,
    GET_BUILDING_FAILURE,
    GET_BUILDING_REQUEST,
    GET_BUILDING_SUCCESS,
    UPDATE_BUILDING_FAILURE,
    UPDATE_BUILDING_REQUEST,
    UPDATE_BUILDING_SUCCESS,
  } from "./BuildingType";
  
  const add_BuildingReducer = (
    state = { loading: true, building: {}, error: "" },
    action
  ) => {
    switch (action.type) {
      case ADD_BUILDING_REQUEST:
        return { ...state, loading: true };
      case ADD_BUILDING_SUCCESS:
        return { ...state, loading: false, building: action.payload, error: "" };
      case ADD_BUILDING_FAILURE:
        return { ...state, loading: false, building: {}, error: action.error };
      default:
        return state;
    }
  };
  
  const view_BuildingReducer = (
    state = { loading: true, building: {}, error: "" },
    action
  ) => {
    switch (action.type) {
      case GET_BUILDING_REQUEST:
        return { ...state, loading: true };
      case GET_BUILDING_SUCCESS:
        return {
          ...state,
          loading: false,
          building: action.payload,
          error: "",
        };
      case GET_BUILDING_FAILURE:
        return { ...state, loading: false, building: [], error: action.error };
      default:
        return state;
    }
  };
  
  const update_BuildingReducer = (
    state = { loading: true, message: "", error: "" },
    action
  ) => {
    switch (action.type) {
      case UPDATE_BUILDING_REQUEST:
        return { ...state, loading: true };
      case UPDATE_BUILDING_SUCCESS:
        return { ...state, loading: false, message: action.message, error: "" };
      case UPDATE_BUILDING_FAILURE:
        return { ...state, loading: false, message: "", error: action.error };
      default:
        return state;
    }
  };
  
  export { add_BuildingReducer, view_BuildingReducer, update_BuildingReducer };
  