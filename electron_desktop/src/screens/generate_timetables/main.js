
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader, BounceLoader } from "react-spinners";
import { Link, useHistory } from "react-router-dom";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { addWorkingdays } from "../../redux/Working_days/WorkingdaysAction";
import ScreenNav from "../screen-nav/ScreenNav";
import { useFormik } from "formik";
import "./main.css";

const Addworkingdays = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [clicked, isClicked] = useState(false);
  
 

  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },

    {
      id: 2,
      name: "Generate Timetable",
      pathname: "/generate_timetables/main",
    },
  ];

  
  return (
    <div className="container-fluid">
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
        <div className="gen_buttons" id="bt" >
              <button
                type="button"
                className="btn1" 
                  onClick={(e) => {
                     history.push({ pathname: "/generate_timetables/lecturer_table" });
                  }}
                >
                Lecturers
              </button>
              
              <button
                type="button"
                className="btn1"
                onClick={(e) => {
                   history.push({ pathname: "/generate_timetables/student_timetable" });
                 }}
              >
                Student Groups
              </button>
              <button
                type="button"
                className="btn1"
                 onClick={(e) => {
                history.push({ pathname: "/generate_timetables/location_table" });
                 }}
              >
               Locations
              </button>
            </div>
        </div>
        
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
      </div>
  );
};

export default Addworkingdays;
