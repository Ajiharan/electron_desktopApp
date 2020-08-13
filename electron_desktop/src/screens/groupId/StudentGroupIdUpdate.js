import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import "./StudentGroupIdUpdate.css";
import { UpdateGroupId } from "../../redux/groupId/GroupIdAction";
import useUpdate from "../useHooks/useUpdate";
const StudentGroupIdUpdate = (props) => {
  console.log("props.history", props.location);
  const dispatch = useDispatch();
  const history = useHistory();
  const [groupid, setGroupId] = useState("");
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Updated");

  const { loading, error } = useSelector((state) => state.update_groupId);

  useEffect(() => {
    if (!props.location.state) {
      history.replace({
        pathname: "/student/group_id/view",
      });
    } else {
      setGroupId(props.location.state.groupid);
    }
  }, []);

  const { submitHandler, clearInput } = useUpdate({
    updateData: UpdateGroupId,
    data: { inputData: groupid, id: props.location.state?.id },
    setData: setGroupId,
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
      name: "Student Group Number > ",
      pathname: "/student/group_id/add",
    },
    {
      id: 3,
      name: "view > ",
      pathname: "/student/group_id/view",
    },
    {
      id: 4,
      name: "update",
      pathname: "/student/group_id/update",
    },
  ];

  return (
    <div className="StudentGroupIdUpdate">
      <ScreenNav rightNavData={navData} />
      <div className="StudentGroupIdUpdate__container">
        <div className="StudentGroupIdUpdate__box">
          <div className="lead text-success StudentGroupIdUpdate__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Update GroupNumber</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="StudentGroupIdUpdate_inputs">
              <label htmlFor="groupId" className="text-light">
                Group Number
              </label>
              <input
                value={groupid}
                onChange={(e) => setGroupId(e.target.value)}
                placeholder="eg:S1.Y3"
                id="groupId"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="StudentGroupIdUpdate_buttons">
              <button type="submit" className="btn" disabled={!groupid}>
                Update
              </button>
              <button
                type="button"
                className="btn"
                onClick={(e) => {
                  history.push({ pathname: "/student/group_id/view" });
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

export default React.memo(StudentGroupIdUpdate);
