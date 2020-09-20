import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import "./ParallelForm.css";
import { useDispatch, useSelector } from "react-redux";
import { addParallelSessions } from "../../redux/parallel/parallelSessionAction";
import ParallelSessionInput from "./ParallelSessionInput";
import ParallelSessionError from "./ParallelSessionError";
const ParallelForm = ({ subject }) => {
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.add_parallelSession);
  //start_time, duration, pdate, session

  const formik = useFormik({
    initialValues: {
      start_time: "",
      duration: "",
      pdate: "",
      session: [],
    },
    validationSchema: yup.object({
      start_time: yup.string().required("Please select any value"),
      duration: yup
        .number()
        .typeError("please enter number only")
        .required("please select any value"),
      pdate: yup.date().required("please selecet any date.."),
      session: yup.array().required("please select any value"),
    }),
    onSubmit: (values, { resetForm }) => {
      isClicked(true);
      console.log("Values", values);
      dispatch(
        addParallelSessions(
          values.start_time,
          values.duration,
          values.pdate,
          values.session
        )
      );
      resetForm({ values: "" });
    },
  });
  return (
    <React.Fragment>
      <div className="lead text-success ParllelSession__message">
        {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
        <p className={`lead ${error ? "text-danger" : "text-success"}`}>
          {!loading && !error && success}
          {!loading && error && error}
        </p>
      </div>
      <form id="frm" onSubmit={formik.handleSubmit}>
        <div className="ParllelSession_inputs form-group">
          <label htmlFor="duration" className="text-light">
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
        <ParallelSessionError
          error={formik.errors.start_time}
          touched={formik.touched.start_time}
        />
        <div className="ParllelSession_inputs form-group">
          <label htmlFor="duration" className="text-light">
            Duration
          </label>
          <input
            type="text"
            className="form-control"
            name="duration"
            id="duration"
            placeholder="eg:3hrs"
            onChange={formik.handleChange}
            value={formik.values.duration}
          />
        </div>
        <ParallelSessionError
          error={formik.errors.duration}
          touched={formik.touched.duration}
        />
        <div className="ParllelSession_inputs form-group">
          <label htmlFor="duration" className="text-light">
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
        <ParallelSessionError
          error={formik.errors.pdate}
          touched={formik.touched.pdate}
        />
        <ParallelSessionInput
          labelName={"session"}
          id_name={"session"}
          formik={formik}
          data={subject}
          divName={"session"}
          fvalue={formik.values.session}
        />
        <ParallelSessionError
          error={formik.errors.session}
          touched={formik.touched.session}
        />
        <div className="ParllelSession_buttons">
          {subject.length > 0 && (
            <button type="submit" className="btn">
              Generate session
            </button>
          )}
        </div>
      </form>
    </React.Fragment>
  );
};

export default ParallelForm;
