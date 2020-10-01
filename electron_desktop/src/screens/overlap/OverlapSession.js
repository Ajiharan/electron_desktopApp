import "./OverlapSession.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOverlapSession } from "../../redux/overlap/OverlapAction";
import { viewSessions } from "../../redux/session/sessionAction";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import Select from "react-select";

const OverlapSession = () => {
  const dispatch = useDispatch();
  const [selectSessions, setSelectSession] = useState([]);
  const [sessionData, setSession] = useState([]);
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");

  const { session } = useSelector((state) => state.get_Session);
  const { loading, error } = useSelector((state) => state.addOverlapReducer);

  useEffect(() => {
    dispatch(viewSessions());
  }, []);

  useEffect(() => {
    setSession(session);
  }, [session]);

  const session_options = session.map((result) => {
    console.log(result);
    return {
      value:
        result.selectedValueLecturer +
        " " +
        result.selectedValueSubject +
        " " +
        result.selectedValueTag +
        " " +
        result.selectedValueGroup.label +
        " " +
        result.noOfstudents +
        " " +
        result.timeDuration,
      label:
        result.selectedValueLecturer +
        " " +
        result.selectedValueSubject +
        " " +
        result.selectedValueTag +
        " " +
        result.selectedValueGroup.label +
        " " +
        result.noOfstudents +
        " " +
        result.timeDuration,
    };
  });

  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "OverlapSession",
      pathname: "/OverlapSession/add",
    },
  ];

  const handleSesionChange = (optionValue) => {
    setSelectSession(optionValue);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      addOverlapSession({
        selectSessions,
      })
    );
    setSelectSession([]);
  };
  return (
    <div className="OverlapSession">
      <ScreenNav rightNavData={navData} />
      <div className="OverlapSession__container">
        <div className="OverlapSession__box">
          <div className="lead text-success OverlapSession__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Add OverlapSession</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="OverlapSession_inputs">
              <label htmlFor="OverlapSession" className="text">
                Sessions
              </label>
              <Select
                options={session_options}
                isMulti
                value={selectSessions}
                onChange={handleSesionChange}
                name="rooms"
                className="basic-multi-select form-control"
                classNamePrefix="select"
              />
            </div>
            <div className="OverlapSession_buttons">
              <button type="submit" className="btn">
                Add OverlapSessions
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(OverlapSession);
