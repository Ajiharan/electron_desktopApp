import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addBuilding } from "../../redux/Building/BuildingAction";
import "./Building.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import useAdd from "../useHooks/useAdd";
import ScreenNav from "../screen-nav/ScreenNav";

const Building = () => {
  const history = useHistory();
  const [building, setBuilding] = useState("");
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const { loading, error } = useSelector((state) => state.building_add);

  useEffect(() => {
    return () => {
      console.log("Component will unmount");
    };
  }, []);

  const { submitHandler, clearInput } = useAdd({
    addData: addBuilding,
    data: building,
    setData: setBuilding,
    isClicked: isClicked,
  });

  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "Building",
      pathname: "/location/building/add",
    },
  ];

  return (
    <div className="Building">
      <ScreenNav rightNavData={navData} />
      <div className="Building__container">
        <div className="Building__box">
          <div className="lead text-success Building__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Add Building Name</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="Building_inputs">
              <label htmlFor="Building" className="text-light">
               Building Name
              </label>
              <input
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                placeholder="eg:01"
                id="building"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="Building_buttons">
              <button type="submit" className="btn" disabled={!building}>
                Add
              </button>
              <button
                type="button"
                className="btn"
                onClick={(e) => {
                  history.push({ pathname: "/location/building/view" });
                }}
              >
                View
              </button>
              <button type="button" onClick={clearInput} className="btn">
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Building);
