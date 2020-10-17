import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/home/Home";
import "./App.css";
import Navbar from "./screens/navbar/Navbar";
import Yearsemister from "./screens/year_semister/Yearsemister";
import ViewYearSemister from "./screens/year_semister/ViewYearSemister";
import AddLecturer from "./screens/Lecturer/AddLecturer";
import ViewLecturer from "./screens/Lecturer/ViewLecturer";
import UpdateLecturer from "./screens/Lecturer/UpdateLecturer";
import AddSubject from "./screens/Subject/AddSubject";
import ViewSubject from "./screens/Subject/ViewSubject";
import UpdateSubject from "./screens/Subject/UpdateSubject";
import UpdateYearSemister from "./screens/year_semister/UpdateYearSemister";
import StudentProgramme from "./screens/studentProgramme/StudentProgramme";
import ViewStudentProgramme from "./screens/studentProgramme/ViewStudentProgramme";
import ProgrammeUpdate from "./screens/studentProgramme/ProgrammeUpdate";
import StudentTag from "./screens/tag/StudentTag";
import StudentGroupId from "./screens/groupId/StudentGroupId";
import StudentGroupIdView from "./screens/groupId/ViewStudentGroupId";
import StudentGroupIdUpdate from "./screens/groupId/StudentGroupIdUpdate";
import StudentSubGroupId from "./screens/subgroupId/StudentSubGroupId";
import StudentSubGroupIdView from "./screens/subgroupId/StudentViewSubGroupId";
import StudentSubGroupIdUpdate from "./screens/subgroupId/StudentsubGroupIdUpdate";
import StudentTagView from "./screens/tag/StudentTagView";
import StudentTagUpdate from "./screens/tag/StudentTagUpdate";
import GenGroupId from "./screens/genGroupId/GenGroupId";
import GenSubGroupId from "./screens/genSubGroupId/GenSubGroupId";
import Building from "./screens/Location/Building";
import ViewBuilding from "./screens/Location/ViewBuilding";
import BuildingUpdate from "./screens/Location/BuildingUpdate";
import Room from "./screens/Room/Room";
import ViewRoom from "./screens/Room/ViewRoom";
import Addworkingdays from "./screens/Working_days/Addworkingdays";
import Viewworkingdays from "./screens/Working_days/Viewworkingdays";
import UpdateWorkingdays from "./screens/Working_days/Updateworkingdays";
import UpdateRoom from "./screens/Room/RoomUpdate";
import ViewStudentDetail from "./screens/view_studentDetail/ViewStudentDetail";
import ViewStatistics from "./screens/statistics/ViewStatistics";
import ConsecutiveSession from "./screens/consecutive_sessions/Consecutive";
import ParallelSession from "./screens/parallel/ParllelSession";
import AddSession from "./screens/session/AddSession";
import ViewSession from "./screens/session/ViewSession";
import NotAllocated from "./screens/notAllocated/NotAllocated";
import GenerateTimetable from "./screens/generate_timetables/main";
import Lecturer_table from "./screens/generate_timetables/lecturer_table";
import Student_table from "./screens/generate_timetables/student_timetable";
import Location_table from "./screens/generate_timetables/location_table";
import SuitableRoom from "./screens/suitableRooms/SuitableRoom";
import SuitableLecturer from "./screens/suitableLecturer/SuitableLecturer";
import OverlapSession from "./screens/overlap/OverlapSession";
import suitableSession from "./screens/suitableSession/SuitableSession";
import SuitableGroupId from "./screens/suitableGroupId/SuitableGroupId";
import TimeTable_lecturer from "./screens/generate_timetables/timetable_lecturer";
import TimeTable_location from "./screens/generate_timetables/timetable_location";
import TimeTable_student from "./screens/generate_timetables/timetable_student";
import Lec_timetable from "./screens/generate_lecturertimetable/lec_timetable";
import stud_timetable from "./screens/generate_studenttimetable/stud_timetable";
import loca_timetable from "./screens/generate_locationtimetable/loca_timetable";
import PreferredRoom from "./screens/preferredRoom/PreferredRoom";
import UpdateSession from "./screens/session/UpdateSession";
import ReservedTime from "./screens/reservedTime/ReservedTime";
import SessionOverView from "./screens/session/SessionOverView";

