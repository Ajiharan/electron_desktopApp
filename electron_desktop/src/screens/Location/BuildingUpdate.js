import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import "./BuildingUpdate.css";
import { UpdateBuilding } from "../../redux/Building/BuildingAction";
import useUpdate from "../useHooks/useUpdate";
const BuildingUpdate = (props) => {
  console.log("props.history", props.location);
  const dispatch = useDispatch();
  const history = useHistory();
  const [building, setBuilding] = useState("");
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Updated");

  const { loading, error } = useSelector((state) => state.update_building);

  useEffect(() => {
    if (!props.location.state) {
      history.replace({
        pathname: "/location/building/view",
      });
    } else {
      setBuilding(props.location.state.building);
    }
  }, []);

  const { submitHandler, clearInput } = useUpdate({
    updateData: UpdateBuilding,
    data: { inputData: building, id: props.location.state?.id },
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
      name: "Building> ",
      pathname: "/location/building/add",
    },
    {
      id: 3,
      name: "view > ",
      pathname: "/location/building/view",
    },
    {
      id: 4,
      name: "update",
      pathname: "/location/building/update",
    },
  ];

  return (
    <div className="BuildingUpdate">
      <ScreenNav rightNavData={navData} />
      <div className="BuildingUpdate__container">
        <div className="BuildingUpdate__box">
          <div className="lead text-success BuildingUpdate__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Update Building</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="BuildingUpdate_inputs">
              <label htmlFor="building" className="text-light">
               Building
              </label>
              <input
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                placeholder="eg:Main Building"
                id="building"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="BuildingUpdate_buttons">
              <button type="submit" className="btn" disabled={!building}>
                Update
              </button>
              <button
                type="button"
                className="btn"
                onClick={(e) => {
                  history.push({ pathname: "/location/building/view" });
                }}
              >
                Cancel
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

export default React.memo(BuildingUpdate);
