import {
  ADD_GROUPID_FAILURE,
  ADD_GROUPID_REQUEST,
  ADD_GROUPID_SUCCESS,
  GET_GROUPID_FAILURE,
  GET_GROUPID_REQUEST,
  GET_GROUPID_SUCCESS,
  GET_ONE_GROUPID_FAILURE,
  GET_ONE_GROUPID_REQUEST,
  GET_ONE_GROUPID_SUCCESS,
  UPDATE_GROUPID_FAILURE,
  UPDATE_GROUPID_REQUEST,
  UPDATE_GROUPID_SUCCESS,
} from "./GroupIdType";

import { db } from "../../firebase";
import firebase from "firebase";

const addGroupId = (groupid) => {
  return async (dispatch) => {
    dispatch({ type: ADD_GROUPID_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("groupids")
        .get()
        .then(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            groupid: doc.data().groupid,
            id: doc.id,
          }));

          const isExists = await tempData.filter(
            (data) => data.groupid === groupid
          );
          // console.log("isExists", isExists);
          if (isExists.length === 0) {
            db.collection("groupids")
              .add({
                groupid,
                timestamp,
              })
              .then(() => {
                dispatch({
                  type: ADD_GROUPID_SUCCESS,
                  payload: {
                    groupid,
                    timestamp,
                  },
                });
              })
              .catch((err) => {
                dispatch({
                  type: ADD_GROUPID_FAILURE,
                  error: err,
                });
              });
          } else {
            dispatch({
              type: ADD_GROUPID_FAILURE,
              error: "data already exists",
            });
          }
        });
    } catch (err) {}
  };
};

const viewGroupId = () => {
  return async (dispatch) => {
    dispatch({ type: GET_GROUPID_REQUEST });
    try {
      db.collection("groupids")
        .orderBy("timestamp", "desc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            groupid: doc.data().groupid,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_GROUPID_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_GROUPID_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const UpdateGroupId = (doc_id, input) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_GROUPID_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("groupids")
        .doc(doc_id)
        .set(
          {
            groupid: input,
            timestamp,
          },
          { merge: true }
        )
        .then(() => {
          dispatch({
            type: UPDATE_GROUPID_SUCCESS,
            message: "upload Sucessfully",
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_GROUPID_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_GROUPID_FAILURE,
        error: err,
      });
    }
  };
};

export { addGroupId, viewGroupId, UpdateGroupId };
