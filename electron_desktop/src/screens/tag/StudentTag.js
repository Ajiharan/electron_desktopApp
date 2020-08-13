import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addTag } from "../../redux/tag/TagAction";
import "./StudentTag.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import useAdd from "../useHooks/useAdd";
import ScreenNav from "../screen-nav/ScreenNav";

const StudentTag = () => {
  const history = useHistory();
  const [tag, setTag] = useState("");
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const { loading, error } = useSelector((state) => state.tag_add);

  useEffect(() => {
    return () => {
      console.log("Component will unmount");
    };
  }, []);

  const { submitHandler, clearInput } = useAdd({
    addData: addTag,
    data: tag,
    setData: setTag,
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
      name: "Student Tag",
      pathname: "/student/tag/add",
    },
  ];

  return (
    <div className="StudentTag">
      <ScreenNav rightNavData={navData} />
      <div className="StudentTag__container">
        <div className="StudentTag__box">
          <div className="lead text-success StudentTag__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Add Tag</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="StudentTag_inputs">
              <label htmlFor="StudentTags" className="text-light">
                Tag
              </label>
              <input
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="eg:lecture"
                id="StudentTags"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="StudentTag_buttons">
              <button type="submit" className="btn" disabled={!tag}>
                Add
              </button>
              <button
                type="button"
                className="btn"
                onClick={(e) => {
                  history.push({ pathname: "/student/tag/view" });
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

export default React.memo(StudentTag);
