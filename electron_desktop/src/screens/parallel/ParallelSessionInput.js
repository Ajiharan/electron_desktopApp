import React from "react";

const ParallelSessionInput = ({
  labelName,
  id_name,
  formik,
  data,
  divName,
  fvalue,
}) => {
  console.log("subject", data);
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
        {data.map((result, i) => (
          <option key={i} data-value={result}>
            ( {result.lectures}) {result.subject}({result.subject_code}){" "}
            {result.tag} {result.group_id} {"  "}
            {result.count}({result.duration})
          </option>
        ))}
      </select>
    </div>
  );
};

export default ParallelSessionInput;
