import {
  ADD_TAG_FAILURE,
  ADD_TAG_SUCCESS,
  ADD_TAG_REQUEST,
  GET_TAG_FAILURE,
  GET_TAG_REQUEST,
  GET_TAG_SUCCESS,
  UPDATE_TAG_REQUEST,
  UPDATE_TAG_FAILURE,
  UPDATE_TAG_SUCCESS,
  GET_ONE_TAG_REQUEST,
  GET_ONE_TAG_SUCCESS,
  GET_ONE_TAG_FAILURE,
} from "./TagType";
import firebase from "firebase";
import { db } from "../../firebase";

const addTag = (tag) => {
  return async (dispatch) => {
    dispatch({ type: ADD_TAG_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("tags")
        .get()
        .then(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            tag: doc.data().tag,
            id: doc.id,
          }));

          const isExists = await tempData.filter((data) => data.tag === tag);
          // console.log("isExists", isExists);
          if (isExists.length === 0) {
            db.collection("tags")
              .add({
                tag,
                timestamp,
              })
              .then(() => {
                dispatch({
                  type: ADD_TAG_SUCCESS,
                  payload: {
                    tag,
                    timestamp,
                  },
                });
              })
              .catch((err) => {
                dispatch({
                  type: ADD_TAG_FAILURE,
                  error: err,
                });
              });
          } else {
            dispatch({
              type: ADD_TAG_FAILURE,
              error: "data already exists",
            });
          }
        });
    } catch (err) {}
  };
};

const viewTag = () => {
  return async (dispatch) => {
    dispatch({ type: GET_TAG_REQUEST });
    try {
      db.collection("tags")
        .orderBy("timestamp", "desc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            tag: doc.data().tag,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_TAG_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_TAG_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};
const UpdateTag = (doc_id, input) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_TAG_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("tags")
        .doc(doc_id)
        .set(
          {
            tag: input,
            timestamp,
          },
          { merge: true }
        )
        .then(() => {
          dispatch({
            type: UPDATE_TAG_SUCCESS,
            message: "upload Sucessfully",
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_TAG_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_TAG_FAILURE,
        error: err,
      });
    }
  };
};
export { viewTag, addTag, UpdateTag };
