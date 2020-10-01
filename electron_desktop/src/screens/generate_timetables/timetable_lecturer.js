import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import {UpdateLecturerDetails} from "../../redux/Lecturer/LecturerAction";

const ViewLecturer = (props) => {
    console.log("props.history", props.location);
    const dispatch = useDispatch();
    const history = useHistory();
    const [clicked, isClicked] = useState(false);
    const [success, setSuccess] = useState("Successfully Updated!");

    const { loading, error } = useSelector((state) => state.Update_lecturer);

    const [name,setName] = useState('');
    const [emp_id,setEmpID] = useState('');
   

    useEffect(() => {
        if (!props.location.state) {
            history.replace({
                pathname: "/generate_timetables/lecturer_table",
            });
        }
        else {
            setName(props.location.state.name);
            setEmpID(props.location.state.emp_id);
           
        }

    }, []);

    const submitHandler =e =>{
        e.preventDefault();
        isClicked(true);
        dispatch(UpdateLecturerDetails(props.location.state?.id,name,emp_id));
        console.log(name,emp_id);
    }

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
            name: "Lecturer Details >",
      pathname: "/generate_timetables/lecturer_table",
        },
        {
            id: 4,
            name: "Lecturer TimeTable",
            pathname: "/generate_timetables/timetable_lecturer",
        },
    ];

    return (
        <div className="lecturer">
            <ScreenNav rightNavData={navData} />
            <div className="lecturer__container">
                <div className="lecturer__box">
                  
                    <h2 className="text-center text-dark">Lecturer Time Table</h2>
                   

                        <table>
                            <tr>
                                <td>
                                <label htmlFor="name">Lecturer Name</label>
                            <input
                               
                                name="name"
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            /> 
                                </td>
                                <td>
                                <label htmlFor="eid">Employee Id</label>
                            <input
                                placeholder="000150"
                                name="emp_id"
                                type="text"
                                className="form-control"
                                pattern="[0-9]{6}"
                                title="Should be 6 numbers!"
                                value={emp_id}
                                onChange={(e) => setEmpID(e.target.value)}
                                required
                            /> 
                                </td>
                            </tr>
                        </table>
<br>
</br>
                   <div>
                   <table className="table table-light table-hover table-border LecturerViewContainer__table" id="lec">
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
                                <br></br>Y2.S1.03(IT)
                                    <br></br>B501
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

export default React.memo(ViewLecturer);
