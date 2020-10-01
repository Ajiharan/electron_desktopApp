import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProgramme } from "../../redux/programme/programmeAction";
import "./StudentProgramme.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import useAdd from "../useHooks/useAdd";
import ScreenNav from "../screen-nav/ScreenNav";

const StudentProgramme = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [programme, setProgramme] = useState("");
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const { loading, error, student_programme } = useSelector(
    (state) => state.programme_add
  );

  const { submitHandler, clearInput } = useAdd({
    addData: addProgramme,
    data: programme,
    setData: setProgramme,
    isClicked: isClicked,
  });

  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "Student Programme",
      pathname: "/student/Programme/add",
    },
  ];

  return (
    <div className="student_programme">
      <ScreenNav rightNavData={navData} />
      <div className="student_programme__container">
        <div className="student_programme__box">
          <div className="lead text-success student_programme__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Add Programme</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="student_programme_inputs">
              <label htmlFor="student_programme" className="text">
                programme
              </label>
              <input
                value={programme}
                onChange={(e) => setProgramme(e.target.value)}
                placeholder="eg:IT"
                id="student_programme"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="student_programme_buttons">
              <button type="submit" className="btn" disabled={!programme}>
                Add
              </button>
              <button
                type="button"
                className="btn"
                onClick={(e) => {
                  history.push({ pathname: "/student/programme/view" });
                }}
              >
                View
              </button>
              <button type="button" onClick={clearInput} className="btn">
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(StudentProgramme);
