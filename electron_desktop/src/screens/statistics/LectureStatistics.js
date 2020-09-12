import React, { useEffect } from "react";
import "./ViewStatistics.css";
import ScreenNav from "../screen-nav/ScreenNav";
import Search from "../home/Search";

import { viewLecturer } from "../../redux/Lecturer/LecturerAction";

import { useDispatch, useSelector } from "react-redux";
import StudentStatistics from "./StudentStatistics";
import { PieChart } from "react-minimal-pie-chart";
const ViewStatistics = () => {
  const searchData = (name) => {};
  const dispatch = useDispatch();
  const { lecturer } = useSelector((state) => state.get_lecturers);

  console.log("yearSemiLength", lecturer);
  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: " Statistics > ",
      pathname: "/student/statistic",
    },
  ];
  const shiftSize = 7;
  const dataEntry = [
    {
      title: "computing",
      value: lecturer.filter((data) => data.faculty === "Computing").length,
      color: "#E38627",
    },
    {
      title: "Engineering",
      value: lecturer.filter((data) => data.faculty === "Engineering").length,
      color: "#C13C37",
    },
    {
      title: "Business ",
      value: lecturer.filter((data) => data.faculty === "Business").length,
      color: "#6A2135",
    },
    {
      title: "Nursing",
      value: lecturer.filter((data) => data.faculty === "Nursing").length,
      color: "#ff3399",
    },
  ];
  const defaultLabelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
  };

  useEffect(() => {
    dispatch(viewLecturer());
  }, []);
  return (
    <React.Fragment>
      <div className="container card bg-info text-light view_statistics">
        <h2 className="text-center">Student Statistics</h2>
        <p class="lead">
          No of lecturers in Computing:
          {lecturer.filter((data) => data.faculty === "Computing").length}
        </p>
        <p class="lead">
          No of lecturers in Engineering:
          {lecturer.filter((data) => data.faculty === "Engineering").length}
        </p>
        <p class="lead">
          No of lecturers in Business:
          {lecturer.filter((data) => data.faculty === "Business").length}
        </p>
        <p class="lead">
          No of lecturers in Nursing:
          {lecturer.filter((data) => data.faculty === "Nursing").length}
        </p>
      </div>
      <div className="StatisticContainer__chart">
        <PieChart
          data={dataEntry}
          radius={PieChart.defaultProps.radius - 7}
          label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
          segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
          paddingAngle={2}
          radius={30}
          labelStyle={{
            ...defaultLabelStyle,
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default ViewStatistics;
