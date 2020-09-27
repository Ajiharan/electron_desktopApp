import React from "react";
import "./main.css";
import { Spinner } from "../animations/Spinner";
import { Link } from "react-router-dom";
import { BeatLoader, BounceLoader } from "react-spinners";
import ScreenNav from "../screen-nav/ScreenNav";
const main = () => {
    const navData = [
        {
          id: 1,
          name: "TimeTable > Generate Time Table",
          pathname: "/",
        },
        {
        id: 2,
        name: "Add Working Days and Hours",
        pathname: "/generate_timetables/main",
      },
      ];
    
  
  return (
    <React.Fragment>
      <div className="container-fluid">
      <ScreenNav rightNavData={navData} />
        <div className="row">
       
          <div className="col-md-5" id="div">
            <Spinner Loader={BeatLoader} />
            <img
              className="img-fluid img-thumbnail" id="img"
              src={require("../images/giphy.gif")}
            />
          </div>
          
        </div>
        <div className="container-fluid" >
        <div className="days_buttons" id="bt" >
              <button
                type="button"
                className="btn" 
                // onClick={(e) => {
                //     history.push({ pathname: "/Lecturer_timetable/view" });
                // }}
                >
                Lecturer
              </button>
              <button
                type="button"
                className="btn"
                // onClick={(e) => {
                //   history.push({ pathname: "/Student_timetable/view" });
                // }}
              >
                Student Groups
              </button>
              <button
                type="button"
                className="btn"
                // onClick={(e) => {
                //   history.push({ pathname: "/Hall_timetable/view" });
                // }}
              >
               Lecture Halls
              </button>
            </div>
        </div>
        <br></br>
        <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley Lorem
            Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley Lorem Ipsum is  Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley Lorem
            Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley Lorem Ipsum is
        </p>
      </div>
      <div className="container-fluid">
        <p className="lead text-center home__footer">@copyright 2020</p>
      </div>
    </React.Fragment>
  );
};

export default main;
