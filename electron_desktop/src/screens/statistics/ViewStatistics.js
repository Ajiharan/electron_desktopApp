import React, { useEffect, useState } from "react";
import "./ViewStatistics.css";
import ScreenNav from "../screen-nav/ScreenNav";
import Search from "../home/Search";
import LectureStatistics from "./LectureStatistics";
import { viewSemister } from "../../redux/Year_semi/YearAction";
import { viewProgramme } from "../../redux/programme/programmeAction";
import { viewGroupId } from "../../redux/groupId/GroupIdAction";
import { viewSubGroupId } from "../../redux/subgroupId/SubGroupIdAction";
import { useDispatch, useSelector } from "react-redux";
import StudentStatistics from "./StudentStatistics";
const ViewStatistics = () => {
  const searchData = (name) => {};
  const dispatch = useDispatch();
  const { year_semi } = useSelector((state) => state.get_year_semister);
  const { programme } = useSelector((state) => state.get_programmmes);
  const { group_id } = useSelector((state) => state.get_groupId);
  const { sub_groupids } = useSelector((state) => state.get_SubGroupId);
  const [optionType, setOptionType] = useState("");
  //console.log("yearSemiLength", sub_groupids.length);
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
    { title: "group Number", value: group_id.length, color: "#E38627" },
    { title: "sub-group Number", value: sub_groupids.length, color: "#C13C37" },
    { title: "year_semister", value: year_semi.length, color: "#6A2135" },
    { title: "programme", value: programme.length, color: "#ff3399" },
  ];
  const defaultLabelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
  };

  useEffect(() => {
    dispatch(viewSemister());
    dispatch(viewProgramme());
    dispatch(viewGroupId());
    dispatch(viewSubGroupId());
  }, []);
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
            <select
              id="sel"
              className="form-control"
              value={optionType}
              onChange={(e) => setOptionType(e.target.value)}
            >
              <option>Select</option>
              <option value="Student">Student</option>
              <option value="Lecture">Lecture</option>
            </select>
          </div>
        </form>
        {optionType === "Student" && <StudentStatistics />}
        {optionType === "Lecture" && <LectureStatistics />}
      </div>
    </div>
  );
};

export default ViewStatistics;
