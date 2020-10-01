import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./timetable_location.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { UpdateRoom } from "../../redux/Room/RoomAction";
import ScreenNav from "../screen-nav/ScreenNav";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
const Room = (props) => {
  console.log("props.history", props.location.state?.room.name);
  const dispatch = useDispatch();
  const history = useHistory();
  const [roomData, setroomData] = useState("");
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Updated");

  const { loading, error } = useSelector((state) => state.update_room);

  useEffect(() => {
    if (!props.location.state) {
      history.replace({
        pathname: "/generate_timetables/location_table",
      });
    } else {
      setroomData(props.location.state);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: props.location.state?.room.name,
     
      building: props.location.state?.room.building,
     
    },
    
  });

  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
        id: 2,
        name: "Generate TimeTable > ",
        pathname: "/generate_timetables/main",
    },
    {
        id: 3,
        name: "Location Details >",
  pathname: "/generate_timetables/location_table",
    },
    {
        id: 4,
        name: "Location TimeTable",
        pathname: "/generate_timetables/timetable_location",
    },
  ];

  return (
    <div className="roomUpdate">
      <ScreenNav rightNavData={navData} />
      <div className="roomUpdate__container">
        <div className="roomUpdate__box">
         

          <h2 className="text-center text-dark">Location Time Table</h2>
       
            <table>
                <tr>
                <td>
                    <label htmlFor="building">Building</label>
              <input 
              type="text"
                className="form-control"
                onChange={formik.handleChange}
                name="building"
               className="form-control"
                value={formik.values.building}
              
              />
                    </td>
                    <td>
                    <label htmlFor="name">Room Name</label>
              <input
                placeholder="A640"
                name="name"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.name}
               
              />
                    </td>
                   
                </tr>
            </table>
            <br></br>

            <div>
                   <table className="table table-light table-hover  LecturerViewContainer__table" id="lec">
                      <thead>
                      <tr>
                        <th>Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                        
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                              <td>8.30</td>
                              <td>IT2030-OOP(lecture)
                              <br></br>
                                    Ms.Kushnara
                                    <br></br>
                                    Y2.S1.03(IT)
                                    </td>
                              

                          </tr>
                          <tr>
                              <td>9.30</td>
                              

                          </tr>
                          <tr>
                              <td>10.30</td>
                             

                          </tr>
                          <tr>
                              <td>11.30</td>
                             
                          </tr>
                          <tr>
                              <td>12.30</td>
                              <td>--X--</td>
                                <td>--X--</td>
                                <td>--X--</td>
                                <td>--X--</td>
                                <td>--X--</td>
                              <td>--X--</td>
                              <td>--X--</td>

                          </tr>
                          <tr>
                              <td>01.30</td>
                             

                          </tr>
                          <tr>
                              <td>2.30</td>
                             

                          </tr>
                          <tr>
                              <td>3.30</td>
                              

                          </tr>
                          <tr>
                              <td>4.30</td>
                            

                          </tr>
                          <tr>
                              <td>5.30</td>
                              

                          </tr>

                      </tbody>
                      </table>
                   </div>             
            

          


         
        </div>
      </div>
    </div>
  );
};

export default Room;
