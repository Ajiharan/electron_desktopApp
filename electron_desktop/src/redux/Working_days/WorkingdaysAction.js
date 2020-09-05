//redux  working days action

import {
    ADD_WORKINGDAYS_REQUEST,
    ADD_WORKINGDAYS_SUCCESS,
    ADD_WORKINGDAYS_FAILURE, 
    GET_WORKINGDAYS_REQUEST, 
    GET_WORKINGDAYS_SUCCESS, 
    GET_WORKINGDAYS_FAILURE,
    GET_ONE_WORKINGDAYS_FAILURE,
    GET_ONE_WORKINGDAYS_REQUEST,
    GET_ONE_WORKINGDAYS_SUCCESS,
    UPDATE_WORKINGDAYS_FAILURE,
    UPDATE_WORKINGDAYS_REQUEST,
    UPDATE_WORKINGDAYS_SUCCESS
} from "./WorkingdaysType";
import firebase from "firebase";
import { db } from "../../firebase";

const addWorkingdays = (lecturer_name,workingdays_per_week,working_days,workinghours_per_day,time_slot) => {
    return async (dispatch) => {
        dispatch({ type: ADD_WORKINGDAYS_REQUEST });
        try {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            db.collection("workingdays")
                .get()
                .then(async (snapshot) => {
                    const tempData = await snapshot.docs.map((doc) => ({
                        name : doc.data().name,
                        id: doc.id
                    }));

                    const isExists = await tempData.filter(
                        (data) => data.name === lecturer_name
                    );
                    console.log("isExists", isExists);
                    if (isExists.length === 0) {
                        db.collection("workingdays")
                            .add({
                                // emp_id: lecturer_emp_id,
                                name : lecturer_name,
                                daysnum:workingdays_per_week,
                                days:working_days,
                                hours:workinghours_per_day,
                                timeslot:time_slot,
                                
                            })
                            .then(() => {
                                dispatch({
                                    type:  ADD_WORKINGDAYS_SUCCESS,
                                    payload: {
                                        // emp_id: lecturer_emp_id,
                                        name : lecturer_name,
                                        daysnum:workingdays_per_week,
                                        days:working_days,
                                        hours:workinghours_per_day,
                                        timeslot:time_slot,
                                        timestamp,
                                    },
                                });
                            })
                            .catch((err) => {
                                dispatch({
                                    type: ADD_WORKINGDAYS_FAILURE,
                                    error: err,
                                });
                            });
                    } else {
                        dispatch({
                            type: ADD_WORKINGDAYS_FAILURE,
                            error: "Data already exists",
                        });
                    }
                });
        } catch (err) {}
    };
};

const viewWorkingdays = () => {
    return async (dispatch) => {
        dispatch({ type: GET_WORKINGDAYS_REQUEST });
        try {
            db.collection("workingdays")
                // .orderBy("name", "asc")
                .onSnapshot(async (snapshot) => {
                    const tempData = await snapshot.docs.map((doc) => ({
                      
                        name : doc.data().name,
                        daysnum:doc.data().daysnum,
                        days:doc.data().days,
                        hours:doc.data().hours,
                        timeslot:doc.data().timeslot,
                        id: doc.id,
                        timestamp: doc.data().timestamp,
                    }));
                    console.log("getTemp Data", tempData);
                    dispatch({
                        type: GET_WORKINGDAYS_SUCCESS,
                        payload: tempData,
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: GET_WORKINGDAYS_FAILURE,
                        error: err,
                    });
                });
        } catch (err) {}
    };
};

const UpdateWorkingdaysDetails = (doc_id,update_name,update_daysnum,update_days,update_hours,update_timeslot) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_WORKINGDAYS_REQUEST });
        try {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            db.collection("workingdays")
                .doc(doc_id)
                .set(
                    {
                        
                        name : update_name,
                        daysnum:update_daysnum,
                        days:update_days,
                        hours:update_hours,
                        timeslot:update_timeslot,
                        timestamp,
                    },
                    { merge: true }
                )
                .then(() => {
                    dispatch({
                        type: UPDATE_WORKINGDAYS_SUCCESS,
                        message: "upload Sucessfully",
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: UPDATE_WORKINGDAYS_FAILURE,
                        error: err,
                    });
                });
        } catch (err) {
            dispatch({
                type: UPDATE_WORKINGDAYS_FAILURE,
                error: err,
            });
        }
    };
};

const getOneWorkingdaysDetail = (doc_id) => {
    return async (dispatch) => {
        dispatch({ type: GET_ONE_WORKINGDAYS_REQUEST });
        try {
            db.collection("workingdays")
                .doc(doc_id)
                .get()
                .then(async (doc) => {
                    if (doc.exists) {
                        const tempData = await {
                          
                            name : doc.data().name,
                            daysnum:doc.data().daysnum,
                            days:doc.data().days,
                            hours:doc.data().hours,
                            timeslot:doc.data().timeslot,
                            id: doc.id,
                            timestamp: doc.data().timestamp,
                        };
                        console.log("getOneDoc", tempData);
                        dispatch({
                            type: GET_ONE_WORKINGDAYS_SUCCESS,
                            payload: tempData,
                        });
                    } else {
                        dispatch({
                            type: GET_ONE_WORKINGDAYS_FAILURE,
                            error: "Sorry Data does not exist",
                        });
                    }
                });
        } catch (err) {}
    };
};


export { addWorkingdays,viewWorkingdays,UpdateWorkingdaysDetails,getOneWorkingdaysDetail };
