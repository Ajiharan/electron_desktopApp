import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/home/Home";
import "./App.css";
import Navbar from "./screens/navbar/Navbar";
import Yearsemister from "./screens/year_semister/Yearsemister";
import ViewYearSemister from "./screens/year_semister/ViewYearSemister";
import AddLecturer from "./screens/Lecturer/AddLecturer";
import ViewLecturer from "./screens/Lecturer/ViewLecturer";
import AddSubject from "./screens/Subject/AddSubject";
import UpdateYearSemister from "./screens/year_semister/UpdateYearSemister";
import StudentProgramme from "./screens/studentProgramme/StudentProgramme";
import ViewStudentProgramme from "./screens/studentProgramme/ViewStudentProgramme";
import ProgrammeUpdate from "./screens/studentProgramme/ProgrammeUpdate";
import StudentGroupId from "./screens/groupId/StudentGroupId";
import StudentGroupIdView from "./screens/groupId/ViewStudentGroupId";
import StudentGroupIdUpdate from "./screens/groupId/StudentGroupIdUpdate";
import StudentSubGroupId from "./screens/subgroupId/StudentSubGroupId";
import StudentSubGroupIdView from "./screens/subgroupId/StudentViewSubGroupId";
import StudentSubGroupIdUpdate from "./screens/subgroupId/StudentsubGroupIdUpdate";
import StudentTag from "./screens/tag/StudentTag";
function App() {
  return (
    <React.Fragment>
      <HashRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomeScreen} />
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
          <Route exact path="/lecturer/add" component={AddLecturer} />

          <Route exact path="/lecturer/view" component={ViewLecturer} />
          <Route exact path="/subject/add" component={AddSubject} />
        </Switch>
      </HashRouter>
    </React.Fragment>
  );
}

export default React.memo(App);
