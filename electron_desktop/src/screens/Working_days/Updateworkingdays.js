//update  working days

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

   
    const [name,setName] = useState('');
    const [daysnum,setWorkingdayperweek] =  useState('');
    const [days,setWorkingdays] = useState('');
    const [fromtime,setFromtime] = useState('');
    const [totime, setTotime] =useState('');
    const [hours,setTimeperday] = useState('');
    const [timeslot,setTimeslot] =useState('');

    useEffect(() => {
        if (!props.location.state) {
            history.replace({
                pathname: "/workingdays/view",
            });
        }
        else {
           
           
            setName(props.location.state.name);
            setWorkingdayperweek(props.location.state.daysnum);
            setWorkingdays(props.location.state.days);
            setFromtime(props.location.state.fromtime);
            setTotime(props.location.state.totime);
            setTimeperday(props.location.state.hours);
            setTimeslot(props.location.state.timeslot);
          
        }

    }, []);

    const submitHandler =e =>{
        e.preventDefault();
        isClicked(true);
        dispatch(UpdateWorkingdaysDetails(props.location.state?.id,name,daysnum,days,fromtime,totime,hours,timeslot));
        console.log(name,daysnum,days,fromtime,totime,hours,timeslot);
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
                        <label htmlFor="name">Category</label>
                
                        <select className="form-control" onChange={(e) => setName(e.target.value)} name="name" value={name} required>
                            <option value="None">Select Category</option>
                            <option value="Weekdays">Weekdays</option>
                            <option value="Weekends">Weekends</option>
                               
                            </select>
                    </div>
                   

                    <div className="days_inputs">

                        <label htmlFor="center">Working Days per Week</label>

                        {
                             name == "Weekdays" ? (
                                <select className="form-control" onChange={(e) => setWorkingdayperweek(e.target.value)} name="daysnum" value={daysnum} required>
                                    <option value="None">Select Number of Days</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                </select>
                            ):name == "Weekends" ?(
                                <select className="form-control" onChange={(e) => setWorkingdayperweek(e.target.value)}
                                 name="daysnum" 
                                 value={daysnum} 
                                 required>
                                   <option value="None">Select Number of Days</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                </select>
                            ):(
                                <select className="form-control" onChange={(e) => setWorkingdayperweek(e.target.value)} name="daysnum" value={daysnum} disabled>
                                    <option value="">None</option>
                                </select>
                            )
                        }
                    </div>

                        <div className="days_inputs">

                        <label htmlFor="center">Working Days</label>
                        {
                        name == "Weekdays" ? (

                            <select multiple required className="form-control" 
                             onChange= {(e) => setWorkingdays(e.target.value)}
                             name="days" 
                             value={days}>
                               
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                               
                            </select>
                       
                        ):name == "Weekends" ?(

                            <select  multiple required className="form-control" 
                            onChange= {(e) => setWorkingdays(e.target.value)}
                            name="days" 
                            value={days}>
                               
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                                
                               
                            </select>

                                     ):(
                            <select t className="form-control" 
                            onChange= {(e) => setWorkingdays(e.target.value)}
                             name="days" 
                             value={days}
                            placeholder="Select Working Days"
                             disabled>

                             <option value="None">Select Working Days</option>
                             </select>

                               
                            
                            )
                            }
                       
                    </div>

                       <div className="days_inputs">

                <label htmlFor="center">Working Time From</label>

                <input type="time" id="fromtime" className="form-control"
        min="08:30" max="20:00"
     onChange= {(e) => setFromtime(e.target.value)}
     name="fromtime" 
     value={fromtime}
     required />

</div>

<div className="days_inputs">

<label htmlFor="center">Working Time To</label>

<input type="time" id="totime" className="form-control"
        min="08:30" max="20:00"
     onChange= {(e) => setTotime(e.target.value)}
     name="totime" 
     value={totime}
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
                            <option value="09h">09h</option>
                            <option value="10h">10h</option>
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
                       
                        <button type="submit" className="btn" disabled={!name}>
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
