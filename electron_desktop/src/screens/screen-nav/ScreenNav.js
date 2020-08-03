import React from "react";
import "./ScreenNav.css";
import { Link } from "react-router-dom";
const ScreenNav = ({ rightNavData }) => {
  return (
    <div className="yearSemister__navigation">
      <button className="btn btn-link text-dark yearSemister__navleft">
        <h5>{"<"} Go back</h5>
      </button>
      <div className="yearSemister__navRight">
        <h5>
          {rightNavData.map((data) => (
            <Link className="text-dark" key={data.id} to={data.pathname}>
              {data.name}
            </Link>
          ))}
        </h5>
      </div>
    </div>
  );
};

export default ScreenNav;
