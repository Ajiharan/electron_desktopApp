import React from "react";

const GenIdInputError = ({ error, touched }) => {
  return (
    <div className="error_div">
      {error && touched ? (
        <h6 className={"text-warning text-center"}>
          <i className="fas fa-exclamation"></i>
          {error}{" "}
        </h6>
      ) : null}
    </div>
  );
};

export default GenIdInputError;
