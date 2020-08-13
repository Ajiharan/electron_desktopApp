import {
    ADD_LECTURER_FAILURE,
    ADD_LECTURER_SUCCESS,
    ADD_LECTURER_REQUEST,
    GET_LECTURER_FAILURE,
    GET_LECTURER_SUCCESS,
    GET_LECTURER_REQUEST,
    GET_ONE_LECTURER_FAILURE,
    GET_ONE_LECTURER_REQUEST,
    GET_ONE_LECTURER_SUCCESS,
    UPDATE_LECTURER_FAILURE,
    UPDATE_LECTURER_REQUEST,
    UPDATE_LECTURER_SUCCESS
} from "./LecturerType";


const initialState = {
    loading: true,
    lecturer: {},
    error: "",
};

const LecturerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LECTURER_REQUEST:
            return { ...state, loading: true };
        case ADD_LECTURER_SUCCESS:
            return { ...state, loading: false, lecturer: action.payload, error: "" };
        case ADD_LECTURER_FAILURE:
            return { ...state, loading: false, error: action.error, lecturer: {} };
        default:
            return state;
    }
};

const get_lecturers = (
    state = { loading: true, lecturer: [], error: "" },
    action
) => {
    switch (action.type) {
        case GET_LECTURER_REQUEST:
            return { ...state, loading: true };
        case GET_LECTURER_SUCCESS:
            return { ...state, loading: false, lecturer: action.payload, error: "" };
        case GET_LECTURER_FAILURE:
            return { ...state, loading: false, error: action.error, lecturer: {} };
        default:
            return state;
    }
};

const update_lecturer_Reducer = (
    state = { loading: true, message: "", error: "" },
    action
) => {
    switch (action.type) {
        case UPDATE_LECTURER_REQUEST:
            return { ...state, loading: true };
        case UPDATE_LECTURER_SUCCESS:
            return { ...state, loading: false, message: action.message, error: "" };
        case UPDATE_LECTURER_FAILURE:
            return { ...state, loading: false, message: "", error: action.error };
        default:
            return state;
    }
};

const get_one_lecturerReducer = (
    state = { loading: true, lecturer: {}, error: "" },
    action
) => {
    switch (action.type) {
        case GET_ONE_LECTURER_REQUEST:
            return { ...state, loading: true };
        case GET_ONE_LECTURER_SUCCESS:
            return { ...state, loading: false, lecturer: action.payload, error: "" };
        case GET_ONE_LECTURER_FAILURE:
            return { ...state, loading: true, lecturer: {}, error: action.error };
        default:
            return state;
    }
};



export {LecturerReducer,get_lecturers,update_lecturer_Reducer,get_one_lecturerReducer};
