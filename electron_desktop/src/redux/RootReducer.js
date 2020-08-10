import { combineReducers } from "redux";
import {
  year_semiReducer,
  get_year_semiReducer,
} from "./Year_semi/YearReducer";

import {LecturerReducer,get_lecturers} from "./Lecturer/LecturerReducer";
import {SubjectReducer} from "./Subject/SubjectReducer";



const rootReducer = combineReducers({
  year_semister: year_semiReducer,
  get_year_semister: get_year_semiReducer,
  LecturerReducer : LecturerReducer,
  get_lecturers : get_lecturers,
  SubjectReducer : SubjectReducer

});

export default rootReducer;
