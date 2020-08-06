import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/home/Home";
import "./App.css";
import Navbar from "./screens/navbar/Navbar";
import Yearsemister from "./screens/year_semister/Yearsemister";
import ViewYearSemister from "./screens/year_semister/ViewYearSemister";
import AddLecturer from "./screens/Lecturer/AddLecturer";
import ViewLecturer from "./screens/Lecturer/ViewLecturer";

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
          <Route exact path="/lecturer/add" component={AddLecturer} />

          <Route exact path="/lecturer/view" component={ViewLecturer} />
        </Switch>
      </HashRouter>
    </React.Fragment>
  );
}

export default App;
