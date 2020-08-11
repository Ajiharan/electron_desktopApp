import {
  ADD_YEAR_SEMISTER_FAILURE,
  ADD_YEAR_SEMISTER_SUCCESS,
  ADD_YEAR_SEMISTER_REQUEST,
  GET_YEAR_SEMISTER_FAILURE,
  GET_YEAR_SEMISTER_REQUEST,
  GET_YEAR_SEMISTER_SUCCESS,
  UPDATE_YEAR_SEMISTER_REQUEST,
  UPDATE_YEAR_SEMISTER_FAILURE,
  UPDATE_YEAR_SEMISTER_SUCCESS,
  GET_ONE_YEAR_SEMISTER_REQUEST,
  GET_ONE_YEAR_SEMISTER_SUCCESS,
  GET_ONE_YEAR_SEMISTER_FAILURE,
} from "./yearType";
import firebase from "firebase";
import { db } from "../../firebase";

const addSemisterYear = (semi_year) => {
  return async (dispatch) => {
    dispatch({ type: ADD_YEAR_SEMISTER_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("students")
        .get()
        .then(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            year_semister: doc.data().year_semister,
            id: doc.id,
          }));

          const isExists = await tempData.filter(
            (data) => data.year_semister === semi_year
          );
          // console.log("isExists", isExists);
          if (isExists.length === 0) {
            db.collection("students")
              .add({
                year_semister: semi_year,
                timestamp,
              })
              .then(() => {
                dispatch({
                  type: ADD_YEAR_SEMISTER_SUCCESS,
                  payload: {
                    year_semister: semi_year,
                    timestamp,
                  },
                });
              })
              .catch((err) => {
                dispatch({
                  type: ADD_YEAR_SEMISTER_FAILURE,
                  error: err,
                });
              });
          } else {
            dispatch({
              type: ADD_YEAR_SEMISTER_FAILURE,
              error: "data already exists",
            });
          }
        });
    } catch (err) {}
  };
};

const viewSemister = () => {
  return async (dispatch) => {
    dispatch({ type: GET_YEAR_SEMISTER_REQUEST });
    try {
      db.collection("students")
        .orderBy("timestamp", "desc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            year_semister: doc.data().year_semister,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_YEAR_SEMISTER_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_YEAR_SEMISTER_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const getOneYear_semisterDetail = (doc_id) => {
  return async (dispatch) => {
    dispatch({ type: GET_ONE_YEAR_SEMISTER_REQUEST });
    try {
      db.collection("students")
        .doc(doc_id)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            const tempData = await {
              year_semister: doc.data().year_semister,
              id: doc.id,
              timestamp: doc.data().timestamp,
            };
            console.log("getOneDoc", tempData);
            dispatch({
              type: GET_ONE_YEAR_SEMISTER_SUCCESS,
              payload: tempData,
            });
          } else {
            dispatch({
              type: GET_ONE_YEAR_SEMISTER_FAILURE,
              error: "Sorry Data does not exist",
            });
          }
        });
    } catch (err) {}
  };
};

const UpdateSemister = (doc_id, input) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_YEAR_SEMISTER_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("students")
        .doc(doc_id)
        .set(
          {
            year_semister: input,
            timestamp,
          },
          { merge: true }
        )
        .then(() => {
          dispatch({
            type: UPDATE_YEAR_SEMISTER_SUCCESS,
            message: "upload Sucessfully",
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_YEAR_SEMISTER_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_YEAR_SEMISTER_FAILURE,
        error: err,
      });
    }
  };
};

export {
  addSemisterYear,
  viewSemister,
  UpdateSemister,
  getOneYear_semisterDetail,
};
