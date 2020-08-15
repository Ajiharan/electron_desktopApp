import React, { useState, useEffect } from "react";
import "./GenSubGroupId.css";
import { Spinner } from "../animations/Spinner";
import { PropagateLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import ScreenNav from "../screen-nav/ScreenNav";
import { viewSubGroupId } from "../../redux/subgroupId/SubGroupIdAction";
import { view_genGroupId } from "../../redux/genId/genIdAction";
import GenSubGroupForm from "./GenSubGroupForm";

import ViewGenSubGroupId from "./ViewGenSubGroupId";

const GenSubGroupId = () => {
  const [genId, setGenId] = useState([]);
  const [subgroupNo, setSubgroupno] = useState([]);
  const dispatch = useDispatch();

  const { gen_groupids } = useSelector((state) => state.get_genGroupId);
  const { sub_groupids } = useSelector((state) => state.get_SubGroupId);

  useEffect(() => {
    dispatch(viewSubGroupId());
    dispatch(view_genGroupId());
  }, []);

  useEffect(() => {
    setGenId(gen_groupids);
    setSubgroupno(sub_groupids);
  }, [gen_groupids, sub_groupids]);
  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "Student Group-Id",
      pathname: "/student/generate/subId",
    },
  ];

  return (
    <div className="GenSubGroupId">
      <ScreenNav rightNavData={navData} />
      <div className="GenSubGroupId__container">
        <div className="GenSubGroupId__box">
          {genId.length > 0 && subgroupNo.length > 0 ? (
            <React.Fragment>
              <h2 className="text-center text-dark">Generate Sub Group Id</h2>
              <GenSubGroupForm gen_groupid={genId} sub_groupid={subgroupNo} />
            </React.Fragment>
          ) : (
            <div className="GenSubGroupId__loader">
              <Spinner Loader={PropagateLoader} size={12} />
            </div>
          )}
        </div>
        <div className="GenSubGroupId__List">
          <h4>GROUP ID LISTS</h4>
          <ViewGenSubGroupId />
        </div>
      </div>
    </div>
  );
};

export default GenSubGroupId;
