import {combineReducers} from 'redux';
import year_semiReducer from './Year_semi/YearReducer';

const rootReducer=combineReducers({
    year_semister:year_semiReducer
});

export default rootReducer;