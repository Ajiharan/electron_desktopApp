import {
    ADD_LECTURERTIMETABLE_FAILURE,
    ADD_LECTURERTIMETABLE_REQUEST,
    ADD_LECTURERTIMETABLE_SUCCESS,
    GET_LECTURERTIMETABLE_FAILURE,
    GET_LECTURERTIMETABLE_REQUEST,
    GET_LECTURERTIMETABLE_SUCCESS,
  } from "./lecturerType";
  import { db } from "../../firebase";
  import firebase from "firebase";
  
  const Addlecturertimetable = (lecturertimetabledata) => {
      return async (dispatch) => {
          dispatch({ type: ADD_LECTURERTIMETABLE_REQUEST });
          try {
              const timestamp = firebase.firestore.FieldValue.serverTimestamp();
              db.collection("lecturer_timetable")
                  .get()
                  .then(async (snapshot) => {
                      const tempData = await snapshot.docs.map((doc) => ({
                          id: doc.id,
                      }));
  
                          db.collection("lecturer_timetable")
                              .add({
                                  ...lecturertimetabledata
                              })
                              .then(() => {
                                  dispatch({
                                      type: ADD_LECTURERTIMETABLE_SUCCESS,
                                      payload: {
                                          ...lecturertimetabledata,
                                          timestamp,
                                      },
                                  });
                              })
                              .catch((err) => {
                                  dispatch({
                                      type: ADD_LECTURERTIMETABLE_FAILURE,
                                      error: err,
                                  });
                              });
                  });
          } catch (err) {}
      };
  };
  

  
  export { Addlecturertimetable };
  