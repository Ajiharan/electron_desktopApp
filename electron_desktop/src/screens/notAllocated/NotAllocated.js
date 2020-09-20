import React, { useState, useEffect } from "react";
import "./NotAllocated.css";
import { Spinner } from "../animations/Spinner";
import { PropagateLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import ScreenNav from "../screen-nav/ScreenNav";
import { viewSessions } from "../../redux/session/sessionAction";
import { viewLecturer } from "../../redux/Lecturer/LecturerAction";
import { view_genGroupId } from "../../redux/genId/genIdAction";
import { view_genSubGroupId } from "../../redux/gensubId/genSubIdAction";
import NotAllocatedForm from "./NotAllocatedForm";
import ViewNotAllocated from "./ViewNotAllocated";

const NotAllocated = () => {
  const [sessionData, setSessionData] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [groupId, setGroupId] = useState([]);
  const [subgroupId, setSubgroupId] = useState([]);

  const dispatch = useDispatch();

  const { sessions } = useSelector((state) => state.get_Session);
  const { lecturer } = useSelector((state) => state.get_lecturers);
  const { gen_groupids } = useSelector((state) => state.get_genGroupId);
  const { gen_subgroupids } = useSelector((state) => state.get_genSubGroupId);

  useEffect(() => {
    dispatch(viewSessions());
    dispatch(view_genGroupId());
    dispatch(viewLecturer());
    dispatch(view_genSubGroupId());
  }, []);

  useEffect(() => {
    setSessionData(sessions);
    setGroupId(gen_groupids);
    setLectures(lecturer);
    setSubgroupId(gen_subgroupids);
  }, [sessions, lecturer, gen_groupids, gen_subgroupids]);
  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "notAllocated",
      pathname: "/notAllocated",
    },
  ];

  return (
    <div className="NotAllocated">
      <ScreenNav rightNavData={navData} />
      <div className="NotAllocated__container">
        <div className="NotAllocated__box">
          {sessionData.length > 0 ||
          lecturer.length > 0 ||
          gen_groupids.length > 0 ||
          gen_subgroupids.length > 0 ? (
            <React.Fragment>
              <h2 className="text-center text-dark">Sessions</h2>
              <NotAllocatedForm
                sessions={sessions}
                lectures={lecturer}
                groupId={gen_groupids}
                subgroupId={gen_subgroupids}
              />
            </React.Fragment>
          ) : (
            <div className="NotAllocated__loader">
              <Spinner Loader={PropagateLoader} size={12} />
            </div>
          )}
        </div>
        <div className="NotAllocated__List">
          <h4>SESSION LISTS</h4>
          <ViewNotAllocated />
        </div>
      </div>
    </div>
  );
};

export default NotAllocated;
