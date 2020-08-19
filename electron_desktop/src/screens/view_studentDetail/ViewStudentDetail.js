import React, { useState, useEffect } from "react";
import "./ViewStudentDetail.css";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { viewSemister } from "../../redux/Year_semi/YearAction";
import { view_genGroupId } from "../../redux/genId/genIdAction";
import { view_genSubGroupId } from "../../redux/gensubId/genSubIdAction";
import Search from "../home/Search";
const ViewStudentDetail = () => {
  const [type, setType] = useState("");
  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();
  const { year_semi } = useSelector((state) => state.get_year_semister);
  const { gen_groupids } = useSelector((state) => state.get_genGroupId);
  const { gen_subgroupids } = useSelector((state) => state.get_genSubGroupId);
  useEffect(() => {
    dispatch(viewSemister());
    dispatch(view_genGroupId());
    dispatch(view_genSubGroupId());
    return () => {};
  }, []);
  useEffect(() => {
    setTableData(
      year_semi.map((data) => {
        let current = gen_groupids.filter((gdata) =>
          gdata.gen_groupid.match(data.year_semister)
        );
        let programmeDetails = current.map(
          (pdata) => pdata.gen_groupid.substr(6).split(".")[0]
        );
        let currentSub = gen_subgroupids.filter((gdata) =>
          gdata.gen_subgroupid.match(data.year_semister)
        );

        return {
          year_semi: data.year_semister,
          genGroup: current,
          genSubGroup: currentSub,
          programmes: Array.from(new Set(programmeDetails)),
        };
      })
    );
    // console.log("temp", temp);
  }, [year_semi, gen_groupids, gen_subgroupids]);
  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "Student Detail",
      pathname: "/student/viewAll",
    },
  ];

  const searchData = (name) => {};
  return (
    <div className="StudentDetailContainer">
      <div className="StudentDetailContainer__nav">
        <ScreenNav rightNavData={navData} />
      </div>
      <h2 className="text-center">View Student Detail</h2>
      <div className="StudentDetailContainer__top">
        <form>
          <div className="form-group student_input">
            <label htmlFor="StudentDetailContainers">GroupBy</label>
            <select className="form-control" id="StudentDetailContainers">
              <option>year_semister</option>
              <option>programme</option>
            </select>
          </div>
        </form>
        <Search searchData={searchData} />
      </div>
      <div className="container table-responsive-lg ">
        <table className="table table-dark table-hover YearViewContainer__table">
          <thead>
            <tr>
              <th>Year&Semister</th>
              <th>Programme</th>
              <th>groupId</th>
              <th>SubGroupId</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, i) => (
              <tr key={i}>
                <td>{data.year_semi}</td>
                <td>
                  {data.programmes.map((pdata, j) => (
                    <p key={j}>{pdata}</p>
                  ))}
                </td>
                <td>
                  {data.genGroup.map((pdata, j) => (
                    <p key={j}>{pdata.gen_groupid}</p>
                  ))}
                </td>
                <td>
                  {data.genSubGroup.map((pdata, j) => (
                    <p key={j}>{pdata.gen_subgroupid}</p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStudentDetail;
