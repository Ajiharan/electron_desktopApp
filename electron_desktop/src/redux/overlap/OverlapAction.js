import {
  ADD_OVERLAP_FAILURE,
  ADD_OVERLAP_REQUEST,
  ADD_OVERLAP_SUCCESS,
} from "./OverlapType";
import { db } from "../../firebase";
import firebase from "firebase";

const addOverlapSession = (session) => {
  return async (dispatch) => {
    dispatch({ type: ADD_OVERLAP_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("OverlapSessions")
        .add({
          ...session,
          timestamp,
        })
        .then(() => {
          dispatch({
            type: ADD_OVERLAP_SUCCESS,
            payload: {
              ...session,
              timestamp,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: ADD_OVERLAP_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

export { addOverlapSession };
