import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import "./UpdateYearSemister.css";
import { UpdateSemister } from "../../redux/Year_semi/YearAction";
import useUpdate from "../useHooks/useUpdate";
const UpdateYearSemister = (props) => {
  console.log("props.history", props.location);
  const dispatch = useDispatch();
  const history = useHistory();
  const [year, setYear] = useState("");
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Updated");

  const { loading, error, year_semi } = useSelector(
    (state) => state.update_year_semister
  );

  useEffect(() => {
    if (!props.location.state) {
      history.replace({
        pathname: "/student/year_semister/view",
      });
    } else {
      setYear(props.location.state.year_semister);
    }
  }, []);

  const { submitHandler, clearInput } = useUpdate({
    updateData: UpdateSemister,
    data: { year_semister: year, id: props.location.state?.id },
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
      name: "Student > ",
      pathname: "/student/year_semister/add",
    },
    {
      id: 3,
      name: "view > ",
      pathname: "/student/year_semister/view",
    },
    {
      id: 4,
      name: "update",
      pathname: "/student/year_semister/update",
    },
  ];

  return (
    <div className="yearSemisterUpdate">
      <ScreenNav rightNavData={navData} />
      <div className="yearSemisterUpdate__container">
        <div className="yearSemisterUpdate__box">
          <div className="lead text-success yearSemister__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Update year & Semister</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="yearSemisterUpdate_inputs">
              <label htmlFor="yearSemisterUpdate" className="text-light">
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
                Update
              </button>
              <button
                type="button"
                className="btn"
                onClick={(e) => {
                  history.push({ pathname: "/student/year_semister/view" });
                }}
              >
                Cancel
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

export default UpdateYearSemister;
