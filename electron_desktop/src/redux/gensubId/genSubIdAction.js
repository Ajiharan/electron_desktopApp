import {
  ADD_GEN_SUBGROUPID_FAILURE,
  ADD_GEN_SUBGROUPID_REQUEST,
  ADD_GEN_SUBGROUPID_SUCCESS,
  GET_GEN_SUBGROUPID_FAILURE,
  GET_GEN_SUBGROUPID_REQUEST,
  GET_GEN_SUBGROUPID_SUCCESS,
} from "./genSubIdType";
import { db } from "../../firebase";
import firebase from "firebase";
import { GET_GEN_GROUPID_FAILURE } from "../genId/genIdType";

const addGenSubGroupId = (gen_subgroupid) => {
  return async (dispatch) => {
    dispatch({ type: ADD_GEN_SUBGROUPID_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("gen_subgroupids")
        .get()
        .then(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            gen_subgroupid: doc.data().gen_subgroupid,
            id: doc.id,
          }));

          const isExists = await tempData.filter(
            (data) => data.gen_subgroupid === gen_subgroupid
          );
          // console.log("isExists", isExists);
          if (isExists.length === 0) {
            db.collection("gen_subgroupids")
              .add({
                gen_subgroupid,
                timestamp,
              })
              .then(() => {
                dispatch({
                  type: ADD_GEN_SUBGROUPID_SUCCESS,
                  payload: {
                    gen_subgroupid,
                    timestamp,
                  },
                });
              })
              .catch((err) => {
                dispatch({
                  type: ADD_GEN_SUBGROUPID_FAILURE,
                  error: err,
                });
              });
          } else {
            dispatch({
              type: ADD_GEN_SUBGROUPID_FAILURE,
              error: "data already exists",
            });
          }
        });
    } catch (err) {}
  };
};

const view_genSubGroupId = () => {
  return async (dispatch) => {
    dispatch({ type: GET_GEN_SUBGROUPID_REQUEST });
    try {
      db.collection("gen_subgroupids")
        .orderBy("timestamp", "desc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            gen_subgroupid: doc.data().gen_subgroupid,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_GEN_SUBGROUPID_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_GEN_GROUPID_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

export { addGenSubGroupId, view_genSubGroupId };
