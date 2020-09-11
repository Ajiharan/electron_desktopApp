import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBuilding } from "../../redux/Building/BuildingAction";
import "./Building.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import ScreenNav from "../screen-nav/ScreenNav";

const Building = () => {
  const history = useHistory();
  const [building, setBuilding] = useState("");
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const { loading, error } = useSelector((state) => state.building_add);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      center: "",
      building: "",
    },
    validationSchema: yup.object({
      center: yup.string().required("please select any value.."),
      building: yup.string().required("Please enter building name"),
    }),
    onSubmit: (values, { resetForm }) => {
      isClicked(true);
      console.log("Building values", values);
      dispatch(addBuilding(values.building, values.center));
      resetForm({ values: "" });
    },
  });

  useEffect(() => {
    return () => {
      console.log("Component will unmount");
    };
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
          <form id="frm" onSubmit={formik.handleSubmit}>
            <div className="Building_inputs form-group">
              <label htmlFor="Center" className="text-light">
                Center Name
              </label>
              <select
                id="center"
                name="center"
                className="form-control"
                value={formik.values.center}
                onChange={formik.handleChange}
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
            <div className="Building_inputs form-group">
              <label htmlFor="Building" className="text-light">
                Building Name
              </label>
              <input
                value={formik.values.building}
                onChange={formik.handleChange}
                placeholder="eg:-new building"
                id="building"
                name="building"
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
            <div className="Building_buttons">
              <button type="submit" className="btn">
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
