import {
    ADD_SESSION_FAILURE,
    ADD_SESSION_REQUEST,
    ADD_SESSION_SUCCESS,
    GET_SESSION_FAILURE,
    GET_SESSION_REQUEST,
    GET_SESSION_SUCCESS, UPDATE_SESSION_FAILURE, UPDATE_SESSION_REQUEST, UPDATE_SESSION_SUCCESS,
} from "./sessionType";
import { db } from "../../firebase";
import firebase from "firebase";
import {UPDATE_LECTURER_FAILURE, UPDATE_LECTURER_REQUEST, UPDATE_LECTURER_SUCCESS} from "../Lecturer/LecturerType";

const addSession = (sessiondata) => {
    return async (dispatch) => {
        dispatch({ type: ADD_SESSION_REQUEST });
        try {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            db.collection("sessions")
                .get()
                .then(async (snapshot) => {
                    const tempData = await snapshot.docs.map((doc) => ({
                        id: doc.id,
                    }));

                        db.collection("sessions")
                            .add({
                                ...sessiondata
                            })
                            .then(() => {
                                dispatch({
                                    type: ADD_SESSION_SUCCESS,
                                    payload: {
                                        ...sessiondata,
                                        timestamp,
                                    },
                                });
                            })
                            .catch((err) => {
                                dispatch({
                                    type: ADD_SESSION_FAILURE,
                                    error: err,
                                });
                            });
                });
        } catch (err) {}
    };
};

const UpdateSessionDetails = (updateDetails) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_SESSION_REQUEST });
        try {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            db.collection("sessions")
                .doc(updateDetails.doc_id)
                .set(
                    {
                        subCode: updateDetails.subCode,
                        selectedValueSubject : updateDetails.selectedValueSubject,
                        selectedValueGroup: updateDetails.selectedValueGroup,
                        selectedValueTag:updateDetails.selectedValueTag,
                        selectedValueLecturer:updateDetails.selectedValueLecturer,
                        noOfstudents:updateDetails.noOfstudents,
                        timeDuration:updateDetails.timeDuration,
                        timestamp,
                    },
                    { merge: true }
                )
                .then(() => {
                    dispatch({
                        type: UPDATE_SESSION_SUCCESS,
                        message: "upload Sucessfully",
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: UPDATE_SESSION_FAILURE,
                        error: err,
                    });
                });
        } catch (err) {
            dispatch({
                type: UPDATE_SESSION_FAILURE,
                error: err,
            });
        }
    };
};

const viewSessions = () => {
    return async (dispatch) => {
        dispatch({ type: GET_SESSION_REQUEST });
        try {
            db.collection("sessions")
                .onSnapshot(async (snapshot) => {
                    const tempData = await snapshot.docs.map((doc) => ({
                        subCode: doc.data().subCode,
                        selectedValueSubject : doc.data().selectedValueSubject,
                        selectedValueGroup: doc.data().selectedValueGroup,
                        selectedValueTag:doc.data().selectedValueTag,
                        selectedValueLecturer:doc.data().selectedValueLecturer,
                        noOfstudents:doc.data().noOfstudents,
                        timeDuration:doc.data().timeDuration,
                        id: doc.id,
                        timestamp: doc.data().timestamp,
                    }));
                    console.log("getTemp Data", tempData);
                    dispatch({
                        type: GET_SESSION_SUCCESS,
                        payload: tempData,
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: GET_SESSION_FAILURE,
                        error: err,
                    });
                });
        } catch (err) {}
    };
};

export { addSession, viewSessions,UpdateSessionDetails };
