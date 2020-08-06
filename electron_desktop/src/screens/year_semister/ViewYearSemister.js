import React, { useState, useEffect } from "react";
import "./ViewYearSemister.css";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { viewSemister } from "../../redux/Year_semi/YearAction";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
import { db } from "../../firebase";
const ViewYearSemister = () => {
  const { loading, error, year_semi } = useSelector(
    (state) => state.get_year_semister
  );
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [checkData, setCheckData] = useState([]);
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

  useEffect(() => {
    setUserData(year_semi);
  }, [year_semi]);

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

  const handleDelete = (data) => {
    db.collection("students").doc(data.id).delete();
    setCheckData(checkData.filter((e) => e.id !== data.id));
    console.log("checkData", checkData);
  };

  return (
    <div className="YearViewContainer">
      <div className="YearViewContainer__nav">
        <ScreenNav rightNavData={navData} />
      </div>
      <div className="YearViewContainer__table container table-responsive-lg ">
        {loading ? (
          <Spinner Loader={DotLoader} size={30} />
        ) : (
          <React.Fragment>
            <button>AddNew</button>
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>Year&Semister</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((data) => (
                  <tr key={data.id}>
                    <td>
                      <div className="form-check">
                        <input
                          onChange={(e) => Handlebox(e)}
                          type="checkbox"
                          value={data.id}
                          className="form-check-input"
                        />
                        <span>{data.year_semister}</span>
                      </div>
                    </td>
                    <td>
                      <button onClick={(e) => handleDelete(data)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ViewYearSemister;
