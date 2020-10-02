import {
  ADD_RESERVED_TIME_FAILURE,
  ADD_RESERVED_TIME_REQUEST,
  ADD_RESERVED_TIME_SUCCESS,
} from "./ReservedTimeType";

const addReservedTimeReducer = (
  state = { loading: true, reservedTime: {}, error: "" },
  action
) => {
  switch (action.type) {
    case ADD_RESERVED_TIME_REQUEST:
      return { ...state, loading: true };
    case ADD_RESERVED_TIME_SUCCESS:
      return {
        ...state,
        loading: false,
        reservedTime: action.payload,
        error: "",
      };
    case ADD_RESERVED_TIME_FAILURE:
      return {
        ...state,
        loading: false,
        reservedTime: {},
        error: action.error,
      };
    default:
      return state;
  }
};

export { addReservedTimeReducer };
