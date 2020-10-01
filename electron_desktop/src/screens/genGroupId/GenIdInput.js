import React from "react";

const GenIdInput = ({ labelName, id_name, formik, data, divName, fvalue }) => {
  return (
    <div className="GenGroupId_inputs form-group">
      <label htmlFor="group_id" className="text">
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
        {divName === "year_semister" &&
          data.map((data, i) => (
            <option key={data.timestamp} value={data.year_semister}>
              {data.year_semister}
            </option>
          ))}
        {divName === "student_programme" &&
          data.map((data, i) => (
            <option key={data.timestamp} value={data.programme}>
              {data.programme}
            </option>
          ))}
        {divName === "groupNo" &&
          data.map((data, i) => (
            <option key={data.timestamp} value={data.groupid}>
              {data.groupid}
            </option>
          ))}
      </select>
    </div>
  );
};

export default GenIdInput;
