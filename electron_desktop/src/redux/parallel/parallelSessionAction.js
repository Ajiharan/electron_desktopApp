import {
  ADD_PARALLEL_SESSION_FAILURE,
  ADD_PARALLEL_SESSION_REQUEST,
  ADD_PARALLEL_SESSION_SUCCESS,
  GET_PARALLEL_SESSION_FAILURE,
  GET_PARALLEL_SESSION_REQUEST,
  GET_PARALLEL_SESSION_SUCCESS,
} from "./parallelSessionType";
import { db } from "../../firebase";
import firebase from "firebase";

const addParallelSessions = (start_time, duration, pdate, session) => {
  return async (dispatch) => {
    dispatch({ type: ADD_PARALLEL_SESSION_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("parallel_sessions")
        .get()
        .then(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            start_time: doc.data().start_time,
            duration: doc.data().duration,
            pdate: doc.data().pdate,
            session: doc.data().session,
            id: doc.id,
          }));

          const isExists = await tempData.filter(
            (data) => data.start_time === start_time && data.pdate === pdate
          );

          if (isExists.length === 0) {
            db.collection("parallel_sessions")
              .add({
                start_time,
                duration,
                pdate,
                session,
                timestamp,
              })
              .then(() => {
                dispatch({
                  type: ADD_PARALLEL_SESSION_SUCCESS,
                  payload: {
                    start_time,
                    duration,
                    pdate,
                    session,
                    timestamp,
                  },
                });
              })
              .catch((err) => {
                dispatch({
                  type: ADD_PARALLEL_SESSION_FAILURE,
                  error: err,
                });
              });
          } else {
            dispatch({
              type: ADD_PARALLEL_SESSION_FAILURE,
              error: "data already exists",
            });
          }
        });
    } catch (err) {}
  };
};

const viewParallelSessions = () => {
  return async (dispatch) => {
    dispatch({ type: GET_PARALLEL_SESSION_REQUEST });
    try {
      db.collection("consecutive_sessions")
        .orderBy("timestamp", "desc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            start_time: doc.data().start_time,
            duration: doc.data().duration,
            pdate: doc.data().pdate,
            session: doc.data().session,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          //   console.log("getTemp Data", tempData);
          dispatch({
            type: GET_PARALLEL_SESSION_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_PARALLEL_SESSION_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export { addParallelSessions, viewParallelSessions };
