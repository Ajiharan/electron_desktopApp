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

const addSubgroupId = (sub_groupId) => {
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
            (data) => data.sub_groupid === sub_groupId
          );
          // console.log("isExists", isExists);
          if (isExists.length === 0) {
            db.collection("sub_groupids")
              .add({
                sub_groupId,
                timestamp,
              })
              .then(() => {
                dispatch({
                  type: ADD_SUB_GROUPID_SUCCESS,
                  payload: {
                    sub_groupId,
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

export { addSubgroupId };
