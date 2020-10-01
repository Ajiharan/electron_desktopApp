import React, { useState, useEffect } from "react";
import "./lecturer_table.css";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
import { db } from "../../firebase";
import Search from "../home/Search";
import { useHistory } from "react-router-dom";
import {viewLecturer} from "../../redux/Lecturer/LecturerAction";

const Lecturer_table = () => {
  const { loading, error, lecturer } = useSelector(
      (state) => state.get_lecturers
  );
  const dispatch = useDispatch();
  const [lecturerData, setLecturerData] = useState([]);
  const [checkData, setCheckData] = useState([]);
  console.log("lecturers", lecturer);
  const history = useHistory();
  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "Generate TimeTable > ",
      pathname: "/generate_timetables/main",
    },
    {
      id: 3,
      name: "Lecturer Details ",
      pathname: "/generate_timetables/lecturer_table",
    }
  ];

  useEffect(() => {
    dispatch(viewLecturer());
  }, []);

  useEffect(() => {
    setLecturerData(lecturer);
  }, [lecturer]);

  const gototimetable = (data) => {
    history.push({
      pathname: "/generate_timetables/timetable_lecturer",
      state: data,
    });
  };

  
  const searchData = (name) => {
    setCheckData([]);
    name?
        setLecturerData(
            lecturer.filter((data) => data.name.includes(name))
        ):setLecturerData(
        lecturer
        )
  };


  return (
      <div className="LecturerViewContainer">
        <div className="LecturerViewContainer__nav">
          <ScreenNav rightNavData={navData} />
        </div>
        <h2 className="text-center"> Lecturers Details</h2>
        <div className="container table-responsive-lg ">
          {loading ? (
              <Spinner Loader={DotLoader} size={30} />
          ) : (
              <React.Fragment>
                <div className="LecturerViewContainer__top">
                  <Search searchData={searchData} />
                </div>
                <br></br>
                {lecturerData.length > 0 && (
                    <table className="table table-dark table-hover LecturerViewContainer__table">
                      <thead>
                      <tr>
                        
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                      {lecturerData.map((data) => (
                          <tr key={data.id}>
                            
                            <td><span>{data.emp_id}</span></td>
                            <td><span>{data.name}</span></td>

                            <td>
                              <button onClick={(e) => gototimetable(data)}>View</button>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                )}

              </React.Fragment>
          )}
        </div>
      </div>
  );
};

export default Lecturer_table;
