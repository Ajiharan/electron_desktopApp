import {
    ADD_SUITABLE_LECTURER_REQUEST,
    ADD_SUITABLE_LECTURER_SUCCESS,
    ADD_SUITABLE_LECTURER_FAILURE,
  } from "./SuitableLecturerType";
  
  import { db } from "../../firebase";
  import firebase from "firebase";
  
  const addSuitableLecturer = (roomData) => {
    return async (dispatch) => {
      dispatch({ type: ADD_SUITABLE_LECTURER_REQUEST });
      try {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        db.collection("Suitablerooms")
          .add({
            ...roomData,
            timestamp,
          })
          .then(() => {
            dispatch({
              type: ADD_SUITABLE_LECTURER_SUCCESS,
              payload: {
                ...roomData,
                timestamp,
              },
            });
          })
          .catch((err) => {
            dispatch({
              type: ADD_SUITABLE_LECTURER_FAILURE,
              error: err,
            });
          });
      } catch (err) {}
    };
  };
  
  export { addSuitableLecturer };
  