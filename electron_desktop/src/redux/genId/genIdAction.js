import {
  ADD_GEN_GROUPID_FAILURE,
  ADD_GEN_GROUPID_REQUEST,
  ADD_GEN_GROUPID_SUCCESS,
  GET_GEN_GROUPID_FAILURE,
  GET_GEN_GROUPID_REQUEST,
  GET_GEN_GROUPID_SUCCESS,
} from "./genIdType";
import { db } from "../../firebase";
import firebase from "firebase";

const addGenGroupId = (gen_groupid) => {
  return async (dispatch) => {
    dispatch({ type: ADD_GEN_GROUPID_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("gen_groupids")
        .get()
        .then(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            gen_groupid: doc.data().gen_groupid,
            id: doc.id,
          }));

          const isExists = await tempData.filter(
            (data) => data.gen_groupid === gen_groupid
          );
          // console.log("isExists", isExists);
          if (isExists.length === 0) {
            db.collection("gen_groupids")
              .add({
                gen_groupid,
                timestamp,
              })
              .then(() => {
                dispatch({
                  type: ADD_GEN_GROUPID_SUCCESS,
                  payload: {
                    gen_groupid,
                    timestamp,
                  },
                });
              })
              .catch((err) => {
                dispatch({
                  type: ADD_GEN_GROUPID_FAILURE,
                  error: err,
                });
              });
          } else {
            dispatch({
              type: ADD_GEN_GROUPID_FAILURE,
              error: "data already exists",
            });
          }
        });
    } catch (err) {}
  };
};

const view_genGroupId = () => {
  return async (dispatch) => {
    dispatch({ type: GET_GEN_GROUPID_REQUEST });
    try {
      db.collection("gen_groupids")
        .orderBy("timestamp", "desc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            gen_groupid: doc.data().gen_groupid,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_GEN_GROUPID_SUCCESS,
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

export { addGenGroupId, view_genGroupId };
