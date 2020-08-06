import React, { useState, useEffect } from "react";
import "./ViewYearSemister.css";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { viewSemister } from "../../redux/Year_semi/YearAction";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
const ViewYearSemister = () => {
  const { loading, error, year_semi } = useSelector(
    (state) => state.get_year_semister
  );
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
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

  return (
    <div className="YearViewContainer">
      <div className="YearViewContainer__nav">
        <ScreenNav rightNavData={navData} />
      </div>
      <div className="YearViewContainer__table container table-responsive-lg ">
        {loading ? (
          <Spinner Loader={DotLoader} size={30} />
        ) : (
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
                        type="checkbox"
                        value={data.year_semister}
                        className="form-check-input"
                      />
                      <span>{data.year_semister}</span>
                    </div>
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
        )}
      </div>
    </div>
  );
};

export default ViewYearSemister;
