import {
  ADD_NOT_ALLOCATED_FAILURE,
  ADD_NOT_ALLOCATED_REQUEST,
  ADD_NOT_ALLOCATED_SUCCESS,
  GET_NOT_ALLOCATED_FAILURE,
  GET_NOT_ALLOCATED_REQUEST,
  GET_NOT_ALLOCATED_SUCCESS,
} from "./notAllocatedType";
const allocated_addReducer = (
  state = { loading: true, not_allocate: {}, error: "" },
  action
) => {
  switch (action.type) {
    case ADD_NOT_ALLOCATED_REQUEST:
      return { ...state, loading: true };
    case ADD_NOT_ALLOCATED_SUCCESS:
      return {
        ...state,
        loading: false,
        session: action.payload,
        error: "",
      };
    case ADD_NOT_ALLOCATED_FAILURE:
      return {
        ...state,
        loading: false,
        not_allocate: {},
        error: action.error,
      };
    default:
      return state;
  }
};

const allocated_getReducer = (
  state = { loading: true, not_allocates: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_NOT_ALLOCATED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_NOT_ALLOCATED_SUCCESS:
      return {
        ...state,
        loading: false,
        not_allocates: action.payload,
        error: "",
      };
    case GET_NOT_ALLOCATED_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        not_allocates: [],
      };
    default:
      return state;
  }
};

export { allocated_addReducer, allocated_getReducer };
