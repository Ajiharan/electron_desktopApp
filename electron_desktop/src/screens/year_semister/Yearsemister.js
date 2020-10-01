import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addSemisterYear } from "../../redux/Year_semi/YearAction";
import "./Yearsemister.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import useAdd from "../useHooks/useAdd";
import ScreenNav from "../screen-nav/ScreenNav";

const Yearsemister = () => {
  const history = useHistory();
  const [year, setYear] = useState("");
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const { loading, error } = useSelector((state) => state.year_semister);

  useEffect(() => {
    return () => {
      console.log("Component will unmount");
    };
  }, []);

  const { submitHandler, clearInput } = useAdd({
    addData: addSemisterYear,
    data: year,
    setData: setYear,
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
      name: "Student Semister",
      pathname: "/student/year_semister/add",
    },
  ];

  return (
    <div className="yearSemister">
      <ScreenNav rightNavData={navData} />
      <div className="yearSemister__container">
        <div className="yearSemister__box">
          <div className="lead text-success yearSemister__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Add year & Semister</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="yearSemister_inputs">
              <label htmlFor="year_semister" className="text">
                year & semister
              </label>
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="eg:S1.Y3"
                id="year_semister"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="yearSemister_buttons">
              <button type="submit" className="btn" disabled={!year}>
                Add
              </button>
              <button
                type="button"
                className="btn"
                onClick={(e) => {
                  history.push({ pathname: "/student/year_semister/view" });
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

export default React.memo(Yearsemister);
