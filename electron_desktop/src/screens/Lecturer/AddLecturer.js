import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Lecturer.css";
import {Spinner} from "../animations/Spinner";
import {DotLoader} from "react-spinners";
import {addLecturer, viewLecturer} from "../../redux/Lecturer/LecturerAction";
import ScreenNav from "../screen-nav/ScreenNav";
import {useFormik} from 'formik'
import {viewBuilding} from "../../redux/Building/BuildingAction";

const AddLecturer = () => {
    const dispatch = useDispatch();
    const [clicked, isClicked] = useState(false);
    const [success, setSuccess] = useState("Successfully Added!");
    const { loading, error, lecturer } = useSelector(
        (state) => state.LecturerReducer
    );

    const { load, err, building } = useSelector(
        (state) => state.get_building
    );

    const [buildingData,setBuildingData] = useState([]);

    useEffect(() => {
        dispatch(viewBuilding());
    }, []);

    useEffect(() => {
        setBuildingData(building);
    }, [building]);

    console.log(buildingData);


    const formik = useFormik({
        initialValues : {
            name : '',
            title :'',
            emp_id:0,
            faculty : '',
            department:'',
            center:'',
            building:'',
            level:0,
            rank:0
        },
        onSubmit :(inputs) =>{
            formik.values.name = formik.values.title + "." + formik.values.name;
            formik.values.rank = formik.values.level + "." + formik.values.emp_id;
            console.log(inputs)
            isClicked(true);
            dispatch(addLecturer(inputs));
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
            name: "lecturer > ",
            pathname: "/lecturer/view",
        },
        {
            id: 3,
            name: "Add Lecturer",
            pathname: "/lecturer/add",
        },
    ];

        return (

            <div className="lecturer">
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
                        <h2 className="text-center text-dark">Add Lecturer</h2>
                        <form id="myForm" onSubmit={formik.handleSubmit} autoComplete="off">

                            <div className="lecturer_inputs">
                                <label htmlFor="title">Select Title</label>
                                <select className="form-control"
                                        onChange={formik.handleChange}
                                        name="title"
                                        value={formik.values.title}>
                                            <option>Select</option>
                                            <option value="Mr">Mr</option>
                                            <option value="Ms">Ms</option>
                                            <option value="Mrs">Mrs</option>
                                </select>
                            </div>

                            <div className="lecturer_inputs">
                                <label htmlFor="name">Name</label>
                                <input
                                    placeholder="Mr.Dilshan De Silva"
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    required
                                />
                            </div>

                            <div className="lecturer_inputs">
                                <label htmlFor="eid">Employee Id</label>
                                <input
                                    placeholder="000150"
                                    name="emp_id"
                                    type="text"
                                    className="form-control"
                                    pattern="[0-9]{6}"
                                    title="Should be 6 numbers!"
                                    value={formik.values.emp_id}
                                    onChange={formik.handleChange}
                                    required
                                />
                            </div>

                            <div className="lecturer_inputs">
                                <label htmlFor="center">Center</label>
                                <select className="form-control" onChange={formik.handleChange} name="center" value={formik.values.center} required>
                                    <option value="">None</option>
                                    <option value="Malabe">Malabe</option>
                                    <option value="Metro">Metro</option>
                                    <option value="Kandy">Kandy</option>
                                </select>
                            </div>

                            <div className="lecturer_inputs">
                                <label htmlFor="faculty">Faculty</label>
                                    {
                                        formik.values.center == "Malabe" ? (
                                                <select className="form-control" onChange={formik.handleChange} name="faculty" value={formik.values.faculty} required>
                                                    <option value="">None</option>
                                                    <option value="Computing">Computing</option>
                                                    <option value="Engineering">Engineering</option>
                                                    <option value="Business">Business</option>
                                                    <option value="Humanity science">Humanity science</option>
                                                </select>
                                        ):formik.values.center == "Metro" ?(
                                                    <select className="form-control" onChange={formik.handleChange} name="faculty" value={formik.values.faculty} required>
                                                        <option value="">None</option>
                                                        <option value="Computing">Computing</option>
                                                        <option value="Business">Business</option>
                                                    </select>
                                             ):formik.values.center == "Kandy" ? (
                                                        <select className="form-control" onChange={formik.handleChange} name="faculty" value={formik.values.faculty} required>
                                                            <option value="">None</option>
                                                            <option value="Computing">Computing</option>
                                                            <option value="Business">Business</option>
                                                        </select>
                                                 ):(
                                                            <select className="form-control" onChange={formik.handleChange} name="faculty" value={formik.values.faculty} disabled>
                                                                <option value="">None</option>
                                                            </select>
                                                            )
                                    }

                            </div>

                            <div className="lecturer_inputs">

                                <label htmlFor="department">Department</label>
                                    {
                                        formik.values.center == "Malabe" ?(
                                            formik.values.faculty == "Computing" ?(
                                                    <select className="form-control" onChange={formik.handleChange}  name="department" value={formik.values.department} required>
                                                        <option value="">None</option>
                                                        <option value="Information Technology">Information Technology</option>
                                                        <option value="Computer science & software engineering">Computer science & software engineering</option>
                                                        <option value="Networking">Networking</option>
                                                        <option value="Data Science">Data Science</option>
                                                        <option value="Interactive media">Interactive media</option>
                                                    </select>


                                                )

                                                : formik.values.faculty == "Engineering" ?
                                                (
                                                    <select className="form-control" onChange={formik.handleChange} name="department" value={formik.values.department} required>

                                                        <option value="">None</option>
                                                        <option value="Architecture">Architecture</option>
                                                        <option value="Civil Engineering">Civil Engineering</option>
                                                        <option value="Electronic & Telecommunication Engineering">Electronic & Telecommunication Engineering</option>
                                                        <option value="Quantity Surverying">Quantity Surverying</option>
                                                    </select>
                                                )

                                                :formik.values.faculty == "Business" ?
                                                    (
                                                        <select className="form-control" onChange={formik.handleChange}  name="department" value={formik.values.department} required>
                                                            <option value="">None</option>
                                                            <option value="a">a</option>
                                                            <option value="b">b</option>
                                                            <option value="c">c</option>
                                                            <option value="d">d</option>
                                                        </select>
                                                    )
                                                    :formik.values.faculty == "Humanity science" ?
                                                        (
                                                            <select className="form-control" onChange={formik.handleChange}  name="department" value={formik.values.department} required>

                                                                <option value="">None</option>
                                                                <option value="Nursing">Nursing</option>
                                                                <option value="y">y</option>
                                                                <option value="z">z</option>
                                                                <option value="w">w</option>
                                                            </select>
                                                        )
                                                        :
                                                        (
                                                            <select className="form-control" onChange={formik.handleChange} name="department" value={formik.values.department} disabled>
                                                                <option value="">None</option>
                                                            </select>
                                                        )
                                            ):formik.values.center == "Metro" ?(
                                            formik.values.faculty == "Computing" ?(
                                                    <select className="form-control" onChange={formik.handleChange}  name="department" value={formik.values.department} required>
                                                        <option value="">None</option>
                                                        <option value="Information Technology">Information Technology</option>
                                                        <option value="Computer science & software engineering">Computer science & software engineering</option>
                                                        <option value="Networking">Networking</option>
                                                        <option value="Interactive media">Interactive media</option>
                                                    </select>


                                                )

                                                : formik.values.faculty == "Business" ?
                                                (
                                                    <select className="form-control" onChange={formik.handleChange} name="department" value={formik.values.department} required>
                                                        <option value="">None</option>
                                                        <option value="b">b</option>
                                                        <option value="c">c</option>
                                                    </select>
                                                ):

                                                (
                                                    <select className="form-control" onChange={formik.handleChange} name="department" value={formik.values.department} disabled>
                                                        <option value="">None</option>
                                                    </select>
                                                )
                                        ):formik.values.center == "Kandy" ?(
                                            formik.values.faculty == "Computing" ?(
                                                    <select className="form-control" onChange={formik.handleChange}  name="department" value={formik.values.department} required>
                                                        <option value="">None</option>
                                                        <option value="Information Technology">Information Technology</option>
                                                        <option value="Computer science & software engineering">Computer science & software engineering</option>
                                                        <option value="Networking">Networking</option>
                                                        <option value="Data Science">Data Science</option>
                                                    </select>


                                                )

                                                : formik.values.faculty == "Business" ?
                                                (
                                                    <select className="form-control" onChange={formik.handleChange} name="department" value={formik.values.department} required>

                                                        <option value="">None</option>
                                                        <option value="a">a</option>
                                                        <option value="b">b</option>
                                                        <option value="c">c</option>
                                                    </select>
                                                ):

                                                (
                                                    <select className="form-control" onChange={formik.handleChange} name="department" value={formik.values.department} disabled>
                                                        <option value="">None</option>
                                                    </select>
                                                )
                                        ):(
                                                <select className="form-control" onChange={formik.handleChange} name="department" value={formik.values.department} disabled>
                                                    <option value="">None</option>
                                                </select>
                                            )

                                    }
                            </div>

                            <div className="lecturer_inputs">

                                <label htmlFor="building">Building</label>
                                {
                                    formik.values.center == "Malabe" ?(

                                        formik.values.faculty == "Computing" ?(
                                                        <select className="form-control" onChange={formik.handleChange}  name="building" value={formik.values.building} required>
                                                            <option value="">None</option>
                                                            {
                                                                buildingData.map((e) => <option key={e.id} value={e.building}>{e.building}</option>)
                                                            }
                                                        </select>


                                                    )

                                                    : formik.values.faculty == "Engineering" ?
                                                    (
                                                        <select className="form-control" onChange={formik.handleChange} name="building" value={formik.values.building} required>

                                                            <option value="">None</option>
                                                            <option value="Architecture block">Architecture block</option>
                                                            <option value="Engineering block">Engineering block</option>
                                                            <option value="QS block">QS block</option>
                                                        </select>
                                                    )

                                                    :formik.values.faculty == "Business" ?
                                                        (
                                                            <select className="form-control" onChange={formik.handleChange}  name="building" value={formik.values.building} required>

                                                                <option value="">None</option>
                                                                <option value="D-Block">D-Block</option>
                                                            </select>
                                                        )
                                                        :formik.values.faculty == "Humanity science" ?
                                                            (
                                                                <select className="form-control" onChange={formik.handleChange}  name="building" value={formik.values.building} required>

                                                                    <option value="">None</option>
                                                                    <option value="Nursing">Nursing Block</option>
                                                                </select>
                                                            )
                                                            :
                                                            (
                                                                <select className="form-control" onChange={formik.handleChange} name="building" value={formik.values.building} disabled>
                                                                    <option value="">None</option>
                                                                </select>
                                                            )
                                    ) :formik.values.center =="Metro" ? (
                                        formik.values.faculty == "Computing" ?(
                                                                <select className="form-control" onChange={formik.handleChange}  name="building" value={formik.values.building} required>
                                                                    <option value="">None</option>
                                                                    <option value="Main building">Main building</option>
                                                                    <option value="A building">A building</option>
                                                                </select>

                                                            )


                                                            :formik.values.faculty == "Business" ?
                                                                (
                                                                    <select className="form-control" onChange={formik.handleChange}  name="building" value={formik.values.building} required>
                                                                        <option value="">None</option>
                                                                        <option value="Main building">Main building</option>
                                                                        <option value="X building">X building</option>
                                                                    </select>
                                                                )
                                                                    :
                                                                    (
                                                                        <select className="form-control" onChange={formik.handleChange} name="building" value={formik.values.building} disabled>
                                                                            <option value="">None</option>
                                                                        </select>
                                                                    )
                                        ) :formik.values.center =="Kandy" ?(
                                        formik.values.faculty == "Computing" ?(
                                                                    <select className="form-control" onChange={formik.handleChange}  name="building" value={formik.values.building} required>
                                                                        <option value="">None</option>
                                                                        <option value="Main building">Main building</option>
                                                                        <option value="C building">C building</option>
                                                                    </select>

                                                                )

                                                                :formik.values.faculty == "Business" ?
                                                                    (
                                                                        <select className="form-control" onChange={formik.handleChange}  name="building" value={formik.values.building} required>
                                                                            <option value="">None</option>
                                                                            <option value="Main building">Main building</option>
                                                                            <option value="X building">X building</option>
                                                                        </select>
                                                                    )

                                                                        :
                                                                        (
                                                                            <select className="form-control" onChange={formik.handleChange} name="building" value={formik.values.building} disabled>
                                                                                <option value="">None</option>
                                                                            </select>
                                                                        )
                                    ) :(
                                                <select className="form-control" onChange={formik.handleChange} name="building" value={formik.values.building} disabled>
                                                    <option value="">None</option>
                                                </select>
                                            )
                                }
                            </div>

                            <div className="lecturer_inputs">

                                <label htmlFor="level">Level</label>
                                <select className="form-control" onChange={formik.handleChange} name="level" value={formik.values.level} required>
                                    <option value="">None</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </div>

                            <div className="lecturer_inputs">

                                <label htmlFor="rank">Rank</label>
                                <input
                                    name="rank"
                                    type="text"
                                    className="form-control"
                                    value={ formik.values.level + "." + formik.values.emp_id}
                                    onChange={formik.handleChange}
                                    required
                                />
                            </div>

                            <div className="lecturer_buttons">
                                <button type="button" className="btn">
                                    Clear
                                </button>
                                <button type="submit" className="btn" disabled={!formik.values.emp_id}>
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
};


export default AddLecturer;
