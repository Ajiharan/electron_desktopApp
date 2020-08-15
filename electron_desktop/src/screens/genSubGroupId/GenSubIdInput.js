import React from "react";
const GenSubIdInput = ({
  labelName,
  id_name,
  formik,
  data,
  divName,
  fvalue,
}) => {
  return (
    <div className="GenSubGroupId_inputs form-group">
      <label htmlFor={id_name} className="text-light">
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
        {divName === "gen_groupid" &&
          data.map((data, i) => (
            <option key={data.gen_groupid} value={data.gen_groupid}>
              {data.gen_groupid}
            </option>
          ))}
        {divName === "sub_groupid" &&
          data.map((data, i) => (
            <option key={data.timestamp} value={data.sub_groupid}>
              {data.sub_groupid}
            </option>
          ))}
      </select>
    </div>
  );
};

export default GenSubIdInput;
