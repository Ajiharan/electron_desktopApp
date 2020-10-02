import {
    ADD_SUITABLE_CONSECUTIVESESSION_REQUEST,
    ADD_SUITABLE_CONSECUTIVESESSION_SUCCESS,
    ADD_SUITABLE_CONSECUTIVESESSION_FAILURE,
  } from "./SuitableConsecutiveSessionType";
  
  import { db } from "../../firebase";
  import firebase from "firebase";
  
  const addSuitableConsecutiveSession = (roomData) => {
    return async (dispatch) => {
      dispatch({ type: ADD_SUITABLE_CONSECUTIVESESSION_REQUEST });
      try {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        db.collection("SuitableConsecutiveSession")
          .add({
            ...roomData,
            timestamp,
          })
          .then(() => {
            dispatch({
              type: ADD_SUITABLE_CONSECUTIVESESSION_SUCCESS,
              payload: {
                ...roomData,
                timestamp,
              },
            });
          })
          .catch((err) => {
            dispatch({
              type: ADD_SUITABLE_CONSECUTIVESESSION_FAILURE,
              error: err,
            });
          });
      } catch (err) {}
    };
  };
  
  export { addSuitableConsecutiveSession };
  