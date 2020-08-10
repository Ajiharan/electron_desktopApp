import {
    ADD_SUBJECT_FAILURE,
    ADD_SUBJECT_SUCCESS,
    ADD_SUBJECT_REQUEST,
    // GET_SUBJECT_FAILURE,
    // GET_SUBJECT_SUCCESS,
    // GET_SUBJECT_REQUEST
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

// const get_Subjects = (
//     state = { loading: true, subject: [], error: "" },
//     action
// ) => {
//     switch (action.type) {
//         case GET_SUBJECT_REQUEST:
//             return { ...state, loading: true };
//         case GET_SUBJECT_SUCCESS:
//             return { ...state, loading: false, subject: action.payload, error: "" };
//         case GET_SUBJECT_FAILURE:
//             return { ...state, loading: false, error: action.error, subject: {} };
//         default:
//             return state;
//     }
// };


export {SubjectReducer};
