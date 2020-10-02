import {
  ADD_BUILDING_FAILURE,
  ADD_BUILDING_REQUEST,
  ADD_BUILDING_SUCCESS,
  GET_ONE_BUILDING_FAILURE,
  GET_ONE_BUILDING_REQUEST,
  GET_ONE_BUILDING_SUCCESS,
  GET_BUILDING_FAILURE,
  GET_BUILDING_REQUEST,
  GET_BUILDING_SUCCESS,
  UPDATE_BUILDING_FAILURE,
  UPDATE_BUILDING_REQUEST,
  UPDATE_BUILDING_SUCCESS,
} from "./BuildingType";

import { db } from "../../firebase";
import firebase from "firebase";

const addBuilding = (building, center) => {
  return async (dispatch) => {
    dispatch({ type: ADD_BUILDING_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("buildings")
      .get()
        .then(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            building: doc.data().building,
            id: doc.id,
          }));
      const isExists = await tempData.filter(
        (data) => data.building  === building
      );
      if (isExists.length === 0) {
        db.collection("buildings")
          .add({
            building,
            center,
            timestamp,
          })
          .then(() => {
            dispatch({
              type: ADD_BUILDING_SUCCESS,
              payload: {
                building,
                center,
                timestamp,
              },
            });
          })
          .catch((err) => {
            dispatch({
              type: ADD_BUILDING_FAILURE,
              error: err,
            });
          });
        } else{
          dispatch({
            type: ADD_BUILDING_FAILURE,
            error: "data already exists",
          });
        }
        });
    } catch (err) {}
  };
};
const viewBuilding = () => {
  return async (dispatch) => {
    dispatch({ type: GET_BUILDING_REQUEST });
    try {
      db.collection("buildings")
        .orderBy("timestamp", "desc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            building: doc.data().building,
            center: doc.data().center,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_BUILDING_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_BUILDING_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const UpdateBuilding = (doc_id, input, center) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_BUILDING_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("buildings")
        .doc(doc_id)
        .set(
          {
            building: input,
            center,
            timestamp,
          },
          { merge: true }
        )
        .then(() => {
          dispatch({
            type: UPDATE_BUILDING_SUCCESS,
            message: "update Sucessfully",
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_BUILDING_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_BUILDING_FAILURE,
        error: err,
      });
    }
  };
};

export { addBuilding, viewBuilding, UpdateBuilding };
