import { combineReducers } from "redux";
import {
  year_semiReducer,
  get_year_semiReducer,
  update_year_semiReducer,
  get_one_year_semisterReducer,
} from "./Year_semi/YearReducer";
import {
  addProgrammeReducer,
  viewProgrammeReducer,
  update_programmeReducer,
} from "./programme/programmeReducer";
import { LecturerReducer, get_lecturers } from "./Lecturer/LecturerReducer";
import { SubjectReducer } from "./Subject/SubjectReducer";

const rootReducer = combineReducers({
  year_semister: year_semiReducer,
  get_year_semister: get_year_semiReducer,
  update_year_semister: update_year_semiReducer,
  get_one_year_semister: get_one_year_semisterReducer,
  programme_add: addProgrammeReducer,
  get_programmmes: viewProgrammeReducer,
  update_programme: update_programmeReducer,
  LecturerReducer: LecturerReducer,
  get_lecturers: get_lecturers,
  SubjectReducer: SubjectReducer,
});

export default rootReducer;
