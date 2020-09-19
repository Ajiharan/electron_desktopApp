import React from "react";

const ParallelSessionInput = ({
  labelName,
  id_name,
  formik,
  data,
  divName,
  fvalue,
}) => {
  //   console.log("subject", data);
  return (
    <div className="Consecutive_inputs form-group">
      <label htmlFor={id_name} className="text-light">
        {labelName}
      </label>
      <select
        multiple
        id={id_name}
        name={id_name}
        className="form-control"
        onChange={formik.handleChange}
        value={fvalue}
      >
        <option value="">{data.length > 0 ? "select" : "No Data"}</option>
        {data.map((data, i) => (
          <option key={i} value={data.sub_name}>
            {data.sub_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ParallelSessionInput;
