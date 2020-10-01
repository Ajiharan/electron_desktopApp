import React, { useState, useEffect } from "react";
import "./ViewNotAllocate.css";
import { useDispatch, useSelector } from "react-redux";
import { view_notAlocatedTime } from "../../redux/notAllocated/notAllocatedAction";
import Search from "../home/Search";
import { db } from "../../firebase";

const ViewNotAllocated = () => {
  const [sessions, setSession] = useState([]);
  const dispatch = useDispatch();
  const { loading, error, not_allocates } = useSelector(
    (state) => state.get_notAllocated
  );
  //   console.log("gen_subgroupids", gen_subgroupids);

  useEffect(() => {
    dispatch(view_notAlocatedTime());
    return () => {};
  }, []);
  useEffect(() => {
    setSession(not_allocates);
    return () => {};
  }, [not_allocates]);

  const searchData = (name) => {
    if (name) {
      setSession(
        sessions.filter((data) => data.pdate.split("-")[2].match(name))
      );
    } else {
      setSession(not_allocates);
    }
  };
  return (
    <React.Fragment>
      <div className="ViewNotAllocated__searchList">
        <Search searchData={searchData} />
        {not_allocates.length === 0 ? (
          <p className="text-danger lead">data is not available</p>
        ) : sessions.length === 0 ? (
          <p className="text-danger lead">No results found</p>
        ) : null}
      </div>
      <div className="ViewNotAllocated">
        {sessions.map((data, i) => (
          <div className="card bg-dark cardStyle" key={i}>
            <div className="card-body">
              {data.type_value.map((res, i) => (
                <div key={i}>
                  <h5 className="text-center text-light">
                    {res}
                    {","}
                  </h5>
                </div>
              ))}

              <h5 className="text-center text-light">
                Start Time : {data.start_time}
              </h5>
              <h5 className="text-center text-light">
                End Time : {data.end_time}
              </h5>
              <h5 className="text-center text-light">Date : {data.pdate}</h5>
            </div>
            <div className="ViewNotAllocated__buttons">
              <button
                onClick={() =>
                  db.collection("not_allocates").doc(data.id).delete()
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

export default ViewNotAllocated;
