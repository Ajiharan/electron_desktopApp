import {
  ADD_RESERVED_TIME_FAILURE,
  ADD_RESERVED_TIME_REQUEST,
  ADD_RESERVED_TIME_SUCCESS,
} from "./ReservedTimeType";

import { db } from "../../firebase";
import firebase from "firebase";

const addRedervedTime = (reservedData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_RESERVED_TIME_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("ReservedTimes")
        .add({
          ...reservedData,
          timestamp,
        })
        .then(() => {
          dispatch({
            type: ADD_RESERVED_TIME_SUCCESS,
            payload: {
              ...reservedData,
              timestamp,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: ADD_RESERVED_TIME_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

export { addRedervedTime };
