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

import { db } from "../../firebase";
import firebase from "firebase";

const addRoom = (roomData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ROOM_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("rooms")
        .add({
          ...roomData,
          timestamp,
        })
        .then(() => {
          dispatch({
            type: ADD_ROOM_SUCCESS,
            payload: {
              ...roomData,
              timestamp,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: ADD_ROOM_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};
const viewRoom = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ROOM_REQUEST });
    try {
      db.collection("rooms")
        .orderBy("timestamp", "desc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            room: doc.data(),
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_ROOM_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_ROOM_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const UpdateRoom = (doc_id, roomData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ROOM_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("rooms")
        .doc(doc_id)
        .set(
          {
            ...roomData,
            timestamp,
          },
          { merge: true }
        )
        .then(() => {
          dispatch({
            type: UPDATE_ROOM_SUCCESS,
            message: "update Sucessfully",
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_ROOM_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_ROOM_FAILURE,
        error: err,
      });
    }
  };
};

export { addRoom, viewRoom, UpdateRoom };
