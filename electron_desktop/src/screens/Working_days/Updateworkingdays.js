import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import {UpdateWorkingdaysDetails} from "../../redux/Working_days/WorkingdaysAction";

const UpdateWorkingdays = (props) => {
    console.log("props.history", props.location);
    const dispatch = useDispatch();
    const history = useHistory();
    const [clicked, isClicked] = useState(false);
    const [success, setSuccess] = useState("Successfully Updated!");

    const { loading, error } = useSelector((state) => state.update_workingdays);

    const [emp_id,setEmpID] = useState('');
    const [name,setName] = useState('');
    const [daysnum,setWorkingdayperweek] =  useState('');
    const [days,setWorkingdays] = useState('');
    const [hours,setTimeperday] = useState('');
    const [timeslot,setTimeslot] =useState('');

    useEffect(() => {
        if (!props.location.state) {
            history.replace({
                pathname: "/workingdays/view",
            });
        }
        else {
           
            setEmpID(props.location.state.emp_id);
            setName(props.location.state.name);
            setWorkingdayperweek(props.location.state.daysnum);
            setWorkingdays(props.location.state.days);
            setTimeperday(props.location.state.hours);
            setTimeslot(props.location.state.timeslot);
          
        }

    }, []);

    const submitHandler =e =>{
        e.preventDefault();
        isClicked(true);
        dispatch(UpdateWorkingdaysDetails(props.location.state?.id,emp_id,name,daysnum,days,hours,timeslot));
        console.log(emp_id,name,daysnum,days,hours,timeslot);
    }

    const navData = [
        {
            id: 1,
            name: "TimeTable > ",
            pathname: "/",
        },
       
        {
            id: 2,
            name: "View Working Days and Hours > ",
            pathname: "/workingdays/view",
        },
        {
            id: 3,
            name: "Update Working Days and Hours",
            pathname: "/workingdays/update",
        },
    ];

    return (

        <div className="workingdays">
          <ScreenNav rightNavData={navData} />
                <div className="lecturer__container">
                    <div className="lecturer__box">
                        <div className="lead text-success lecturer__message">
                            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
                            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
                                {!loading && !error && success}
                                {!loading && error && error}
                            </p>
                        </div>
                        <h2 className="text-center text-dark">Add Working Days and Hours</h2>
                        <form id="myForm" onSubmit={(e) => submitHandler(e)} autoComplete="off">
                <div className="days_inputs">

                <label htmlFor="eid">Employee Id</label>
                <input
                    placeholder="Ex:000150"
                    name="emp_id"
                    type="text"
                    className="form-control"
                    value={emp_id}
                    onChange= {(e) => setEmpID(e.target.value)}
                    required
                />
                </div>

                    <div className="days_inputs">
                        <label htmlFor="name">Name</label>
                        <input
                            placeholder="Ex:Mr.Dilshan De Silva"
                            name="name"
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                   

                    <div className="days_inputs">

                        <label htmlFor="center">Working Days per Week</label>
                        <select required className="form-control "
                         onChange={(e) => setWorkingdayperweek(e.target.value)}
                         name="daysnum" value={daysnum} >
                            <option value="">Select Number of Days</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                        </select>
                    </div>

                        <div className="days_inputs">

                        <label htmlFor="center">Working Days</label>
                        <input type="text" id="fname" className="form-control" name="fname"
                         placeholder="Ex:Monday,Tuesday.."
                         onChange= {(e) => setWorkingdays(e.target.value)}
                         name="days" 
                         value={days}
                         required />
                    </div>


                             <div className="days_inputs">

                        <label htmlFor="center">Working Hours Per Day</label>
                        <select required className="form-control" 
                        onChange=  {(e) => setTimeperday(e.target.value)}
                        name="hours" value={hours}>
                            <option value="">Select Working Hours</option>
                            <option value="01h">01h</option>
                            <option value="02h">02h</option>
                            <option value="03h">03h</option>
                            <option value="04h">04h</option>
                            <option value="05h">05h</option>
                            <option value="06h">06h</option>
                            <option value="07h">07h</option>
                            <option value="08h">08h</option>
                        </select>
                    </div>
                   
                
                 <div className="days_inputs">

                        <label htmlFor="center">Time Slot</label>
                        <select required className="form-control"
                         onChange={(e) => setTimeslot(e.target.value)}
                         name="timeslot"value={timeslot}>
                            <option value="">Select Time Slot</option>
                            <option value="30min">30min</option>
                            <option value="01h">01h</option>
                            <option value="02h">02h</option>
                        </select>
                    </div>
                
                   
                    <div className="days_buttons">
                    <button type="button"  className="btn"
                         onClick={(e) => {
                            history.push({ pathname: "/workingdays/view" });
                          }}>
                            View
                        </button>
                       
                        <button type="submit" className="btn" disabled={!emp_id}>
                            Update
                        </button>
                        <button
                type="button"
                className="btn"
                onClick={(e) => {
                  history.push({ pathname: "/workingdays/view" });
                }}
              >
                Cancel
              </button>
                       
                    </div>
                </form>
            </div>
        </div>
    </div>


    );
    };
export default React.memo(UpdateWorkingdays);
