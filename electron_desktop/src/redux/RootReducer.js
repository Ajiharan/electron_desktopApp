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

import {
  LecturerReducer,
  get_lecturers,
  update_lecturer_Reducer,
} from "./Lecturer/LecturerReducer";

import {
  get_Subjects,
  SubjectReducer,
  update_subject_Reducer,
} from "./Subject/SubjectReducer";

import {
  sub_groupIdReducer,
  get_SubGroupIdReducer,
  update_subgroupIdReducer,
} from "./subgroupId/SubGroupIdReducer";

import {
  get_tagReducer,
  tagReducer,
  update_tagReducer,
} from "./tag/TagReducer";

import {
  genGroupId_addReducer,
  get_genGroupIdReducer,
} from "./genId/genIdReducer";
import {
  genSubGroupId_addReducer,
  get_genSubGroupIdReducer,
} from "./gensubId/genSubIdReducer";

import {
  add_BuildingReducer,
  view_BuildingReducer,
  update_BuildingReducer,
} from "./Building/BuildingReducer";

import {
  add_RoomReducer,
  view_RoomReducer,
  update_RoomReducer,
} from "./Room/RoomReducer";

import {
  WorkingdaysReducer,
  get_workingdays,
  update_workingdays_Reducer,
} from "./Working_days/WorkingdaysReducer";

import {
  consecutiveSession_addReducer,
  get_consecutiveSessionReducer,
} from "./consecutive/consecutiveReducer";

import {
  parallelSession_addReducer,
  get_parallelSessionReducer,
} from "./parallel/parallelSessionReducer";

import { get_session, session_addReducer } from "./session/sessionReducer";

import {
  allocated_addReducer,
  allocated_getReducer,
} from "./notAllocated/notAllocatedReducer";

import { addSuitableRoomReducer } from "./suitableRoom/SuitableRoomReducer";
import{addSuitableLecturerReducer} from "./SuitableLecturer/SuitableLecturerReducer";

const rootReducer = combineReducers({
  addSuitableLecturer:addSuitableLecturerReducer,
  addSuitableRoom: addSuitableRoomReducer,
  add_notAllocated: allocated_addReducer,
  get_notAllocated: allocated_getReducer,
  add_Session: session_addReducer,
  get_Session: get_session,
  add_parallelSession: parallelSession_addReducer,
  get_parallelSession: get_parallelSessionReducer,
  add_consecutiveSession: consecutiveSession_addReducer,
  get_consecutiveSession: get_consecutiveSessionReducer,
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
  Update_lecturer: update_lecturer_Reducer,
  SubjectReducer: SubjectReducer,
  get_subjects: get_Subjects,
  Update_Subject: update_subject_Reducer,
  sub_groupId_add: sub_groupIdReducer,
  get_SubGroupId: get_SubGroupIdReducer,
  update_subgroupId: update_subgroupIdReducer,
  tag_add: tagReducer,
  get_tag: get_tagReducer,
  update_tag: update_tagReducer,
  genGroupId: genGroupId_addReducer,
  get_genGroupId: get_genGroupIdReducer,
  genSubGroupId: genSubGroupId_addReducer,
  get_genSubGroupId: get_genSubGroupIdReducer,
  building_add: add_BuildingReducer,
  get_building: view_BuildingReducer,
  update_building: update_BuildingReducer,
  room_add: add_RoomReducer,
  get_room: view_RoomReducer,
  update_room: update_RoomReducer,
  WorkingdaysReducer: WorkingdaysReducer,
  get_workingdays: get_workingdays,
  update_workingdays: update_workingdays_Reducer,
});

export default rootReducer;
