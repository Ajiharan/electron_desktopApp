import React from "react";
import "./home.css";
import { Spinner } from "../animations/Spinner";
import Search from "./Search";
import HomeList from "./HomeList";
import { Link } from "react-router-dom";
import { BeatLoader, BounceLoader } from "react-spinners";
const Home = () => {
  const searchData = (e) => {};
  return (
    <React.Fragment>
      <div className="container-fluid mt-4 pt-1" id="homeContainer">
        <div className="row">
          <div className="col-md-3">
            <HomeList />
          </div>
          <div className="col-md-5">
            <div style={{ marginLeft: "450px" }}>
              <Spinner Loader={BeatLoader} />
            </div>

            <div className="gifContainers">
              <img
                className=" img-thumbnail"
                src={require("../images/imageHome1.gif")}
              />
              <img
                className=" img-thumbnail"
                src={require("../images/imageHome1.gif")}
              />

              <img
                className=" img-thumbnail"
                src={require("../images/imageHome1.gif")}
              />
              <img
                className=" img-thumbnail"
                src={require("../images/imageHome1.gif")}
              />
              <img
                className=" img-thumbnail"
                src={require("../images/imageHome1.gif")}
              />
              <img
                className=" img-thumbnail"
                src={require("../images/imageHome1.gif")}
              />
            </div>
          </div>
        </div>
        <div className="row"></div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(Home);
