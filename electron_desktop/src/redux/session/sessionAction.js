import {
  ADD_SESSION_FAILURE,
  ADD_SESSION_REQUEST,
  ADD_SESSION_SUCCESS,
  GET_SESSION_FAILURE,
  GET_SESSION_REQUEST,
  GET_SESSION_SUCCESS,
} from "./sessionType";
import { db } from "../../firebase";
import firebase from "firebase";

const addSessions = (
  lectures,
  subject,
  subject_code,
  tag,
  group_id,
  count,
  duration
) => {
  return async (dispatch) => {
    dispatch({ type: ADD_SESSION_REQUEST });

    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    db.collection("sessions")
      .add({
        lectures,
        subject,
        subject_code,
        tag,
        group_id,
        count,
        duration,
        timestamp,
      })
      .then(() => {
        dispatch({
          type: ADD_SESSION_SUCCESS,
          payload: {
            lectures,
            subject,
            subject_code,
            tag,
            group_id,
            count,
            duration,
            timestamp,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: ADD_SESSION_FAILURE,
          error: err,
        });
      });
  };
};

const viewSessions = () => {
  return async (dispatch) => {
    dispatch({ type: GET_SESSION_REQUEST });
    try {
      db.collection("sessions")
        .orderBy("timestamp", "desc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_SESSION_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_SESSION_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export { addSessions, viewSessions };
