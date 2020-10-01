import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addSubgroupId } from "../../redux/subgroupId/SubGroupIdAction";
import "./StudentSubGroupId.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import useAdd from "../useHooks/useAdd";
import ScreenNav from "../screen-nav/ScreenNav";

const StudentSubGroupId = () => {
  const history = useHistory();
  const [sub_groupId, setSubGroupId] = useState("");
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const { loading, error } = useSelector((state) => state.sub_groupId_add);

  useEffect(() => {
    return () => {
      console.log("Component will unmount");
    };
  }, []);

  const { submitHandler, clearInput } = useAdd({
    addData: addSubgroupId,
    data: sub_groupId,
    setData: setSubGroupId,
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
      name: "Student SubGroup Number",
      pathname: "/student/subgroup_id/add",
    },
  ];

  return (
    <div className="StudentSubGroupId">
      <ScreenNav rightNavData={navData} />
      <div className="StudentSubGroupId__container">
        <div className="StudentSubGroupId__box">
          <div className="lead text-success StudentSubGroupId__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Add Sub Group Number</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="StudentSubGroupId_inputs">
              <label htmlFor="StudentSubGroupId" className="text">
                sub group Number
              </label>
              <input
                value={sub_groupId}
                onChange={(e) => setSubGroupId(e.target.value)}
                placeholder="eg:1"
                id="sub group_id"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="StudentSubGroupId_buttons">
              <button type="submit" className="btn" disabled={!sub_groupId}>
                Add
              </button>
              <button
                type="button"
                className="btn"
                onClick={(e) => {
                  history.push({ pathname: "/student/subgroup_id/view" });
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

export default React.memo(StudentSubGroupId);
