import {
    ADD_SUITABLE_SESSION_REQUEST,
    ADD_SUITABLE_SESSION_SUCCESS,
    ADD_SUITABLE_SESSION_FAILURE,
  } from "./SuitableSessionType";
  
  import { db } from "../../firebase";
  import firebase from "firebase";
  
  const addSuitableSession = (roomData) => {
    return async (dispatch) => {
      dispatch({ type: ADD_SUITABLE_SESSION_REQUEST });
      try {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        db.collection("SuitableSession")
          .add({
            ...roomData,
            timestamp,
          })
          .then(() => {
            dispatch({
              type: ADD_SUITABLE_SESSION_SUCCESS,
              payload: {
                ...roomData,
                timestamp,
              },
            });
          })
          .catch((err) => {
            dispatch({
              type: ADD_SUITABLE_SESSION_FAILURE,
              error: err,
            });
          });
      } catch (err) {}
    };
  };
  
  export { addSuitableSession };
  