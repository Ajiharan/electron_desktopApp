import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import "./GenForm.css";
import { useDispatch, useSelector } from "react-redux";
import { addGenGroupId } from "../../redux/genId/genIdAction";
import GenIdInput from "./GenIdInput";
import GenIdInputError from "./GenIdInputError";
const GenIdForm = ({ year_semister, student_programme, groupNo }) => {
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.genGroupId);
  const formik = useFormik({
    initialValues: {
      year_semister: "",
      programme: "",
      groupNo: "",
    },
    validationSchema: yup.object({
      year_semister: yup.string().required("Please select any value"),
      programme: yup.string().required("please select any value"),
      groupNo: yup.string().required("please select any value"),
    }),
    onSubmit: (values, { resetForm }) => {
      isClicked(true);
      console.log(
        "Values",
        `${values.year_semister}.${values.programme}.${values.groupNo}`
      );
      dispatch(
        addGenGroupId(
          `${values.year_semister}.${values.programme}.${values.groupNo}`
        )
      );
      resetForm({ values: "" });
    },
  });
  return (
    <React.Fragment>
      <div className="lead text-success GenGroupId__message">
        {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
        <p className={`lead ${error ? "text-danger" : "text-success"}`}>
          {!loading && !error && success}
          {!loading && error && error}
        </p>
      </div>
      <form id="frm" onSubmit={formik.handleSubmit}>
        <GenIdInput
          labelName={"Year&Semister"}
          id_name={"year_semister"}
          formik={formik}
          data={year_semister}
          divName={"year_semister"}
          fvalue={formik.values.year_semister}
        />
        <GenIdInputError
          error={formik.errors.year_semister}
          touched={formik.touched.year_semister}
        />
        <GenIdInput
          labelName={"Programme"}
          id_name={"programme"}
          formik={formik}
          data={student_programme}
          divName={"student_programme"}
          fvalue={formik.values.programme}
        />
        <GenIdInputError
          error={formik.errors.programme}
          touched={formik.touched.programme}
        />
        <GenIdInput
          labelName={"Group No"}
          id_name={"groupNo"}
          formik={formik}
          data={groupNo}
          divName={"groupNo"}
          fvalue={formik.values.groupNo}
        />
        <GenIdInputError
          error={formik.errors.groupNo}
          touched={formik.touched.groupNo}
        />

        <div className="GenGroupId_buttons">
          {year_semister.length > 0 &&
            student_programme.length > 0 &&
            groupNo.length > 0 && (
              <button type="submit" className="btn">
                Generate Id
              </button>
            )}
        </div>
      </form>
    </React.Fragment>
  );
};

export default GenIdForm;
