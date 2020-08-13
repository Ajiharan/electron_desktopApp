import {
  ADD_SUB_GROUPID_FAILURE,
  ADD_SUB_GROUPID_SUCCESS,
  ADD_SUB_GROUPID_REQUEST,
  GET_SUB_GROUPID_FAILURE,
  GET_SUB_GROUPID_REQUEST,
  GET_SUB_GROUPID_SUCCESS,
  UPDATE_SUB_GROUPID_REQUEST,
  UPDATE_SUB_GROUPID_FAILURE,
  UPDATE_SUB_GROUPID_SUCCESS,
  GET_ONE_SUB_GROUPID_REQUEST,
  GET_ONE_SUB_GROUPID_SUCCESS,
  GET_ONE_SUB_GROUPID_FAILURE,
} from "./SubgroupIdType";
import firebase from "firebase";
import { db } from "../../firebase";

const addSubgroupId = (sub_groupid) => {
  return async (dispatch) => {
    dispatch({ type: ADD_SUB_GROUPID_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("sub_groupids")
        .get()
        .then(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            year_semister: doc.data().sub_groupid,
            id: doc.id,
          }));

          const isExists = await tempData.filter(
            (data) => data.sub_groupid === sub_groupid
          );
          // console.log("isExists", isExists);
          if (isExists.length === 0) {
            db.collection("sub_groupids")
              .add({
                sub_groupid,
                timestamp,
              })
              .then(() => {
                dispatch({
                  type: ADD_SUB_GROUPID_SUCCESS,
                  payload: {
                    sub_groupid,
                    timestamp,
                  },
                });
              })
              .catch((err) => {
                dispatch({
                  type: ADD_SUB_GROUPID_FAILURE,
                  error: err,
                });
              });
          } else {
            dispatch({
              type: ADD_SUB_GROUPID_FAILURE,
              error: "data already exists",
            });
          }
        });
    } catch (err) {}
  };
};

const viewSubGroupId = () => {
  return async (dispatch) => {
    dispatch({ type: GET_SUB_GROUPID_REQUEST });
    try {
      db.collection("sub_groupids")
        .orderBy("timestamp", "desc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            sub_groupid: doc.data().sub_groupid,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_SUB_GROUPID_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_SUB_GROUPID_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};
const UpdateSubGroupId = (doc_id, input) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_SUB_GROUPID_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("sub_groupids")
        .doc(doc_id)
        .set(
          {
            sub_groupid: input,
            timestamp,
          },
          { merge: true }
        )
        .then(() => {
          dispatch({
            type: UPDATE_SUB_GROUPID_SUCCESS,
            message: "upload Sucessfully",
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_SUB_GROUPID_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_SUB_GROUPID_FAILURE,
        error: err,
      });
    }
  };
};

export { addSubgroupId, viewSubGroupId, UpdateSubGroupId };
