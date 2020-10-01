import React from "react";

const ConsecutiveSessionInput = ({
  labelName,
  id_name,
  formik,
  data,
  divName,
  fvalue,
}) => {
  return (
    <div className="Consecutive_inputs form-group">
      <label htmlFor={id_name} className="text">
        {labelName}
      </label>
      <select
        id={id_name}
        name={id_name}
        className="form-control"
        onChange={formik.handleChange}
        value={fvalue}
      >
        <option value="">{data.length > 0 ? "select" : "No Data"}</option>
        {divName === "lecture" &&
          data.map((result, i) => (
            <option key={i} data-value={result}>
              ( {result.selectedValueLecturer}) {result.selectedValueSubject}(
              {result.subCode}) {result.selectedValueTag}{" "}
              {result.selectedValueGroup?.label} {"  "}
              {result.noOfstudents}({result.timeDuration})
            </option>
          ))}
        {divName === "tutorial" &&
          data.map((result, i) => (
            <option key={i} data-value={result}>
              ( {result.selectedValueLecturer}) {result.selectedValueSubject}(
              {result.subCode}) {result.selectedValueTag}{" "}
              {result.selectedValueGroup?.label} {"  "}
              {result.noOfstudents}({result.timeDuration})
            </option>
          ))}
      </select>
    </div>
  );
};

export default ConsecutiveSessionInput;
