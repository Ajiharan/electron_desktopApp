import React, { useState, useEffect } from "react";
import "./ViewStudentDetail.css";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import Search from "../home/Search";
const ViewStudentDetail = () => {
  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "Student Detail",
      pathname: "/student/viewAll",
    },
  ];

  const searchData = (name) => {};
  return (
    <div className="StudentDetailContainer">
      <div className="StudentDetailContainer__nav">
        <ScreenNav rightNavData={navData} />
      </div>
      <h2 className="text-center">View Student Detail</h2>
      <div className="StudentDetailContainer__top">
        <form>
          <div className="form-group student_input">
            <label htmlFor="StudentDetailContainers">GroupBy</label>
            <select className="form-control" id="StudentDetailContainers">
              <option>year_semister</option>
              <option>programme</option>
            </select>
          </div>
        </form>
        <Search searchData={searchData} />
      </div>
      <div className="container table-responsive-lg "></div>
    </div>
  );
};

export default ViewStudentDetail;
