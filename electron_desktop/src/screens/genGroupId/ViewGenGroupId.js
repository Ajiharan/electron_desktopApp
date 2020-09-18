import React, { useState, useEffect } from "react";
import "./ViewGenGroupId.css";
import { useDispatch, useSelector } from "react-redux";
import { view_genGroupId } from "../../redux/genId/genIdAction";
import { view_genSubGroupId } from "../../redux/gensubId/genSubIdAction";
import Search from "../home/Search";
import { db } from "../../firebase";

const ViewGenGroupId = () => {
  const [groupids, setGroupIds] = useState([]);
  const dispatch = useDispatch();
  const { loading, error, gen_groupids } = useSelector(
    (state) => state.get_genGroupId
  );
  const { gen_subgroupids } = useSelector((state) => state.get_genSubGroupId);
  console.log("gen_groupids", gen_groupids);

  useEffect(() => {
    dispatch(view_genGroupId());
    dispatch(view_genSubGroupId());
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
  const deleteData = (data) => {
    const tempSub = gen_subgroupids.filter(
      (filterData) =>
        filterData.gen_subgroupid.split(".")[0] +
          "." +
          filterData.gen_subgroupid.split(".")[1] +
          "." +
          filterData.gen_subgroupid.split(".")[2] +
          "." +
          filterData.gen_subgroupid.split(".")[3] ===
        data.gen_groupid
    );

    console.log("tempSub", tempSub);
    tempSub.map(({ id, gen_subgroupid }) => {
      db.collection("gen_subgroupids").doc(id).delete();
    });
    db.collection("gen_groupids").doc(data.id).delete();
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
            <button onClick={() => deleteData(data)}>Delete</button>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ViewGenGroupId;
