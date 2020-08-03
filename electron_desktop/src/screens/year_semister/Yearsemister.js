import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSemisterYear } from "../../redux/Year_semi/YearAction";
import "./Yearsemister.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { Link } from "react-router-dom";

const Yearsemister = () => {
  const dispatch = useDispatch();
  const [year, setYear] = useState("");
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const { loading, error, year_semi } = useSelector(
    (state) => state.year_semister
  );
  //   console.log("SemiData", semiData);

  const submitHandler = (e) => {
    e.preventDefault();
    isClicked(true);
    dispatch(addSemisterYear(year));
    setYear("");
  };
  useEffect(() => {
    if (year_semi != JSON.stringify({})) {
      setSuccess("Successfully Added");
      setTimeout(() => {
        setSuccess("");
        console.log("worked");
      }, 5000);
    }
  }, [year_semi]);

  const clearInput = () => {
    setYear("");
  };

  return (
    <div className="yearSemister">
      <div className="yearSemister__navigation">
        <button className="btn btn-link text-info yearSemister__navleft">
          <h5>{"<"} Go back</h5>
        </button>
        <div className="yearSemister__navRight">
          <h5>
            {" "}
            <Link to="/" className="text-info">
              Timetable {">"}{" "}
            </Link>
            <Link className="text-info" to="/">
              Student {">"}
            </Link>
            <Link className="text-info" to="/student/year_semister/add">
              {" "}
              Year&Semister
            </Link>{" "}
          </h5>
        </div>
      </div>
      <div className="yearSemister__container">
        <div className="yearSemister__box">
          <div className="lead text-success yearSemister__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={20} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Add year & Semister</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="yearSemister_inputs">
              <label htmlFor="year_semister">year & semister</label>
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
              <button type="button" className="btn">
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

export default Yearsemister;
