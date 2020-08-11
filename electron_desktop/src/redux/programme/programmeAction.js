import {
  ADD_PROGRAMME_FAILURE,
  ADD_PROGRAMME_REQUEST,
  ADD_PROGRAMME_SUCCESS,
  GET_ONE_PROGRAMME_FAILURE,
  GET_ONE_PROGRAMME_REQUEST,
  GET_ONE_PROGRAMME_SUCCESS,
  GET_PROGRAMME_FAILURE,
  GET_PROGRAMME_REQUEST,
  GET_PROGRAMME_SUCCESS,
  UPDATE_PROGRAMME_FAILURE,
  UPDATE_PROGRAMME_REQUEST,
  UPDATE_PROGRAMME_SUCCESS,
} from "./programmeType";
import { db } from "../../firebase";
import firebase from "firebase";

const addProgramme = (programme) => {
  return async (dispatch) => {
    dispatch({ type: ADD_PROGRAMME_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("programmes")
        .get()
        .then(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            programme: doc.data().programme,
            id: doc.id,
          }));

          const isExists = await tempData.filter(
            (data) => data.programme === programme
          );
          // console.log("isExists", isExists);
          if (isExists.length === 0) {
            db.collection("programmes")
              .add({
                programme,
                timestamp,
              })
              .then(() => {
                dispatch({
                  type: ADD_PROGRAMME_SUCCESS,
                  payload: {
                    programme,
                    timestamp,
                  },
                });
              })
              .catch((err) => {
                dispatch({
                  type: ADD_PROGRAMME_FAILURE,
                  error: err,
                });
              });
          } else {
            dispatch({
              type: ADD_PROGRAMME_FAILURE,
              error: "data already exists",
            });
          }
        });
    } catch (err) {}
  };
};
const viewProgramme = () => {
  return async (dispatch) => {
    dispatch({ type: GET_PROGRAMME_REQUEST });
    try {
      db.collection("programmes")
        .orderBy("timestamp", "desc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            programme: doc.data().programme,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_PROGRAMME_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_PROGRAMME_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

export { addProgramme, viewProgramme };
