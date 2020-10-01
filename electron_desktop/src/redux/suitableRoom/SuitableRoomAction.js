import {
  ADD_SUITABLE_ROOM_REQUEST,
  ADD_SUITABLE_ROOM_SUCCESS,
  ADD_SUITABLE_ROOM_FAILURE,
} from "./SuitableRoomType";

import { db } from "../../firebase";
import firebase from "firebase";

const addSuitableRoom = (roomData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_SUITABLE_ROOM_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("Suitablerooms")
        .add({
          ...roomData,
          timestamp,
        })
        .then(() => {
          dispatch({
            type: ADD_SUITABLE_ROOM_SUCCESS,
            payload: {
              ...roomData,
              timestamp,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: ADD_SUITABLE_ROOM_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

export { addSuitableRoom };
