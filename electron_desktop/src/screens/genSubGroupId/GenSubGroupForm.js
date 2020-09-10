import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import "./GenSubGroupForm.css";
import { useDispatch, useSelector } from "react-redux";
import { addGenSubGroupId } from "../../redux/gensubId/genSubIdAction";
import GenSubIdInput from "./GenSubIdInput";
import GenSubIdError from "./GenSubIdError";
const GenSubGroupForm = ({ gen_groupid, sub_groupid }) => {
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.genSubGroupId);
  const formik = useFormik({
    initialValues: {
      gen_groupid: "",
      sub_groupid: "",
    },
    validationSchema: yup.object({
      gen_groupid: yup.string().required("Please select any value"),
      sub_groupid: yup.string().required("please select any value"),
    }),
    onSubmit: (values, { resetForm }) => {
      isClicked(true);
      console.log("Values", `${values.gen_groupid}.${values.sub_groupid}`);
      dispatch(addGenSubGroupId(`${values.gen_groupid}.${values.sub_groupid}`));
      resetForm({ values: "" });
    },
  });
  return (
    <React.Fragment>
      <div className="lead text-success GenSubGroupId__message">
        {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
        <p className={`lead ${error ? "text-danger" : "text-success"}`}>
          {!loading && !error && success}
          {!loading && error && error}
        </p>
      </div>
      <form id="frm" onSubmit={formik.handleSubmit}>
        <GenSubIdInput
          labelName={"gen_groupid"}
          id_name={"gen_groupid"}
          formik={formik}
          data={gen_groupid}
          divName={"gen_groupid"}
          fvalue={formik.values.gen_groupid}
        />
        <GenSubIdError
          error={formik.errors.gen_groupid}
          touched={formik.touched.gen_groupid}
        />
        <GenSubIdInput
          labelName={"sub_groupid"}
          id_name={"sub_groupid"}
          formik={formik}
          data={sub_groupid}
          divName={"sub_groupid"}
          fvalue={formik.values.sub_groupid}
        />
        <GenSubIdError
          error={formik.errors.sub_groupid}
          touched={formik.touched.sub_groupid}
        />

        <div className="GenSubGroupId_buttons">
          {sub_groupid.length > 0 && gen_groupid.length > 0 && (
            <button type="submit" className="btn">
              Generate Sub GroupId
            </button>
          )}
        </div>
      </form>
    </React.Fragment>
  );
};

export default GenSubGroupForm;
