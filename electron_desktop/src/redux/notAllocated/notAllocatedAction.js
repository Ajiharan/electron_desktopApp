import {
  ADD_NOT_ALLOCATED_FAILURE,
  ADD_NOT_ALLOCATED_REQUEST,
  ADD_NOT_ALLOCATED_SUCCESS,
  GET_NOT_ALLOCATED_FAILURE,
  GET_NOT_ALLOCATED_REQUEST,
  GET_NOT_ALLOCATED_SUCCESS,
} from "./notAllocatedType";
import { db } from "../../firebase";
import firebase from "firebase";

const addNotAllocatedTime = (type_value, start_time, end_time, date) => {
  return async (dispatch) => {
    dispatch({ type: ADD_NOT_ALLOCATED_REQUEST });

    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    db.collection("not_allocates")
      .add({
        type_value,
        start_time,
        end_time,
        date,
        timestamp,
      })
      .then(() => {
        dispatch({
          type: ADD_NOT_ALLOCATED_SUCCESS,
          payload: {
            type_value,
            start_time,
            end_time,
            date,
            timestamp,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: ADD_NOT_ALLOCATED_FAILURE,
          error: err,
        });
      });
  };
};

const view_notAlocatedTime = () => {
  return async (dispatch) => {
    dispatch({ type: GET_NOT_ALLOCATED_REQUEST });
    try {
      db.collection("not_allocates")
        .orderBy("timestamp", "desc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_NOT_ALLOCATED_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_NOT_ALLOCATED_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export { addNotAllocatedTime, view_notAlocatedTime };
