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

  const submitHandler = (e) => {};

  return (
    <div className="GenGroupId">
      <ScreenNav rightNavData={navData} />
      <div className="GenGroupId__container">
        <div className="GenGroupId__box">
          {/* <div className="lead text-success GenGroupId__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div> */}

          <h2 className="text-center text-dark">Generate Group Id</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="GenGroupId_inputs form-group">
              <label htmlFor="group_id" className="text-light">
                Year&Semister
              </label>
              {year_semister.length > 0 ? (
                <select className="form-control">
                  {year_semister.map((data, i) => (
                    <option key={i} value={data.year_semister}>
                      {data.year_semister}
                    </option>
                  ))}
                </select>
              ) : (
                <h6 className="text-center text-light">Loading Data...</h6>
              )}
            </div>
            <div className="GenGroupId_inputs form-group">
              <label htmlFor="group_id" className="text-light">
                Programme
              </label>
              {student_programme.length > 0 ? (
                <select className="form-control">
                  {student_programme.map((data, i) => (
                    <option key={i} value={data.programme}>
                      {data.programme}
                    </option>
                  ))}
                </select>
              ) : (
                <h6 className="text-center text-light">Loading Data...</h6>
              )}
            </div>
            <div className="GenGroupId_inputs form-group">
              <label htmlFor="group_id" className="text-light">
                Group No
              </label>
              {groupNo.length > 0 ? (
                <select className="form-control">
                  {groupNo.map((data, i) => (
                    <option key={i} value={data.groupid}>
                      {data.groupid}
                    </option>
                  ))}
                </select>
              ) : (
                <h6 className="text-center text-light">Loading Data...</h6>
              )}
            </div>
            <div className="GenGroupId_buttons">
              <button type="submit" className="btn">
                Generate Id
              </button>
            </div>
          </form>
        </div>
        <div className="GenGroupId__searchList"></div>
      </div>
    </div>
  );
};

export default GenGroupId;
