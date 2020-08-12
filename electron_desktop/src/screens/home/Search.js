import React from "react";
import SearchIcon from "@material-ui/icons/Search";
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
          <a href="#" className="search_icon">
            <SearchIcon />
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(Search);
