import {
  ADD_SUITABLE_ROOM_REQUEST,
  ADD_SUITABLE_ROOM_SUCCESS,
  ADD_SUITABLE_ROOM_FAILURE,
} from "./SuitableRoomType";

const addSuitableRoomReducer = (
  state = { loading: true, suitableRoom: {}, error: "" },
  action
) => {
  switch (action.type) {
    case ADD_SUITABLE_ROOM_REQUEST:
      return { ...state, loading: true };
    case ADD_SUITABLE_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        suitableRoom: action.payload,
        error: "",
      };
    case ADD_SUITABLE_ROOM_FAILURE:
      return {
        ...state,
        loading: false,
        suitableRoom: {},
        error: action.error,
      };
    default:
      return state;
  }
};

export { addSuitableRoomReducer };
