import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import "./Search.css";
const Search = ({ searchData }) => {
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center h-100">
        <div className="searchbar">
          <input
            className="search_input"
            type="text"
            name=""
            placeholder="Search..."
            onChange={(e) => searchData(e.target.value)}
          />
          <Link className="search_icon">
            <SearchIcon
              onClick={() => {
                console.log("Clicked..");
              }}
            />
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(Search);
