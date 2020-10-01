import {
    ADD_STUDENTTIMETABLE_FAILURE,
    ADD_STUDENTTIMETABLE_REQUEST,
    ADD_STUDENTTIMETABLE_SUCCESS,
    GET_STUDENTTIMETABLE_FAILURE,
    GET_STUDENTTIMETABLE_REQUEST,
    GET_STUDENTTIMETABLE_SUCCESS,
  } from "./studenttimetableType";
  import { db } from "../../firebase";
  import firebase from "firebase";
  
  const Addstudenttimetable = (studenttimetabledata) => {
      return async (dispatch) => {
          dispatch({ type: ADD_STUDENTTIMETABLE_REQUEST });
          try {
              const timestamp = firebase.firestore.FieldValue.serverTimestamp();
              db.collection("student_timetable")
                  .get()
                  .then(async (snapshot) => {
                      const tempData = await snapshot.docs.map((doc) => ({
                          id: doc.id,
                      }));
  
                          db.collection("student_timetable")
                              .add({
                                  ...studenttimetabledata
                              })
                              .then(() => {
                                  dispatch({
                                      type: ADD_STUDENTTIMETABLE_SUCCESS,
                                      payload: {
                                          ...studenttimetabledata,
                                          timestamp,
                                      },
                                  });
                              })
                              .catch((err) => {
                                  dispatch({
                                      type: ADD_STUDENTTIMETABLE_FAILURE,
                                      error: err,
                                  });
                              });
                  });
          } catch (err) {}
      };
  };
  

  
  export { Addstudenttimetable };
  