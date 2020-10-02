import {
  ADD_PREFERED_ROOM_FAILURE,
  ADD_PREFERED_ROOM_REQUEST,
  ADD_PREFERED_ROOM_SUCCESS,
} from "./PreferedRoomType";
import { db } from "../../firebase";
import firebase from "firebase";

const addPreferredRoom = (postData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_PREFERED_ROOM_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("PreferredRooms")
        .add({
          ...postData,
          timestamp,
        })
        .then(() => {
          dispatch({
            type: ADD_PREFERED_ROOM_SUCCESS,
            payload: {
              ...postData,
              timestamp,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: ADD_PREFERED_ROOM_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

export { addPreferredRoom };
