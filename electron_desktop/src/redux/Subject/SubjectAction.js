import {
    ADD_SUBJECT_REQUEST,
    ADD_SUBJECT_SUCCESS,
    ADD_SUBJECT_FAILURE
    // GET_SUBJECT_REQUEST,
    // GET_SUBJECT_SUCCESS,
    // GET_SUBJECT_FAILURE
} from "./SubjectType";
import firebase from "firebase";
import { db } from "../../firebase";

const addSubject = (subject_name,subject_code,subject_off_year,subject_off_semi,subject_lec_hrs,subject_tut_hrs,subject_lab_hrs,subject_eval_hrs) => {
    return async (dispatch) => {
        dispatch({ type: ADD_SUBJECT_REQUEST });
        try {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            db.collection("subjects")
                .get()
                .then(async (snapshot) => {
                    const tempData = await snapshot.docs.map((doc) => ({
                        sub_id: doc.data().sub_id,
                        id: doc.id,
                    }));

                    const isExists = await tempData.filter(
                        (data) => data.sub_id === subject_code
                    );
                    // console.log("isExists", isExists);
                    if (isExists.length === 0) {
                        db.collection("subjects")
                            .add({
                                sub_id: subject_code,
                                sub_name : subject_name,
                                sub_off_year:subject_off_year,
                                sub_off_semi:subject_lec_hrs,
                                sub_lec_hrs:subject_off_semi,
                                sub_tut_hrs:subject_tut_hrs,
                                sub_lab_hrs:subject_lab_hrs,
                                sub_eva_hrs:subject_eval_hrs
                            })
                            .then(() => {
                                dispatch({
                                    type: ADD_SUBJECT_SUCCESS,
                                    payload: {
                                        sub_id: subject_code,
                                        sub_name : subject_name,
                                        sub_off_year:subject_off_year,
                                        sub_off_semi:subject_off_semi,
                                        sub_lec_hrs:subject_lec_hrs,
                                        sub_tut_hrs:subject_tut_hrs,
                                        sub_lab_hrs:subject_lab_hrs,
                                        sub_eva_hrs:subject_eval_hrs,
                                        timestamp,
                                    },
                                });
                            })
                            .catch((err) => {
                                dispatch({
                                    type: ADD_SUBJECT_FAILURE,
                                    error: err,
                                });
                            });
                    } else {
                        dispatch({
                            type: ADD_SUBJECT_FAILURE,
                            error: "Data already exists",
                        });
                    }
                });
        } catch (err) {}
    };
};

// const viewSubject = () => {
//     return async (dispatch) => {
//         dispatch({ type: GET_SUBJECT_REQUEST });
//         try {
//             db.collection("subject")
//                 .get()
//                 .then(async (snapshot) => {
//                     const tempData = await snapshot.docs.map((doc) => ({
//                         sub_id: doc.data().sub_id,
//                         sub_name : doc.data().sub_name,
//                         sub_off_year:doc.data().sub_off_year,
//                         sub_off_semi:doc.data().sub_off_semi,
//                         sub_lec_hrs:doc.data().sub_lec_hrs,
//                         sub_tut_hrs:doc.data().sub_tut_hrs,
//                         sub_lab_hrs:doc.data().sub_lab_hrs,
//                         sub_eva_hrs:doc.data().sub_eva_hrs,
//                         id: doc.id,
//                         timestamp: doc.data().timestamp,
//                     }));
//                     console.log("getTemp Data", tempData);
//                     dispatch({
//                         type: GET_SUBJECT_SUCCESS,
//                         payload: tempData,
//                     });
//                 })
//                 .catch((err) => {
//                     dispatch({
//                         type: GET_SUBJECT_FAILURE,
//                         error: err,
//                     });
//                 });
//         } catch (err) {}
//     };
// };



export {addSubject};
