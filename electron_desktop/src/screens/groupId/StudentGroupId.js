import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addGroupId } from "../../redux/groupId/GroupIdAction";
import "./StudentGroupId.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import useAdd from "../useHooks/useAdd";
import ScreenNav from "../screen-nav/ScreenNav";

const StudentGroupId = () => {
  const history = useHistory();
  const [groupid, setGroupid] = useState("");
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const { loading, error } = useSelector((state) => state.groupid_add);

  useEffect(() => {
    return () => {
      console.log("Component will unmount");
    };
  }, []);

  const { submitHandler, clearInput } = useAdd({
    addData: addGroupId,
    data: groupid,
    setData: setGroupid,
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
      name: "Student GroupId",
      pathname: "/student/group_id/add",
    },
  ];

  return (
    <div className="StudentGroupId">
      <ScreenNav rightNavData={navData} />
      <div className="StudentGroupId__container">
        <div className="StudentGroupId__box">
          <div className="lead text-success StudentGroupId__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Add Group Id</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="StudentGroupId_inputs">
              <label htmlFor="group_id" className="text-light">
                Group Id
              </label>
              <input
                value={groupid}
                onChange={(e) => setGroupid(e.target.value)}
                placeholder="eg:01"
                id="group_id"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="StudentGroupId_buttons">
              <button type="submit" className="btn" disabled={!groupid}>
                Add
              </button>
              <button
                type="button"
                className="btn"
                onClick={(e) => {
                  history.push({ pathname: "/student/group_id/view" });
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

export default React.memo(StudentGroupId);
