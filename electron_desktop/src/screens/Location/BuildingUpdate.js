import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import "./BuildingUpdate.css";
import { UpdateBuilding } from "../../redux/Building/BuildingAction";
import useUpdate from "../useHooks/useUpdate";
import { useFormik } from "formik";
import * as yup from "yup";
const BuildingUpdate = (props) => {
  console.log("props.history", props.location);
  const dispatch = useDispatch();
  const history = useHistory();
  const [building, setBuilding] = useState("");
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Updated");

  const { loading, error } = useSelector((state) => state.update_building);

  const formik = useFormik({
    initialValues: {
      center: props.location.state?.center || "",
      building: props.location.state?.building || "",
    },
    validationSchema: yup.object({
      center: yup.string().required("please select any value.."),
      building: yup.string().required("plesse enter any value.."),
    }),
    onSubmit: (values) => {
      console.log("update table values", values);
      isClicked(true);
      dispatch(
        UpdateBuilding(props.location.state.id, values.building, values.center)
      );
    },
  });

  useEffect(() => {
    if (!props.location.state) {
      history.replace({
        pathname: "/location/building/view",
      });
    } else {
      setBuilding(props.location.state.building);
    }
  }, []);

  const clearInput = () => {};

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
          <form id="frm" onSubmit={formik.handleSubmit}>
            <div className="BuildingUpdate_inputs form-group">
              <label htmlFor="center" className="text-light">
                Center
              </label>
              <select
                value={formik.values.center}
                onChange={formik.handleChange}
                name="center"
                id="center"
                className="form-control"
              >
                <option value="">Select one Option</option>
                <option value="Malabe">Malabe</option>
                <option value="Kurunagale">Kurunagale</option>
                <option value="Kandy"> Kandy</option>
                <option value="Metro">Metro</option>
              </select>
            </div>
            <div className="error_div error_building">
              {formik.errors.center && formik.touched.center ? (
                <h6 className={"text-warning text-center"}>
                  <i className="fas fa-exclamation"></i>
                  {formik.errors.center}{" "}
                </h6>
              ) : null}
            </div>
            <div className="BuildingUpdate_inputs form-group">
              <label htmlFor="building" className="text-light">
                Building
              </label>
              <input
                value={formik.values.building}
                onChange={formik.handleChange}
                placeholder="eg:Main Building"
                id="building"
                type="text"
                className="form-control"
              />
            </div>
            <div className="error_div error_building">
              {formik.errors.building && formik.touched.building ? (
                <h6 className={"text-warning text-center"}>
                  <i className="fas fa-exclamation"></i>
                  {formik.errors.building}{" "}
                </h6>
              ) : null}
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
