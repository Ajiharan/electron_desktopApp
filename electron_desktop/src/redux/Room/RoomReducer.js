import {
  ADD_ROOM_FAILURE,
  ADD_ROOM_REQUEST,
  ADD_ROOM_SUCCESS,
  GET_ONE_ROOM_FAILURE,
  GET_ONE_ROOM_REQUEST,
  GET_ONE_ROOM_SUCCESS,
  GET_ROOM_FAILURE,
  GET_ROOM_REQUEST,
  GET_ROOM_SUCCESS,
  UPDATE_ROOM_FAILURE,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS,
} from "./RoomType";

const add_RoomReducer = (
  state = { loading: true, room: {}, error: "" },
  action
) => {
  switch (action.type) {
    case ADD_ROOM_REQUEST:
      return { ...state, loading: true };
    case ADD_ROOM_SUCCESS:
      return { ...state, loading: false, room: action.payload, error: "" };
    case ADD_ROOM_FAILURE:
      return { ...state, loading: false, room: {}, error: action.error };
    default:
      return state;
  }
};

const view_RoomReducer = (
  state = { loading: true, room: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_ROOM_REQUEST:
      return { ...state, loading: true };
    case GET_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        room: action.payload,
        error: "",
      };
    case GET_ROOM_FAILURE:
      return { ...state, loading: false, room: [], error: action.error };
    default:
      return state;
  }
};

const update_RoomReducer = (
  state = { loading: true, message: "", error: "" },
  action
) => {
  switch (action.type) {
    case UPDATE_ROOM_REQUEST:
      return { ...state, loading: true };
    case UPDATE_ROOM_SUCCESS:
      return { ...state, loading: false, message: action.message, error: "" };
    case UPDATE_ROOM_FAILURE:
      return { ...state, loading: false, message: "", error: action.error };
    default:
      return state;
  }
};

export { add_RoomReducer, view_RoomReducer, update_RoomReducer };
