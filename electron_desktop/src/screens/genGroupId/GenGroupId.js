import React from "react";
import "./GenGroupId.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import useAdd from "../useHooks/useAdd";
import ScreenNav from "../screen-nav/ScreenNav";
const GenGroupId = () => {
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

          <h2 className="text-center text-dark">Add Group Number</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="GenGroupId_inputs">
              <label htmlFor="group_id" className="text-light">
                Group Number
              </label>
            </div>
            <div className="GenGroupId_buttons">
              <button type="submit" className="btn">
                Generate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenGroupId;
