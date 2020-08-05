import {
    ADD_LECTURER_REQUEST,
    ADD_LECTURER_SUCCESS,
    ADD_LECTURER_FAILURE, GET_LECTURER_REQUEST, GET_LECTURER_SUCCESS, GET_LECTURER_FAILURE
} from "./LecturerType";
import firebase from "firebase";
import { db } from "../../firebase";

const addLecturer = (lecturer_name,lecturer_emp_id,lecturer_faculty,lecturer_center,lecturer_department,lecturer_building,lecturer_level,lecturer_rank) => {
    return async (dispatch) => {
        dispatch({ type: ADD_LECTURER_REQUEST });
        try {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            db.collection("lecturers")
                .get()
                .then(async (snapshot) => {
                    const tempData = await snapshot.docs.map((doc) => ({
                        emp_id: doc.data().emp_id,
                        id: doc.id,
                    }));

                    const isExists = await tempData.filter(
                        (data) => data.emp_id === lecturer_emp_id
                    );
                    // console.log("isExists", isExists);
                    if (isExists.length === 0) {
                        db.collection("lecturers")
                            .add({
                                emp_id: lecturer_emp_id,
                                name : lecturer_name,
                                faculty:lecturer_faculty,
                                department:lecturer_department,
                                center:lecturer_center,
                                building:lecturer_building,
                                level:lecturer_level,
                                rank:lecturer_rank
                            })
                            .then(() => {
                                dispatch({
                                    type: ADD_LECTURER_SUCCESS,
                                    payload: {
                                        emp_id: lecturer_emp_id,
                                        name : lecturer_name,
                                        faculty:lecturer_faculty,
                                        department:lecturer_department,
                                        center:lecturer_center,
                                        building:lecturer_building,
                                        level:lecturer_level,
                                        rank:lecturer_rank,
                                        timestamp,
                                    },
                                });
                            })
                            .catch((err) => {
                                dispatch({
                                    type: ADD_LECTURER_FAILURE,
                                    error: err,
                                });
                            });
                    } else {
                        dispatch({
                            type: ADD_LECTURER_FAILURE,
                            error: "data already exists",
                        });
                    }
                });
        } catch (err) {}
    };
};

const viewLecturer = () => {
    return async (dispatch) => {
        dispatch({ type: GET_LECTURER_REQUEST });
        try {
            db.collection("lecturers")
                .get()
                .then(async (snapshot) => {
                    const tempData = await snapshot.docs.map((doc) => ({
                        emp_id: doc.data().emp_id,
                        name : doc.data().name,
                        faculty:doc.data().faculty,
                        department:doc.data().department,
                        center:doc.data().center,
                        building:doc.data().building,
                        level:doc.data().level,
                        rank:doc.data().rank,
                        id: doc.id,
                        timestamp: doc.data().timestamp,
                    }));
                    console.log("getTemp Data", tempData);
                    dispatch({
                        type: GET_LECTURER_SUCCESS,
                        payload: tempData,
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: GET_LECTURER_FAILURE,
                        error: err,
                    });
                });
        } catch (err) {}
    };
};



export { addLecturer,viewLecturer };
