import React, { useState, useEffect } from "react";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { viewLecturer } from "../../redux/Lecturer/LecturerAction";
import { DotLoader } from "react-spinners";
import { Link } from "react-router-dom";

const ViewLecturer = () => {
  const { loading, error, lecturer } = useSelector(
    (state) => state.get_lecturers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewLecturer());
  }, []);

  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "lecturer",
      pathname: "/lecturer/view",
    },
  ];

  return (
    <div className="lecturer">
      <ScreenNav rightNavData={navData} />

      <div className="YearViewContainer">
        <div className="YearViewContainer__table container table-responsive-lg ">
          <table className="table table-dark table-hover ">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Center</th>
                <th>Faculty</th>
                <th>Department</th>
                <th>Building</th>
                <th>Level</th>
                <th>Rank</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {lecturer.map((data) => (
                <tr key={data.id}>
                  <td>
                    {" "}
                    <input type="checkbox" />
                    {data.emp_id}
                  </td>
                  <td> {data.name}</td>
                  <td> {data.center}</td>
                  <td> {data.faculty}</td>
                  <td> {data.department}</td>
                  <td> {data.building}</td>
                  <td> {data.level}</td>
                  <td> {data.rank}</td>
                  <td>
                    <button>Edit</button>
                  </td>

                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewLecturer;
