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

const addRoom = (room) => {
    return async (dispatch) => {
      dispatch({ type: ADD_ROOM_REQUEST });
      try {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        db.collection("rooms")
          .get()
          .then(async (snapshot) => {
            const tempData = await snapshot.docs.map((doc) => ({
              room: doc.data().room,
              id: doc.id,
            }));
  
            const isExists = await tempData.filter(
              (data) => data.room === room
            );
            // console.log("isExists", isExists);
            if (isExists.length === 0) {
              db.collection("rooms")
                .add({
                  room,
                  timestamp,
                })
                .then(() => {
                  dispatch({
                    type: ADD_ROOM_SUCCESS,
                    payload: {
                      room,
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
            } else {
              dispatch({
                type: ADD_ROOM_FAILURE,
                error: "data already exists",
              });
            }
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
              room: doc.data().room,
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
  
  const UpdateRoom = (doc_id, input) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_ROOM_REQUEST });
      try {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        db.collection("rooms")
          .doc(doc_id)
          .set(
            {
              room: input,
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
  