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
          data.map((data, i) => (
            <option key={i} value={data.sub_name}>
              {data.sub_name}
            </option>
          ))}
        {divName === "tutorial" &&
          data.map((data, i) => (
            <option key={i} value={data.sub_name}>
              {data.sub_name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default ConsecutiveSessionInput;
