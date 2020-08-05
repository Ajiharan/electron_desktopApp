import { combineReducers } from "redux";
import {
  year_semiReducer,
  get_year_semiReducer,
} from "./Year_semi/YearReducer";

import {LecturerReducer,get_lecturers} from "./Lecturer/LecturerReducer"


const rootReducer = combineReducers({
  year_semister: year_semiReducer,
  get_year_semister: get_year_semiReducer,
  LecturerReducer : LecturerReducer,
  get_lecturers : get_lecturers
});

export default rootReducer;
