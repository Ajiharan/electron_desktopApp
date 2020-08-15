import React, { useState, useEffect } from "react";
import "./ViewGenGroupId.css";
import { useDispatch, useSelector } from "react-redux";
import { view_genGroupId } from "../../redux/genId/genIdAction";
import Search from "../home/Search";
import { db } from "../../firebase";

const ViewGenGroupId = () => {
  const [groupids, setGroupIds] = useState([]);
  const dispatch = useDispatch();
  const { loading, error, gen_groupids } = useSelector(
    (state) => state.get_genGroupId
  );
  console.log("gen_groupids", gen_groupids);

  useEffect(() => {
    dispatch(view_genGroupId());
    return () => {};
  }, []);
  useEffect(() => {
    setGroupIds(gen_groupids);
    return () => {};
  }, [gen_groupids]);

  const searchData = (name) => {
    if (name) {
      setGroupIds(groupids.filter((data) => data.gen_groupid.match(name)));
    } else {
      setGroupIds(gen_groupids);
    }
  };
  return (
    <React.Fragment>
      <div className="GenGroupId__searchList">
        <Search searchData={searchData} />
        {gen_groupids.length === 0 ? (
          <p className="text-danger lead">data is not available</p>
        ) : groupids.length === 0 ? (
          <p className="text-danger lead">No results found</p>
        ) : null}
      </div>
      <div className="ViewGenGroupId">
        {groupids.map((data, i) => (
          <div className="card bg-dark ViewGenGroupId__card" key={i}>
            <div className="card-body">
              <h5 className="text-center text-light">{data.gen_groupid}</h5>
            </div>
            <button
              onClick={() =>
                db.collection("gen_groupids").doc(data.id).delete()
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

export default ViewGenGroupId;
