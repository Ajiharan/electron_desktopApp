import React, { useState, useEffect } from "react";
import "./ViewGenSubGroupId.css";
import { useDispatch, useSelector } from "react-redux";
import { view_genSubGroupId } from "../../redux/gensubId/genSubIdAction";
import Search from "../home/Search";
import { db } from "../../firebase";

const ViewGenSubGroupId = () => {
  const [groupids, setGroupIds] = useState([]);
  const dispatch = useDispatch();
  const { loading, error, gen_subgroupids } = useSelector(
    (state) => state.get_genSubGroupId
  );
  console.log("gen_subgroupids", gen_subgroupids);

  useEffect(() => {
    dispatch(view_genSubGroupId());
    return () => {};
  }, []);
  useEffect(() => {
    setGroupIds(gen_subgroupids);
    return () => {};
  }, [gen_subgroupids]);

  const searchData = (name) => {
    if (name) {
      setGroupIds(groupids.filter((data) => data.gen_subgroupid.match(name)));
    } else {
      setGroupIds(gen_subgroupids);
    }
  };
  return (
    <React.Fragment>
      <div className="GenSubGroupId__searchList">
        <Search searchData={searchData} />
        {gen_subgroupids.length === 0 ? (
          <p className="text-danger lead">data is not available</p>
        ) : groupids.length === 0 ? (
          <p className="text-danger lead">No results found</p>
        ) : null}
      </div>
      <div className="ViewGenSubGroupId">
        {groupids.map((data, i) => (
          <div className="card bg-dark ViewGenSubGroupId__card" key={i}>
            <div className="card-body">
              <h5 className="text-center text-light">{data.gen_subgroupid}</h5>
            </div>
            <button
              onClick={() =>
                db.collection("gen_subgroupids").doc(data.id).delete()
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ViewGenSubGroupId;
