import React, { useState, useEffect } from "react";
import "./ParallelSession.css";
import { Spinner } from "../animations/Spinner";
import { PropagateLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import ScreenNav from "../screen-nav/ScreenNav";
import { viewSessions } from "../../redux/session/sessionAction";
import ParallelForm from "./ParallelForm";
import ViewParallelSession from "./ViewParallelSession";

const ParllelSession = () => {
  const [sessionData, setSessionData] = useState([]);

  const dispatch = useDispatch();

  const { session } = useSelector((state) => state.get_Session);

  useEffect(() => {
    dispatch(viewSessions());
  }, []);

  useEffect(() => {
    setSessionData(session);
  }, [session]);
  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "sessions",
      pathname: "/Session",
    },
  ];

  return (
    <div className="ParllelSession">
      <ScreenNav rightNavData={navData} />
      <div className="ParllelSession__container">
        <div className="ParllelSession__box">
          {sessionData.length > 0 ? (
            <React.Fragment>
              <h2 className="text-center text-dark">PARALLEL SESSIONS</h2>
              <ParallelForm subject={session} />
            </React.Fragment>
          ) : (
            <div className="ParllelSession__loader">
              <Spinner Loader={PropagateLoader} size={12} />
            </div>
          )}
        </div>
        <div className="ParllelSession__List">
          <h4 className="text-center">PARALLEL SESSION LISTS</h4>
          <ViewParallelSession />
        </div>
      </div>
    </div>
  );
};

export default ParllelSession;
