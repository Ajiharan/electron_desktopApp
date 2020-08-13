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
import {
  groupId_addReducer,
  get_groupIdReducer,
  update_groupIdReducer,
} from "./groupId/GroupIdReducer";
import { LecturerReducer, get_lecturers } from "./Lecturer/LecturerReducer";
import { SubjectReducer } from "./Subject/SubjectReducer";
import {
  sub_groupIdReducer,
  get_SubGroupIdReducer,
  update_subgroupIdReducer,
} from "./subgroupId/SubGroupIdReducer";
import { get_tagReducer, tagReducer } from "./tag/TagReducer";

const rootReducer = combineReducers({
  year_semister: year_semiReducer,
  get_year_semister: get_year_semiReducer,
  update_year_semister: update_year_semiReducer,
  get_one_year_semister: get_one_year_semisterReducer,
  programme_add: addProgrammeReducer,
  get_programmmes: viewProgrammeReducer,
  update_programme: update_programmeReducer,
  groupid_add: groupId_addReducer,
  get_groupId: get_groupIdReducer,
  update_groupId: update_groupIdReducer,
  LecturerReducer: LecturerReducer,
  get_lecturers: get_lecturers,
  SubjectReducer: SubjectReducer,
  sub_groupId_add: sub_groupIdReducer,
  get_SubGroupId: get_SubGroupIdReducer,
  update_subgroupId: update_subgroupIdReducer,
  tag_add: tagReducer,
  get_tag: get_tagReducer,
});

export default rootReducer;
