import React, { useState, useEffect } from "react";
import "./ViewYearSemister.css";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { viewSemister } from "../../redux/Year_semi/YearAction";
const ViewYearSemister = () => {
  const { loading, error, year_semi } = useSelector(
    (state) => state.get_year_semister
  );
  const dispatch = useDispatch();
  console.log("year and semi", year_semi);
  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "Student > ",
      pathname: "/student/year_semister/add",
    },
    {
      id: 3,
      name: "view",
      pathname: "/student/year_semister/view",
    },
  ];

  useEffect(() => {
    dispatch(viewSemister());
  }, []);
  return (
    <div className="YearViewContainer">
      <div className="YearViewContainer__nav">
        <ScreenNav rightNavData={navData} />
      </div>
      <div className="YearViewContainer__table container table-responsive-lg ">
        <table className="table table-dark table-hover ">
          <thead>
            <tr>
              <th>Year&Semister</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {year_semi.map((data) => (
              <tr key={data.id}>
                <td>
                  {" "}
                  <input type="checkbox" />
                  {data.year_semister}
                </td>
                <td>
                  <button>Delete</button>
                </td>
                <td>
                  <button>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewYearSemister;
