import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import "./StudentsubGroupIdUpdate.css";
import { UpdateSubGroupId } from "../../redux/subgroupId/SubGroupIdAction";
import useUpdate from "../useHooks/useUpdate";
const StudentsubGroupIdUpdate = (props) => {
  console.log("props.history", props.location);
  const dispatch = useDispatch();
  const history = useHistory();
  const [sub_groupid, setSubGroupId] = useState("");
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Updated");

  const { loading, error } = useSelector((state) => state.update_subgroupId);

  useEffect(() => {
    if (!props.location.state) {
      history.replace({
        pathname: "/student/subgroup_id/view",
      });
    } else {
      setSubGroupId(props.location.state.sub_groupid);
    }
  }, []);

  const { submitHandler, clearInput } = useUpdate({
    updateData: UpdateSubGroupId,
    data: { inputData: sub_groupid, id: props.location.state?.id },
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
      name: "Student SubGroup Number > ",
      pathname: "/student/subgroup_id/add",
    },
    {
      id: 3,
      name: "view > ",
      pathname: "/student/subgroup_id/view",
    },
    {
      id: 4,
      name: "update",
      pathname: "/student/subgroup_id/update",
    },
  ];

  return (
    <div className="StudentSubGroupIdUpdate">
      <ScreenNav rightNavData={navData} />
      <div className="StudentSubGroupIdUpdate__container">
        <div className="StudentSubGroupIdUpdate__box">
          <div className="lead text-success StudentSubGroupIdUpdate__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Update SubGroup Number</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="StudentSubGroupIdUpdate_inputs">
              <label htmlFor="StudentSubGroupIdUpdates" className="text">
                Sub Group Number
              </label>
              <input
                value={sub_groupid}
                onChange={(e) => setSubGroupId(e.target.value)}
                placeholder="eg:S1.Y3"
                id="StudentSubGroupIdUpdates"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="StudentSubGroupIdUpdate_buttons">
              <button type="submit" className="btn" disabled={!sub_groupid}>
                Update
              </button>
              <button
                type="button"
                className="btn"
                onClick={(e) => {
                  history.push({ pathname: "/student/subgroup_id/view" });
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

export default React.memo(StudentsubGroupIdUpdate);
