import {
    ADD_SUITABLE_GROUPID_REQUEST,
    ADD_SUITABLE_GROUPID_SUCCESS,
    ADD_SUITABLE_GROUPID_FAILURE,
  } from "./SuitableGroupIdType";
  
  import { db } from "../../firebase";
  import firebase from "firebase";
  
  const addSuitableGroupId = (roomData) => {
    return async (dispatch) => {
      dispatch({ type: ADD_SUITABLE_GROUPID_REQUEST });
      try {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        db.collection("SuitableGroupId")
          .add({
            ...roomData,
            timestamp,
          })
          .then(() => {
            dispatch({
              type: ADD_SUITABLE_GROUPID_SUCCESS,
              payload: {
                ...roomData,
                timestamp,
              },
            });
          })
          .catch((err) => {
            dispatch({
              type: ADD_SUITABLE_GROUPID_FAILURE,
              error: err,
            });
          });
      } catch (err) {}
    };
  };
  
  export { addSuitableGroupId };
  