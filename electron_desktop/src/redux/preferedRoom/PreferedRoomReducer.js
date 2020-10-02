import {
  ADD_PREFERED_ROOM_FAILURE,
  ADD_PREFERED_ROOM_REQUEST,
  ADD_PREFERED_ROOM_SUCCESS,
} from "./PreferedRoomType";

const addpreferredRoomReducer = (
  state = { loading: true, preferredRoom: {}, error: "" },
  action
) => {
  switch (action.type) {
    case ADD_PREFERED_ROOM_REQUEST:
      return { ...state, loading: true };
    case ADD_PREFERED_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        preferredRoom: action.payload,
        error: "",
      };
    case ADD_PREFERED_ROOM_FAILURE:
      return {
        ...state,
        loading: false,
        preferredRoom: {},
        error: action.error,
      };
    default:
      return state;
  }
};

export { addpreferredRoomReducer };
