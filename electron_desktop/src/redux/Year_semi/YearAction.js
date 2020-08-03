import {
  ADD_YEAR_SEMISTER_FAILURE,
  ADD_YEAR_SEMISTER_SUCCESS,
  ADD_YEAR_SEMISTER_REQUEST,
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
          console.log("isExists", isExists);
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

export { addSemisterYear };
