import React from "react";
import "./ViewStatistics.css";
import ScreenNav from "../screen-nav/ScreenNav";
import Search from "../home/Search";
import { PieChart } from "react-minimal-pie-chart";
const ViewStatistics = () => {
  const searchData = (name) => {};
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
    { title: "group Number", value: 80, color: "#E38627" },
    { title: "sub-group Number", value: 80, color: "#C13C37" },
    { title: "year_semister", value: 20, color: "#6A2135" },
  ];
  const defaultLabelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
  };
  return (
    <div className="StatisticContainer">
      <div className="StatisticContainer__nav">
        <ScreenNav rightNavData={navData} />
      </div>
      <h2 className="text-center">View Student Detail</h2>
      <div className="StatisticContainer__top">
        <Search searchData={searchData} />
      </div>
      <div className="StatisticContainer__content">
        <form className="StatisticContainer__form">
          <div className="form-group">
            <label htmlFor="sel">Type</label>
            <select id="sel" className="form-control">
              <option>Student</option>
              <option>Lecture</option>
              <option>Subject</option>
            </select>
          </div>
        </form>
        <div className="StatisticContainer__chart">
          <PieChart
            data={dataEntry}
            radius={PieChart.defaultProps.radius - 7}
            label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
            segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
            paddingAngle={2}
            radius={40}
            labelStyle={{
              ...defaultLabelStyle,
            }}
          />
          ;
        </div>
      </div>
    </div>
  );
};

export default ViewStatistics;
