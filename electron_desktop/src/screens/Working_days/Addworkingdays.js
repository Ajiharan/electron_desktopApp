import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Addworkingdays.css";
import {Link, useHistory} from "react-router-dom";
import {Spinner} from "../animations/Spinner";
import {DotLoader} from "react-spinners";
import {addWorkingdays} from "../../redux/Working_days/WorkingdaysAction";
import ScreenNav from "../screen-nav/ScreenNav";
import {useFormik} from 'formik'

const Addworkingdays = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [clicked, isClicked] = useState(false);
    const [success, setSuccess] = useState("Successfully Added");
    const { loading, error, workingdays } = useSelector(
        (state) => state.WorkingdaysReducer
    );
   
 
    const formik = useFormik({
        initialValues : {
            emp_id:'',
            name:'',
            daysnum : '',
            days:'',
            hours:'',
            timeslot:'',           
        },
        onSubmit :(inputs) =>{
            console.log(inputs)
            isClicked(true);
            dispatch(addWorkingdays(formik.values.emp_id,formik.values.name,formik.values.daysnum,formik.values.days,formik.values.hours,formik.values.timeslot));
        }
    })


const navData = [
    {
        id: 1,
        name: "TimeTable > ",
        pathname: "/",
    },
 
    {
        id: 2,
        name: "Add Working Days and Hours",
        pathname: "/workingdays/add",
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
                        <form id="myForm" onSubmit={formik.handleSubmit} autoComplete="off">
                <div className="days_inputs">

                <label htmlFor="eid">Employee Id</label>
                <input
                    placeholder="Ex:000150"
                    name="emp_id"
                    type="text"
                    className="form-control"
                    value={formik.values.emp_id}
                    onChange={formik.handleChange}
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
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>
                   

                    <div className="days_inputs">

                        <label htmlFor="center">Working Days per Week</label>
                        <select required className="form-control " onChange={formik.handleChange}
                         name="daysnum" value={formik.values.daysnum} >
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
                         onChange= {formik.handleChange}
                         name="days" 
                         value={formik.values.days}
                         required />
                    </div>


                             <div className="days_inputs">

                        <label htmlFor="center">Working Hours Per Day</label>
                        <select required className="form-control" onChange={formik.handleChange}
                        name="hours" value={formik.values.hours}>
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
                        <select required className="form-control" onChange={formik.handleChange}
                         name="timeslot"value={formik.values.timeslot}>
                            <option value="">Select Time Slot</option>
                            <option value="30min">30min</option>
                            <option value="01h">01h</option>
                            <option value="02h">02h</option>
                        </select>
                    </div>
                
                   
                    <div className="days_buttons">
                       
                        <button type="submit" className="btn" disabled={!formik.values.emp_id}>
                            Add
                        </button>
                        <button
                type="button"
                className="btn"
                onClick={(e) => {
                  history.push({ pathname: "/workingdays/view" });
                }}
              >
                View
              </button>
                        <button type="button"  className="btn">
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>


    );
    };


export default Addworkingdays;
