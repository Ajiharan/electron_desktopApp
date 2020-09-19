import React, { useState, useEffect } from "react";
import "./ParallelSession.css";
import { Spinner } from "../animations/Spinner";
import { PropagateLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import ScreenNav from "../screen-nav/ScreenNav";
import { viewSubject } from "../../redux/Subject/SubjectAction";

import ParallelForm from "./ParallelForm";

import ViewParallelSession from "./ViewParallelSession";

const ParllelSession = () => {
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
      pathname: "/Parallel",
    },
  ];

  return (
    <div className="ParllelSession">
      <ScreenNav rightNavData={navData} />
      <div className="ParllelSession__container">
        <div className="ParllelSession__box">
          {subData.length > 0 ? (
            <React.Fragment>
              <h2 className="text-center text-dark">Parallel Sessions</h2>
              <ParallelForm subject={subject} />
            </React.Fragment>
          ) : (
            <div className="ParllelSession__loader">
              <Spinner Loader={PropagateLoader} size={12} />
            </div>
          )}
        </div>
        <div className="ParllelSession__List">
          <h4>Parallel SESSION LISTS</h4>
          {/* <ViewParallelSession /> */}
        </div>
      </div>
    </div>
  );
};

export default ParllelSession;
