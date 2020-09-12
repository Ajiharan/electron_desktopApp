//screens addworkingdays

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Addworkingdays.css";
import { Link, useHistory } from "react-router-dom";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { addWorkingdays } from "../../redux/Working_days/WorkingdaysAction";
import ScreenNav from "../screen-nav/ScreenNav";
import { useFormik } from "formik";

const Addworkingdays = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [clicked, isClicked] = useState(false);
  const [startTime, setStarttime] = useState("");
  const [endTime, setEndtime] = useState("");
  const [success, setSuccess] = useState("Successfully Added");
  const [hrs, setHrs] = useState("");
  const { loading, error, workingdays } = useSelector(
    (state) => state.WorkingdaysReducer
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      daysnum: "",
      days: "",
      hours: "",
      timeslot: "",
    },
    onSubmit: (inputs, { resetForm }) => {
      console.log(inputs);
      isClicked(true);

      dispatch(
        addWorkingdays(
          inputs.name,
          inputs.daysnum,
          inputs.days,
          hrs + "h",
          startTime,

          endTime,
          inputs.timeslot
        )
      );
      resetForm({ inputs: "" });
      setStarttime("");
      setEndtime("");
      setHrs("");
    },
  });

  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },

    {
      id: 2,
      name: "Add Working Days and Hours",
      pathname: "/workingdays/add",
    },
  ];

  const handleStartTime = (value) => {
    setStarttime(value);

    if (value && endTime) {
      const diffHrs =
        (parseInt(endTime.split(":")[0] * 60) +
          parseInt(endTime.split(":")[1]) -
          (parseInt(value.split(":")[0] * 60) +
            parseInt(value.split(":")[1]))) /
        60.0;

      if (diffHrs < 0) {
        setHrs(-diffHrs);
      } else {
        setHrs(diffHrs);
      }
    }
  };
  const handleEndTime = (value) => {
    setEndtime(value);
    if (startTime && value) {
      const diffHrs =
        (parseInt(startTime.split(":")[0] * 60) +
          parseInt(startTime.split(":")[1]) -
          (parseInt(value.split(":")[0] * 60) +
            parseInt(value.split(":")[1]))) /
        60.0;
      if (diffHrs < 0) {
        setHrs(-diffHrs);
      } else {
        setHrs(diffHrs);
      }
    }
  };
  return (
    <div className="workingdays">
      <ScreenNav rightNavData={navData} />
      <div className="lecturer__container">
        <div className="lecturer__box">
          <div className="lead text-success lecturer__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>
          <h2 className="text-center text-dark">Add Working Days and Hours</h2>
          <form id="myForm" onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="days_inputs">
              <label htmlFor="name">Category</label>

              <select
                required
                className="form-control "
                onChange={formik.handleChange}
                name="name"
                value={formik.values.name}
              >
                <option value="">Select Category</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
              </select>
            </div>

            <div className="days_inputs">
              <label htmlFor="center">Working Days per Week</label>
              {formik.values.name == "Weekdays" ? (
                <select
                  required
                  className="form-control "
                  onChange={formik.handleChange}
                  name="daysnum"
                  value={formik.values.daysnum}
                >
                  <option value="">Select Number of Days</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                </select>
              ) : formik.values.name == "Weekends" ? (
                <select
                  required
                  className="form-control "
                  onChange={formik.handleChange}
                  name="daysnum"
                  value={formik.values.daysnum}
                >
                  <option value="">Select Number of Days</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                </select>
              ) : (
                <select
                  className="form-control"
                  onChange={formik.handleChange}
                  name="daysnum"
                  value={formik.values.daysnum}
                  disabled
                >
                  <option value="">None</option>
                </select>
              )}
            </div>

            <div className="days_inputs">
              <label htmlFor="center">Working Days</label>
              {formik.values.name == "Weekdays" ? (
                <select
                  multiple
                  required
                  className="form-control"
                  onChange={formik.handleChange}
                  name="days"
                  value={formik.values.days}
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
              ) : formik.values.name == "Weekends" ? (
                <select
                  multiple
                  required
                  className="form-control"
                  onChange={formik.handleChange}
                  name="days"
                  value={formik.values.days}
                >
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              ) : (
                <select
                  className="form-control"
                  onChange={formik.handleChange}
                  name="days"
                  value={formik.values.days}
                  disabled
                >
                  <option value="None">Select Working Days</option>
                </select>
              )}
            </div>

            <br></br>

            <div className="days_inputs">
              <label htmlFor="center">Working Time From</label>

              <input
                type="time"
                id="fromtime"
                className="form-control"
                min="08:30"
                max="20:00"
                onChange={(e) => handleStartTime(e.target.value)}
                name="fromtime"
                value={startTime}
                required
              />
            </div>

            <div className="days_inputs">
              <label htmlFor="center">Working Time To</label>

              <input
                type="time"
                id="totime"
                className="form-control"
                min="08:30"
                max="20:00"
                onChange={(e) => handleEndTime(e.target.value)}
                name="totime"
                value={endTime}
                required
              />
            </div>

            <div className="days_inputs">
              <label htmlFor="center">Working Hours Per Day</label>
              <input
                required
                className="form-control"
                name="hours"
                value={hrs}
                disabled
              />
            </div>

            <div className="days_inputs">
              <label htmlFor="center">Time Slot</label>
              <select
                required
                className="form-control"
                onChange={formik.handleChange}
                name="timeslot"
                value={formik.values.timeslot}
              >
                <option value="">Select Time Slot</option>
                <option value="30min">30min</option>
                <option value="01h">01h</option>
                <option value="02h">02h</option>
              </select>
            </div>

            <div className="days_buttons">
              <button
                type="submit"
                className="btn"
                disabled={!formik.values.name}
              >
                Add
              </button>
              <button
                type="button"
                className="btn"
                onClick={(e) => {
                  history.push({ pathname: "/workingdays/view" });
                }}
              >
                View
              </button>
              <button type="button" className="btn">
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addworkingdays;
