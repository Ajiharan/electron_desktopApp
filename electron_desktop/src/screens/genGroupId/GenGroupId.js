import React, { useState, useEffect } from "react";
import "./GenGroupId.css";
import { Spinner } from "../animations/Spinner";
import { PropagateLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import useAdd from "../useHooks/useAdd";
import { useDispatch, useSelector } from "react-redux";
import ScreenNav from "../screen-nav/ScreenNav";
import { viewGroupId } from "../../redux/groupId/GroupIdAction";
import { viewSemister } from "../../redux/Year_semi/YearAction";
import { viewProgramme } from "../../redux/programme/programmeAction";
import GenIdForm from "./GenIdForm";
import formik, { useFormik } from "formik";

const GenGroupId = () => {
  const [year_semister, setYearSemister] = useState([]);
  const [student_programme, setProgramme] = useState([]);
  const [groupNo, setGroupNo] = useState([]);
  const dispatch = useDispatch();

  const { group_id } = useSelector((state) => state.get_groupId);
  const { programme } = useSelector((state) => state.get_programmmes);
  const { year_semi } = useSelector((state) => state.get_year_semister);

  useEffect(() => {
    dispatch(viewGroupId());
    dispatch(viewProgramme());
    dispatch(viewSemister());
  }, []);

  useEffect(() => {
    setYearSemister(year_semi);
    setProgramme(programme);
    setGroupNo(group_id);
  }, [group_id, programme, year_semi]);
  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "Student Group-Id",
      pathname: "/student/generate/Id",
    },
  ];

  return (
    <div className="GenGroupId">
      <ScreenNav rightNavData={navData} />
      <div className="GenGroupId__container">
        <div className="GenGroupId__box">
          {year_semister.length > 0 &&
          student_programme.length > 0 &&
          groupNo.length > 0 ? (
            <React.Fragment>
              <h2 className="text-center text-dark">Generate Group Id</h2>
              <GenIdForm
                year_semister={year_semister}
                student_programme={student_programme}
                groupNo={groupNo}
              />
            </React.Fragment>
          ) : (
            <div className="GenGroupId__loader">
              <Spinner Loader={PropagateLoader} size={12} />
            </div>
          )}
        </div>
        <div className="GenGroupId__searchList"></div>
      </div>
    </div>
  );
};

export default GenGroupId;
