import React, { useState, useEffect } from "react";
import { viewSemister } from "../../redux/Year_semi/YearAction";
import { viewProgramme } from "../../redux/programme/programmeAction";
import { viewGroupId } from "../../redux/groupId/GroupIdAction";
import { PieChart } from "react-minimal-pie-chart";
import { viewSubGroupId } from "../../redux/subgroupId/SubGroupIdAction";
import { useDispatch, useSelector } from "react-redux";
const StudentStatistics = () => {
  const { year_semi } = useSelector((state) => state.get_year_semister);
  const { programme } = useSelector((state) => state.get_programmmes);
  const { group_id } = useSelector((state) => state.get_groupId);
  const { sub_groupids } = useSelector((state) => state.get_SubGroupId);
  const dispatch = useDispatch();
  const dataEntry = [
    { title: "group Number", value: group_id.length, color: "#E38627" },
    { title: "sub-group Number", value: sub_groupids.length, color: "#C13C37" },
    { title: "year_semister", value: year_semi.length, color: "#6A2135" },
    { title: "programme", value: programme.length, color: "#ff3399" },
  ];
  const defaultLabelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
  };
  useEffect(() => {
    dispatch(viewSemister());
    dispatch(viewProgramme());
    dispatch(viewGroupId());
    dispatch(viewSubGroupId());
  }, []);
  return (
    <React.Fragment>
      <div className="container card bg-info text-light view_statistics">
        <h2 className="text-center">Student Statistics</h2>
        <p class="lead">No of Years and Semister:{year_semi.length}</p>
        <p class="lead">No of Programmes:{programme.length}</p>
        <p class="lead">No of groupId:{group_id.length}</p>
        <p class="lead">No of Sub group_id:{sub_groupids.length}</p>
      </div>
      <div className="StatisticContainer__chart">
        <PieChart
          data={dataEntry}
          radius={PieChart.defaultProps.radius - 7}
          label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
          segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
          paddingAngle={2}
          radius={30}
          labelStyle={{
            ...defaultLabelStyle,
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default StudentStatistics;
