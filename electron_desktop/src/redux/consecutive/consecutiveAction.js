import {
  ADD_CONSECUTIVE_SESSION_REQUEST,
  ADD_CONSECUTIVE_SESSION_SUCCESS,
  ADD_CONSECUTIVE_SESSION_FAILURE,
  GET_CONSECUTIVE_SESSION_FAILURE,
  GET_CONSECUTIVE_SESSION_REQUEST,
  GET_CONSECUTIVE_SESSION_SUCCESS,
} from "./consecutiveType";
import { db } from "../../firebase";
import firebase from "firebase";

const addConsecutiveSessions = (lecture, tutorial) => {
  return async (dispatch) => {
    dispatch({ type: ADD_CONSECUTIVE_SESSION_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("consecutive_sessions")
        .get()
        .then(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            lecture: doc.data().lecture,
            tutorial: doc.data().tutorial,
            id: doc.id,
          }));

          const isExists = await tempData.filter(
            (data) => data.lecture === lecture && data.tutorial === tutorial
          );
          // console.log("isExists", isExists);
          if (isExists.length === 0) {
            db.collection("consecutive_sessions")
              .add({
                lecture,
                tutorial,
                timestamp,
              })
              .then(() => {
                dispatch({
                  type: ADD_CONSECUTIVE_SESSION_SUCCESS,
                  payload: {
                    lecture,
                    tutorial,
                    timestamp,
                  },
                });
              })
              .catch((err) => {
                dispatch({
                  type: ADD_CONSECUTIVE_SESSION_FAILURE,
                  error: err,
                });
              });
          } else {
            dispatch({
              type: ADD_CONSECUTIVE_SESSION_FAILURE,
              error: "data already exists",
            });
          }
        });
    } catch (err) {}
  };
};

const viewConsecutiveSessions = () => {
  return async (dispatch) => {
    dispatch({ type: GET_CONSECUTIVE_SESSION_REQUEST });
    try {
      db.collection("consecutive_sessions")
        .orderBy("timestamp", "desc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            lecture: doc.data().lecture,
            tutorial: doc.data().tutorial,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_CONSECUTIVE_SESSION_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_CONSECUTIVE_SESSION_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

export { addConsecutiveSessions, viewConsecutiveSessions };
