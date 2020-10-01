import React, { useState, useEffect } from "react";
import "./ViewConsecutiveSession.css";
import { useDispatch, useSelector } from "react-redux";
import { viewConsecutiveSessions } from "../../redux/consecutive/consecutiveAction";
import Search from "../home/Search";
import { db } from "../../firebase";

const ViewConsecutiveSession = () => {
  const [sessions, setSession] = useState([]);
  const dispatch = useDispatch();
  const { loading, error, consecutive_sessions } = useSelector(
    (state) => state.get_consecutiveSession
  );
  //   console.log("gen_subgroupids", gen_subgroupids);

  useEffect(() => {
    dispatch(viewConsecutiveSessions());
    return () => {};
  }, []);
  useEffect(() => {
    setSession(consecutive_sessions);
    return () => {};
  }, [consecutive_sessions]);

  const searchData = (name) => {
    if (name) {
      setSession(sessions.filter((data) => data.lecture.match(name)));
    } else {
      setSession(consecutive_sessions);
    }
  };
  return (
    <React.Fragment>
      <div className="GenSubGroupId__searchList">
        <Search searchData={searchData} />
        {consecutive_sessions.length === 0 ? (
          <p className="text-danger lead">data is not available</p>
        ) : sessions.length === 0 ? (
          <p className="text-danger lead">No results found</p>
        ) : null}
      </div>
      <div className="ViewConsecutiveSession">
        {sessions.map((data, i) => (
          <div className="card bg-dark ViewConsecutiveSession__list" key={i}>
            <div className="card-body">
              <h5 className="text-center text-light">{data.lecture}</h5>
              <h5 className="text-center text-light">{data.tutorial}</h5>
            </div>
            <div className="ViewConsecutiveSession__buttons">
              <button
                onClick={() =>
                  db.collection("consecutive_sessions").doc(data.id).delete()
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ViewConsecutiveSession;
