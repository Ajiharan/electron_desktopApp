import {
    ADD_WORKINGDAYS_FAILURE,
    ADD_WORKINGDAYS_SUCCESS,
    ADD_WORKINGDAYS_REQUEST,
    GET_WORKINGDAYS_FAILURE,
    GET_WORKINGDAYS_SUCCESS,
    GET_WORKINGDAYS_REQUEST,
    GET_ONE_WORKINGDAYS_FAILURE,
    GET_ONE_WORKINGDAYS_REQUEST,
    GET_ONE_WORKINGDAYS_SUCCESS,
    UPDATE_WORKINGDAYS_FAILURE,
    UPDATE_WORKINGDAYS_REQUEST,
    UPDATE_WORKINGDAYS_SUCCESS
} from "./WorkingdaysType";

const initialState = {
    loading: true,
    workingdays: {},
    error: "",
};

const WorkingdaysReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WORKINGDAYS_REQUEST:
            return { ...state, loading: true };
        case ADD_WORKINGDAYS_SUCCESS:
            return { ...state, loading: false, workingdays: action.payload, error: "" };
        case ADD_WORKINGDAYS_FAILURE:
            return { ...state, loading: false, error: action.error, workingdays: {} };
        default:
            return state;
    }
};

const get_workingdays = (
    state = { loading: true, workingdays: [], error: "" },
    action
) => {
    switch (action.type) {
        case GET_WORKINGDAYS_REQUEST:
            return { ...state, loading: true };
        case GET_WORKINGDAYS_SUCCESS:
            return { ...state, loading: false, workingdays: action.payload, error: "" };
        case GET_WORKINGDAYS_FAILURE:
            return { ...state, loading: false, error: action.error, workingdays: {} };
        default:
            return state;
    }
};

const update_workingdays_Reducer = (
    state = { loading: true, message: "", error: "" },
    action
) => {
    switch (action.type) {
        case UPDATE_WORKINGDAYS_REQUEST:
            return { ...state, loading: true };
        case UPDATE_WORKINGDAYS_SUCCESS:
            return { ...state, loading: false, message: action.message, error: "" };
        case UPDATE_WORKINGDAYS_FAILURE:
            return { ...state, loading: false, message: "", error: action.error };
        default:
            return state;
    }
};

const get_one_workingdaysReducer = (
    state = { loading: true, Workingdays: {}, error: "" },
    action
) => {
    switch (action.type) {
        case GET_ONE_WORKINGDAYS_REQUEST:
            return { ...state, loading: true };
        case GET_ONE_WORKINGDAYS_SUCCESS:
            return { ...state, loading: false, workingdays: action.payload, error: "" };
        case GET_ONE_WORKINGDAYS_FAILURE:
            return { ...state, loading: true, workingdays: {}, error: action.error };
        default:
            return state;
    }
};



export {WorkingdaysReducer,get_workingdays,get_one_workingdaysReducer,update_workingdays_Reducer};
