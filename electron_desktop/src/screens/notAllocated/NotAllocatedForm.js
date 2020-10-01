import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import "./NotAllocatedForm.css";
import { useDispatch, useSelector } from "react-redux";
import { addNotAllocatedTime } from "../../redux/notAllocated/notAllocatedAction";

import NotAllocatedError from "./NotAllocatedError";
const NotAllocatedForm = ({ sessions, lectures, groupId, subgroupId }) => {
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.add_notAllocated);

  const formik = useFormik({
    initialValues: {
      categoryType: "",
      categoryValue: [],
      start_time: "",
      end_time: "",
      pdate: "",
    },
    validationSchema: yup.object({
      start_time: yup.string().required("Please enter start time"),
      categoryType: yup.string().required("please select category type"),
      categoryValue: yup.array().required("please select category value"),
      pdate: yup.date().required("please selecet any date.."),
      end_time: yup.string().required("please select end time"),
    }),
    onSubmit: (values, { resetForm }) => {
      isClicked(true);
      console.log("Values", values);
      dispatch(
        addNotAllocatedTime(
          values.categoryValue,
          values.start_time,
          values.end_time,
          values.pdate
        )
      );
      resetForm({ values: "" });
    },
  });
  return (
    <React.Fragment>
      <div className="lead text-success NotAllocated__message">
        {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
        <p className={`lead ${error ? "text-danger" : "text-success"}`}>
          {!loading && !error && success}
          {!loading && error && error}
        </p>
      </div>
      <form id="frm" onSubmit={formik.handleSubmit}>
        <div className="NotAllocated_inputs form-group">
          <label htmlFor="categoryType" className="text">
            category type
          </label>
          <select
            type="time"
            className="form-control"
            onChange={formik.handleChange}
            name="categoryType"
            id="categoryType"
            value={formik.values.categoryType}
          >
            <option value="">select</option>
            <option value="sessions">sessions</option>
            <option value="lectures">lectures</option>
            <option value="groupid">groupid</option>
            <option value="sub_groupid">sub groupid</option>
          </select>
        </div>
        <NotAllocatedError
          error={formik.errors.categoryType}
          touched={formik.touched.categoryType}
        />
        <div className="NotAllocated_inputs form-group">
          <label htmlFor="categoryValue" className="text">
            category value
          </label>
          <select
            multiple
            type="time"
            className="form-control"
            onChange={formik.handleChange}
            name="categoryValue"
            id="categoryValue"
            data-value={formik.values.categoryValue}
          >
            <option value="">select</option>
            {formik.values.categoryType === "sessions" &&
              sessions.map((result, i) => (
                <option key={i} data-value={result}>
                  ( {result.selectedValueLecturer}){" "}
                  {result.selectedValueSubject}({result.subCode}){" "}
                  {result.selectedValueTag} {result.selectedValueGroup.label}{" "}
                  {"  "}
                  {result.noOfstudents}({result.timeDuration})
                </option>
              ))}
            {formik.values.categoryType === "lectures" &&
              lectures.map((result, i) => (
                <option key={i} data-value={result.name}>
                  {result.name}
                </option>
              ))}
            {formik.values.categoryType === "groupid" &&
              groupId.map((result, i) => (
                <option key={i} data-value={result.gen_groupid}>
                  {result.gen_groupid}
                </option>
              ))}
            {formik.values.categoryType === "sub_groupid" &&
              subgroupId.map((result, i) => (
                <option key={i} data-value={result.gen_subgroupid}>
                  {result.gen_subgroupid}
                </option>
              ))}
          </select>
        </div>
        <NotAllocatedError
          error={formik.errors.categoryValue}
          touched={formik.touched.categoryValue}
        />
        <div className="NotAllocated_inputs form-group">
          <label htmlFor="start_time" className="text">
            starting time
          </label>
          <input
            type="time"
            className="form-control"
            onChange={formik.handleChange}
            name="start_time"
            id="start_time"
            value={formik.values.start_time}
          />
        </div>
        <NotAllocatedError
          error={formik.errors.start_time}
          touched={formik.touched.start_time}
        />
        <div className="NotAllocated_inputs form-group">
          <label htmlFor="end_time" className="text">
            Ending time
          </label>
          <input
            type="time"
            className="form-control"
            onChange={formik.handleChange}
            name="end_time"
            id="end_time"
            value={formik.values.end_time}
          />
        </div>
        <NotAllocatedError
          error={formik.errors.end_time}
          touched={formik.touched.end_time}
        />

        <div className="NotAllocated_inputs form-group">
          <label htmlFor="pdate" className="text">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            name="pdate"
            id="pdate"
            onChange={formik.handleChange}
            value={formik.values.pdate}
          />
        </div>
        <NotAllocatedError
          error={formik.errors.pdate}
          touched={formik.touched.pdate}
        />

        <div className="ParllelSession_buttons">
          <button type="submit" className="btn">
            Generate session
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default NotAllocatedForm;
