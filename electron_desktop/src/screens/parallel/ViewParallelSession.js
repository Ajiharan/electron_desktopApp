import React, { useState, useEffect } from "react";
import "./ViewParallelSession.css";
import { useDispatch, useSelector } from "react-redux";
import { viewParallelSessions } from "../../redux/parallel/parallelSessionAction";
import Search from "../home/Search";
import { db } from "../../firebase";

const ViewParallelSession = () => {
  const [sessions, setSession] = useState([]);
  const dispatch = useDispatch();
  const { loading, error, parallel_sessions } = useSelector(
    (state) => state.get_parallelSession
  );
  //   console.log("gen_subgroupids", gen_subgroupids);

  useEffect(() => {
    dispatch(viewParallelSessions());
    return () => {};
  }, []);
  useEffect(() => {
    setSession(parallel_sessions);
    return () => {};
  }, [parallel_sessions]);

  const searchData = (name) => {
    if (name) {
      setSession(
        sessions.filter((data) => data.pdate.split("-")[2].match(name))
      );
    } else {
      setSession(parallel_sessions);
    }
  };
  return (
    <React.Fragment>
      <div className="ViewParallelSession__searchList">
        <Search searchData={searchData} />
        {parallel_sessions.length === 0 ? (
          <p className="text-danger lead">data is not available</p>
        ) : sessions.length === 0 ? (
          <p className="text-danger lead">No results found</p>
        ) : null}
      </div>
      <div className="ViewParallelSession">
        {sessions.map((data, i) => (
          <div className="card bg-dark cardStyle" key={i}>
            <div className="card-body">
              {data.session.map((res, i) => (
                <div key={i}>
                  <h5 className="text-center text-light">{res}</h5>
                </div>
              ))}
              <h5 className="text-center text-light">{data.start_time}</h5>
              <h5 className="text-center text-light">
                {data.duration + " "} hrs
              </h5>
              <h5 className="text-center text-light">{data.pdate}</h5>
            </div>
            <div className="ViewParallelSession__buttons">
              <button
                onClick={() =>
                  db.collection("parallel_sessions").doc(data.id).delete()
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ViewParallelSession;