function App() {
  return (
    <React.Fragment>
      <HashRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/reservedTime/add" component={ReservedTime} />
          <Route exact path="/PreferredRoom/add" component={PreferredRoom} />
          <Route exact path="/overlap/add" component={OverlapSession} />
          <Route
            exact
            path="/suitableLecturer/add"
            component={SuitableLecturer}
          />
          <Route
            exact
            path="/suitableGroupId/add"
            component={SuitableGroupId}
          />
          <Route
            exact
            path="/suitableSession/add"
            component={suitableSession}
          />
          <Route
            exact
            path="/suitableLecturer/add"
            component={SuitableLecturer}
          />
          <Route exact path="/suitableRoom/add" component={SuitableRoom} />
          <Route exact path="/notAllocated" component={NotAllocated} />
          <Route exact path="/consecutive" component={ConsecutiveSession} />
          <Route exact path="/parallel" component={ParallelSession} />
          <Route exact path="/session/add" component={AddSession} />
          <Route
              exact
              path="/session/overView"
              component={SessionOverView}
          />
          <Route exact path="/session/view" component={ViewSession} />
          <Route exact path="/session/update" component={UpdateSession} />
          <Route
            exact
            path="/student/generate/subId"
            component={GenSubGroupId}
          />
          <Route exact path="/student/statistic" component={ViewStatistics} />
          <Route exact path="/student/viewAll" component={ViewStudentDetail} />
          <Route exact path="/student/generate/Id" component={GenGroupId} />
          <Route
            exact
            path="/student/year_semister/add"
            component={Yearsemister}
          />
          <Route
            exact
            path="/student/year_semister/view"
            component={ViewYearSemister}
          />
          <Route
            exact
            path="/student/year_semister/update"
            component={UpdateYearSemister}
          />
          <Route
            exact
            path="/student/programme/add"
            component={StudentProgramme}
          />

          <Route
            exact
            path="/student/programme/view"
            component={ViewStudentProgramme}
          />

          <Route
            exact
            path="/student/programme/update"
            component={ProgrammeUpdate}
          />
          <Route
            exact
            path="/student/group_id/add"
            component={StudentGroupId}
          />
          <Route
            exact
            path="/student/group_id/view"
            component={StudentGroupIdView}
          />
          <Route
            exact
            path="/student/group_id/update"
            component={StudentGroupIdUpdate}
          />
          <Route
            exact
            path="/student/subgroup_id/add"
            component={StudentSubGroupId}
          />
          <Route
            exact
            path="/student/subgroup_id/view"
            component={StudentSubGroupIdView}
          />
          <Route
            exact
            path="/student/subgroup_id/update"
            component={StudentSubGroupIdUpdate}
          />
          <Route exact path="/student/tag/add" component={StudentTag} />
          <Route exact path="/student/tag/view" component={StudentTagView} />
          <Route
            exact
            path="/student/tag/update"
            component={StudentTagUpdate}
          />
          <Route exact path="/lecturer/add" component={AddLecturer} />
          <Route exact path="/lecturer/update" component={UpdateLecturer} />
          <Route exact path="/lecturer/view" component={ViewLecturer} />
          <Route exact path="/subject/add" component={AddSubject} />
          <Route exact path="/subject/view" component={ViewSubject} />
          <Route exact path="/subject/update" component={UpdateSubject} />
          <Route exact path="/location/building/add" component={Building} />
          <Route
            exact
            path="/location/building/view"
            component={ViewBuilding}
          />
          <Route
            exact
            path="/location/building/update"
            component={BuildingUpdate}
          />
          <Route exact path="/room/room/add" component={Room} />
          <Route exact path="/room/room/view" component={ViewRoom} />
          <Route exact path="/room/room/update" component={UpdateRoom} />
          <Route exact path="/workingdays/add" component={Addworkingdays} />
          <Route exact path="/workingdays/view" component={Viewworkingdays} />
          <Route
            exact
            path="/workingdays/update"
            component={UpdateWorkingdays}
          />
          <Route
            exact
            path="/generate_timetables/main"
            component={GenerateTimetable}
          />
          <Route
            exact
            path="/generate_timetables/lecturer_table"
            component={Lecturer_table}
          />
          <Route
            exact
            path="/generate_timetables/student_timetable"
            component={Student_table}
          />
          <Route
            exact
            path="/generate_timetables/location_table"
            component={Location_table}
          />
          <Route
            exact
            path="/generate_timetables/timetable_lecturer"
            component={TimeTable_lecturer}
          />
          <Route
            exact
            path="/generate_timetables/timetable_location"
            component={TimeTable_location}
          />
          <Route
            exact
            path="/generate_timetables/timetable_student"
            component={TimeTable_student}
          />
          <Route
            exact
            path="/generate_lecturertimetable/lec_timetable"
            component={Lec_timetable}
          />
          <Route
            exact
            path="/generate_lecturertimetable/stud_timetable"
            component={stud_timetable}
          />
          <Route
            exact
            path="/generate_locationtimetable/loca_timetable"
            component={loca_timetable}
          />
        </Switch>
      </HashRouter>
    </React.Fragment>
  );
}

export default React.memo(App);
