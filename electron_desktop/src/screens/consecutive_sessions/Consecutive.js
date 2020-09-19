import React, { useState, useEffect } from "react";
import "./Consecutive.css";
import { Spinner } from "../animations/Spinner";
import { PropagateLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import ScreenNav from "../screen-nav/ScreenNav";
import { viewSubject } from "../../redux/Subject/SubjectAction";

import ConsecutiveForm from "./ConsecutiveForm";

import ViewConsecutiveSession from "./ViewConsecutiveSession";

const Consecutive = () => {
  const [subData, setsubData] = useState([]);

  const dispatch = useDispatch();

  const { subject } = useSelector((state) => state.get_subjects);

  useEffect(() => {
    dispatch(viewSubject());
  }, []);

  useEffect(() => {
    setsubData(subject);
  }, [subject]);
  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "sessions",
      pathname: "/consecutive",
    },
  ];

  return (
    <div className="Consecutive">
      <ScreenNav rightNavData={navData} />
      <div className="Consecutive__container">
        <div className="Consecutive__box">
          {subData.length > 0 ? (
            <React.Fragment>
              <h2 className="text-center text-dark">
                Generate Consecutive Sessions
              </h2>
              <ConsecutiveForm subject={subject} />
            </React.Fragment>
          ) : (
            <div className="Consecutive__loader">
              <Spinner Loader={PropagateLoader} size={12} />
            </div>
          )}
        </div>
        <div className="Consecutive__List">
          <h4>CONSECUTIVE SESSION LISTS</h4>
          <ViewConsecutiveSession />
        </div>
      </div>
    </div>
  );
};

export default Consecutive;
