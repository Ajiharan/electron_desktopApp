import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import "./ConsecutiveForm.css";
import { useDispatch, useSelector } from "react-redux";
import { addConsecutiveSessions } from "../../redux/consecutive/consecutiveAction";
import ConsecutiveSessionInput from "./ConsecutiveSessionInput";
import ConsecutiveSessionError from "./ConsecutiveSessionError";
const ConsecutiveForm = ({ subject }) => {
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const dispatch = useDispatch();
  const { loading, error } = useSelector(
    (state) => state.add_consecutiveSession
  );
  const formik = useFormik({
    initialValues: {
      lecture: "",
      tutorial: "",
    },
    validationSchema: yup.object({
      lecture: yup.string().required("Please select any value"),
      tutorial: yup.string().required("please select any value"),
    }),
    onSubmit: (values, { resetForm }) => {
      isClicked(true);
      console.log("Values", values);
      dispatch(addConsecutiveSessions(values.lecture, values.tutorial));
      resetForm({ values: "" });
    },
  });
  return (
    <React.Fragment>
      <div className="lead text-success Consecutive__message">
        {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
        <p className={`lead ${error ? "text-danger" : "text-success"}`}>
          {!loading && !error && success}
          {!loading && error && error}
        </p>
      </div>
      <form id="frm" onSubmit={formik.handleSubmit}>
        <ConsecutiveSessionInput
          labelName={"lecture"}
          id_name={"lecture"}
          formik={formik}
          data={subject}
          divName={"lecture"}
          fvalue={formik.values.lecture}
        />
        <ConsecutiveSessionError
          error={formik.errors.lecture}
          touched={formik.touched.lecture}
        />
        <ConsecutiveSessionInput
          labelName={"tutorial"}
          id_name={"tutorial"}
          formik={formik}
          data={subject}
          divName={"tutorial"}
          fvalue={formik.values.tutorial}
        />
        <ConsecutiveSessionError
          error={formik.errors.tutorial}
          touched={formik.touched.tutorial}
        />

        <div className="Consecutive_buttons">
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

export default ConsecutiveForm;
