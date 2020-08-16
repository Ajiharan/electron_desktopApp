import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Room.css";
import {Spinner} from "../animations/Spinner";
import {DotLoader} from "react-spinners";
import {addRoom} from "../../redux/Room/RoomAction";
import ScreenNav from "../screen-nav/ScreenNav";
import {useFormik} from 'formik'

const Room = () => {
    
    const dispatch = useDispatch();
    const [clicked, isClicked] = useState(false);
    const [success, setSuccess] = useState("Successfully Added!");
    const { loading, error, room } = useSelector(
        (state) => state.room_add
    );

    const formik = useFormik({
        initialValues : {
            name : '',
            type :'',
            building:'',
            capacity:0, 
        },
        onSubmit :(inputs) =>{
            console.log(inputs)
            isClicked(true);
            dispatch(addRoom(formik.values.title+"."+formik.values.name,formik.values.type,formik.values.building,formik.values.capacity));
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
            name: "Room",
            pathname: "/room/room/add",
          },
    ];

        return (

            <div className="room">
                <ScreenNav rightNavData={navData} />
                <div className="room__container">
                    <div className="room__box">
                        <div className="lead text-success room__message">
                            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
                            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
                                {!loading && !error && success}
                                {!loading && error && error}
                            </p>
                        </div>
                        <h2 className="text-center text-dark">Add Room Details</h2>
                        <form id="myForm" onSubmit={formik.handleSubmit} autoComplete="off">


                            <div className="room_inputs">
                                <label htmlFor="name">Room Name</label>
                                <input
                                    placeholder="A640"
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    required
                                />
                            </div>

                            <div className="room_inputs">
                                <label htmlFor="capacity">Capacity</label>
                                <input
                                    placeholder="150"
                                    name="capacity"
                                    type="text"
                                    className="form-control"
                                    value={formik.values.capacity}
                                    onChange={formik.handleChange}
                                    required
                                />
                            </div>

                            <div className="room_inputs">
                                <label htmlFor="building">Building</label>
                                <select className="form-control" onChange={formik.handleChange} name="building" value={formik.values.building} required>
                                    <option value="">None</option>
                                    <option value="new_building">New Building</option>
                                    <option value="main_building">Main Building</option>
                                    <option value="auditorium">Auditorium</option>
                                </select>
                            </div>

                            <div className="room_inputs">
                                <label htmlFor="type">Type</label>
                                <select className="form-control" onChange={formik.handleChange} name="type" value={formik.values.type} required>
                                    <option value="">None</option>
                                    <option value="lab">Laboratory</option>
                                    <option value="lecture">Lecture</option>
                                   
                                </select>
                            </div>
                           

                            <div className="room_buttons">
                                <button type="button" className="btn">
                                    Clear
                                </button>
                                <button type="submit" className="btn" disabled={!formik.values.name}>
                                    Add
                                </button>
    
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
};


export default Room;
