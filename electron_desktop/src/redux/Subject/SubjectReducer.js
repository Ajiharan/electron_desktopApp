import {
    ADD_SUBJECT_FAILURE,
    ADD_SUBJECT_SUCCESS,
    ADD_SUBJECT_REQUEST,
    GET_SUBJECT_FAILURE,
    GET_SUBJECT_SUCCESS,
    GET_SUBJECT_REQUEST,
    UPDATE_SUBJECT_REQUEST,
    UPDATE_SUBJECT_SUCCESS,
    UPDATE_SUBJECT_FAILURE,
    GET_ONE_SUBJECT_REQUEST,
    GET_ONE_SUBJECT_SUCCESS, GET_ONE_SUBJECT_FAILURE
} from "./SubjectType";

const initialState = {
    loading: true,
    subject: {},
    error: "",
};

const SubjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SUBJECT_REQUEST:
            return { ...state, loading: true };
        case ADD_SUBJECT_SUCCESS:
            return { ...state, loading: false, subject: action.payload, error: "" };
        case ADD_SUBJECT_FAILURE:
            return { ...state, loading: false, error: action.error, subject: {} };
        default:
            return state;
    }
};

const get_Subjects = (
    state = { loading: true, subject: [], error: "" },
    action
) => {
    switch (action.type) {
        case GET_SUBJECT_REQUEST:
            return { ...state, loading: true };
        case GET_SUBJECT_SUCCESS:
            return { ...state, loading: false, subject: action.payload, error: "" };
        case GET_SUBJECT_FAILURE:
            return { ...state, loading: false, error: action.error, subject: {} };
        default:
            return state;
    }
};

const update_subject_Reducer = (
    state = { loading: true, message: "", error: "" },
    action
) => {
    switch (action.type) {
        case UPDATE_SUBJECT_REQUEST:
            return { ...state, loading: true };
        case UPDATE_SUBJECT_SUCCESS:
            return { ...state, loading: false, message: action.message, error: "" };
        case UPDATE_SUBJECT_FAILURE:
            return { ...state, loading: false, message: "", error: action.error };
        default:
            return state;
    }
};

const get_one_SubjectReducer = (
    state = { loading: true, subject: {}, error: "" },
    action
) => {
    switch (action.type) {
        case GET_ONE_SUBJECT_REQUEST:
            return { ...state, loading: true };
        case GET_ONE_SUBJECT_SUCCESS:
            return { ...state, loading: false, subject: action.payload, error: "" };
        case GET_ONE_SUBJECT_FAILURE:
            return { ...state, loading: true, subject: {}, error: action.error };
        default:
            return state;
    }
};



export {SubjectReducer,get_Subjects,update_subject_Reducer,get_one_SubjectReducer};
