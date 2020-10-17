import React, { useState, useEffect } from "react";
import "./ViewLecturer.css";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
import { db } from "../../firebase";
import Search from "../home/Search";
import { useHistory } from "react-router-dom";
import {viewLecturer} from "../../redux/Lecturer/LecturerAction";

const ViewLecturer = () => {
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
      name: "Lecturer > ",
      pathname: "/lecturer/add",
    },
    {
      id: 3,
      name: "View ",
      pathname: "/lecturer/view",
    }
  ];

  useEffect(() => {
    dispatch(viewLecturer());
  }, []);

  useEffect(() => {
    setLecturerData(lecturer);
  }, [lecturer]);

  const Handlebox = (e) => {
    if (e.target.checked) {
      let tempData = [
        ...checkData,
        {
          id: e.target.value,
        },
      ];
      setCheckData(tempData);
    } else {
      setCheckData(checkData.filter((data) => data.id !== e.target.value));
    }

    console.log("checkData", checkData);
  };

  const DeleteAll = () => {
    db.collection("lecturers")
        .get()
        .then((res) => {
          res.forEach((element) => {
            element.ref.delete();
          });
        });
    setCheckData([]);
  };

  const DeleteSelected = () => {
    checkData.map((check_data) => {
      db.collection("lecturers").doc(check_data.id).delete();
    });
    setCheckData([]);
  };

  const handleDelete = (data) => {
    db.collection("lecturers").doc(data.id).delete();
    setCheckData(checkData.filter((e) => e.id !== data.id));
    console.log("checkData", checkData);
  };

  const searchData = (name) => {
    setCheckData([]);
    name?
        setLecturerData(
            lecturer.filter((data) => data.name.includes(name)||data.name.startsWith(name.toUpperCase())||data.emp_id.includes(name)
                                      ||data.center.startsWith(name.toUpperCase())||data.center.includes(name)
                                      ||data.faculty.startsWith(name.toUpperCase())||data.faculty.includes(name)
                                      ||data.department.startsWith(name.toUpperCase())||data.department.includes(name)
                                      ||data.building.startsWith(name.toUpperCase())||data.building.includes(name)
                                      ||data.level.startsWith(name)||data.building.includes(name))
        ):setLecturerData(
        lecturer
        )
  };

  const gotoUpdate = (data) => {
    history.push({
      pathname: "/lecturer/update",
      state: data,
    });
  };

  return (
      <div className="LecturerViewContainer">
        <div className="LecturerViewContainer__nav">
          <ScreenNav rightNavData={navData} />
        </div>
        <div className="container table-responsive-lg ">
          {loading ? (
              <Spinner Loader={DotLoader} size={30} />
          ) : (
              <React.Fragment>
                <div className="LecturerViewContainer__top">
                  <button
                      onClick={(e) =>
                          history.push({
                            pathname: "/lecturer/add",
                          })
                      }
                      className="btn btn-dark btn_new"
                  >
                    Add new record
                  </button>
                  <Search searchData={searchData} />
                </div>
                {lecturerData.length > 0 && (
                    <table className="table table-dark table-hover LecturerViewContainer__table">
                      <thead>
                      <tr>
                        <th></th>
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
                      {lecturerData.map((data) => (
                          <tr key={data.id}>
                            <td>
                              <div className="form-check">
                                <input
                                    onChange={(e) => Handlebox(e)}
                                    type="checkbox"
                                    value={data.id}
                                    className="form-check-input"
                                />
                              </div>
                            </td>
                            <td><span>{data.emp_id}</span></td>
                            <td><span>{data.name}</span></td>
                            <td><span>{data.center}</span> </td>
                            <td><span>{data.faculty}</span> </td>
                            <td><span>{data.department}</span> </td>
                            <td><span>{data.building}</span> </td>
                            <td><span>{data.level}</span> </td>
                            <td><span>{data.rank}</span> </td>

                            <td>
                              <button onClick={(e) => gotoUpdate(data)}>Edit</button>
                            </td>

                            <td>
                              <button onClick={(e) => handleDelete(data)}>Delete</button>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                )}

                <div className="LecturerViewContainer__bottom">
                  {lecturerData.length > 0 && lecturerData.length === lecturer.length && (
                      <button onClick={DeleteAll} className="btn btn-danger">
                        Delete All
                      </button>
                  )}

                  {checkData.length > 0 && (
                      <button onClick={DeleteSelected} className="btn btn-danger">
                        Delete Selected
                      </button>
                  )}
                </div>
              </React.Fragment>
          )}
        </div>
      </div>
  );
};

export default ViewLecturer;
