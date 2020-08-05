import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Lecturer.css";
import {Link, useHistory} from "react-router-dom";
import {Spinner} from "../animations/Spinner";
import {DotLoader} from "react-spinners";
import {addLecturer} from "../../redux/Lecturer/LecturerAction";
import ScreenNav from "../screen-nav/ScreenNav";

const AddLecturer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [clicked, isClicked] = useState(false);
    const [success, setSuccess] = useState("Successfully Added");
    const { loading, error, lecturer } = useSelector(
        (state) => state.LecturerReducer
    );

    const [name,setName] = useState('');
    const [emp_id,setEmpID] = useState('');
    const [faculty,setFaculty] =  useState('');
    const [department,setDepartment] = useState('');
    const [center,setCenter] = useState('');
    const [building,setBuilding] =useState('')
    const [level,setLevel] =useState(0);
    const [rank,setRank] =useState('');

    const handlechangeName = event=> {
        setName(event.target.value);
    }
    const handlechangeEmpID = event=> {
        setEmpID(event.target.value);
    }
    const handlechangeFaculty = event=> {

        setFaculty(event.target.value);
    }
    const handlechangeDepartment= event=> {

        setDepartment(event.target.value);
    }
    const handlechangeBuilding = event=> {

        setBuilding(event.target.value);
    }
    const handlechangeCenter = event=> {

        setCenter(event.target.value);
    }
    const handlechangeLevel = event=> {

        setLevel(event.target.value);
        setRank(level+"."+emp_id)
    }




    const infoSubmit =event =>{
        event.preventDefault();
        isClicked(true);
        dispatch(addLecturer(name,emp_id,faculty,center,department,building,level,rank));
        setEmpID("");
        setName("");
        setCenter("");
        setFaculty("");
        setDepartment("");
        setLevel("");
        setRank("");
    }

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
                            <p className={`lead ${error ? "text-danger" : "text-light"}`}>
                                {!loading && !error && success}
                                {!loading && error && error}
                            </p>
                        </div>
                        <h2 className="text-center text-dark">Add Lecturer</h2>
                        <form id="myForm" onSubmit={infoSubmit} autoComplete="off">
                            <div className="lecturer_inputs">
                                <label htmlFor="name">Name</label>
                                <input
                                    placeholder="Mr.Dilshan De Silva"
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={handlechangeName}
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
                                    value={emp_id}
                                    onChange={handlechangeEmpID}
                                    required
                                />
                            </div>

                            <div className="lecturer_inputs">

                                <label htmlFor="faculty">Faculty</label>
                                    <select className="form-control" onChange={handlechangeFaculty} name="faculty" value={faculty}>
                                        <option>Select Faculty</option>
                                        <option value="Computing">Computing</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Business">Business</option>
                                        <option value="Humanity science">Humanity science</option>
                                    </select>
                            </div>
                            <div className="lecturer_inputs">

                                <label htmlFor="department">Department</label>
                                    {
                                        faculty == "Computing" ?(
                                            <select className="form-control" onChange={handlechangeDepartment}  name="department" value={department}>
                                                    <option>Select department</option>
                                                    <option value="Information Technology">Information Technology</option>
                                                    <option value="Computer science & software engineering">Computer science & software engineering</option>
                                                    <option value="Networking">Networking</option>
                                                    <option value="Data Science">Data Science</option>
                                                    <option value="Interactive media">Interactive media</option>
                                            </select>


                                            )

                                            : faculty == "Engineering" ?
                                                    (
                                                        <select className="form-control" onChange={handlechangeDepartment} name="department" value={department}>

                                                            <option>Select department</option>
                                                            <option value="Architecture">Architecture</option>
                                                            <option value="Civil Engineering">Civil Engineering</option>
                                                            <option value="Electronic & Telecommunication Engineering">Electronic & Telecommunication Engineering</option>
                                                            <option value="Quantity Surverying">Quantity Surverying</option>
                                                        </select>
                                                    )

                                                    :faculty == "Business" ?
                                                            (
                                                                <select className="form-control" onChange={handlechangeDepartment}  name="department" value={department}>

                                                                    <option>Select department</option>
                                                                    <option value="a">a</option>
                                                                    <option value="b">b</option>
                                                                    <option value="c">c</option>
                                                                    <option value="d">d</option>
                                                                </select>
                                                            )
                                                            :faculty == "Humanity science" ?
                                                                        (
                                                                            <select className="form-control" onChange={handlechangeDepartment}  name="department" value={department}>

                                                                                <option>Select Department</option>
                                                                                <option value="Nursing">Nursing</option>
                                                                                <option value="y">y</option>
                                                                                <option value="z">z</option>
                                                                                <option value="w">w</option>
                                                                            </select>
                                                                        )
                                                                        :
                                                                        (
                                                                            <select className="form-control" onChange={handlechangeDepartment} name="department" value={department} disabled>
                                                                                <option>Select Department</option>
                                                                            </select>
                                                                        )
                                    }
                            </div>

                            <div className="lecturer_inputs">

                                <label htmlFor="center">Center</label>
                                <select className="form-control" onChange={handlechangeCenter} name="center" value={center}>
                                    <option>Select Center</option>
                                    <option value="Malabe">Malabe</option>
                                    <option value="Metro">Metro</option>
                                    <option value="Kandy">Kandy</option>
                                    <option value="Matara">Matara</option>
                                    <option value="Kurunegala">Kurunegala</option>
                                    <option value="Jaffna">Jaffna</option>
                                </select>
                            </div>

                            <div className="lecturer_inputs">

                                <label htmlFor="building">Building</label>
                                {
                                    center == "Malabe" ?(

                                                faculty == "Computing" ?(
                                                        <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                            <option>Select Building</option>
                                                            <option value="Main building">Main building</option>
                                                            <option value="New building">New building</option>
                                                        </select>


                                                    )

                                                    : faculty == "Engineering" ?
                                                    (
                                                        <select className="form-control" onChange={handlechangeBuilding} name="building" value={building}>

                                                            <option>Select Building</option>
                                                            <option value="Architecture block">Architecture block</option>
                                                            <option value="Engineering block">Engineering block</option>
                                                            <option value="QS block">QS block</option>
                                                        </select>
                                                    )

                                                    :faculty == "Business" ?
                                                        (
                                                            <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>

                                                                <option>Select Building</option>
                                                                <option value="D-Block">D-Block</option>
                                                            </select>
                                                        )
                                                        :faculty == "Humanity science" ?
                                                            (
                                                                <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>

                                                                    <option>Select Building</option>
                                                                    <option value="Nursing">Nursing Block</option>
                                                                </select>
                                                            )
                                                            :
                                                            (
                                                                <select className="form-control" onChange={handlechangeBuilding} name="building" value={building} disabled>
                                                                    <option>Select Building</option>
                                                                </select>
                                                            )
                                    ) :center =="Metro" ? (
                                                        faculty == "Computing" ?(
                                                                <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                    <option>Select Building</option>
                                                                    <option value="Main building">Main building</option>
                                                                    <option value="A building">A building</option>
                                                                </select>

                                                            )

                                                            : faculty == "Engineering" ?
                                                            (
                                                                <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                    <option>Select Building</option>
                                                                    <option value="Q building">Q building</option>
                                                                    <option value="E building">E building</option>
                                                                </select>
                                                            )

                                                            :faculty == "Business" ?
                                                                (
                                                                    <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                        <option>Select Building</option>
                                                                        <option value="Main building">Main building</option>
                                                                        <option value="X building">X building</option>
                                                                    </select>
                                                                )
                                                                :faculty == "Humanity science" ?
                                                                    (
                                                                        <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                            <option>Select Building</option>
                                                                            <option value="Y building">Y building</option>
                                                                            <option value="W building">W building</option>
                                                                        </select>
                                                                    )
                                                                    :
                                                                    (
                                                                        <select className="form-control" onChange={handlechangeBuilding} name="building" value={building} disabled>
                                                                            <option>Select Building</option>
                                                                        </select>
                                                                    )
                                        ) :center =="Kandy" ?(
                                                            faculty == "Computing" ?(
                                                                    <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                        <option>Select Building</option>
                                                                        <option value="Main building">Main building</option>
                                                                        <option value="C building">C building</option>
                                                                    </select>

                                                                )

                                                                : faculty == "Engineering" ?
                                                                (
                                                                    <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                        <option>Select Building</option>
                                                                        <option value="Q building">Q building</option>
                                                                        <option value="E building">E building</option>
                                                                    </select>
                                                                )

                                                                :faculty == "Business" ?
                                                                    (
                                                                        <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                            <option>Select Building</option>
                                                                            <option value="Main building">Main building</option>
                                                                            <option value="X building">X building</option>
                                                                        </select>
                                                                    )
                                                                    :faculty == "Humanity science" ?
                                                                        (
                                                                            <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                                <option>Select Building</option>
                                                                                <option value="Y building">Y building</option>
                                                                                <option value="W building">W building</option>
                                                                            </select>
                                                                        )
                                                                        :
                                                                        (
                                                                            <select className="form-control" onChange={handlechangeBuilding} name="building" value={building} disabled>
                                                                                <option>Select Building</option>
                                                                            </select>
                                                                        )
                                    ) :center =="Matara" ?(
                                                                faculty == "Computing" ?(
                                                                        <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                            <option>Select Building</option>
                                                                            <option value="Main building">Main building</option>
                                                                            <option value="A building">A building</option>
                                                                        </select>

                                                                    )

                                                                    : faculty == "Engineering" ?
                                                                    (
                                                                        <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                            <option>Select Building</option>
                                                                            <option value="Q building">Q building</option>
                                                                            <option value="E building">E building</option>
                                                                        </select>
                                                                    )

                                                                    :faculty == "Business" ?
                                                                        (
                                                                            <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                                <option>Select Building</option>
                                                                                <option value="Main building">Main building</option>
                                                                                <option value="X building">X building</option>
                                                                            </select>
                                                                        )
                                                                        :faculty == "Humanity science" ?
                                                                            (
                                                                                <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                                    <option>Select Building</option>
                                                                                    <option value="Y building">Y building</option>
                                                                                    <option value="W building">W building</option>
                                                                                </select>
                                                                            )
                                                                            :
                                                                            (
                                                                                <select className="form-control" onChange={handlechangeBuilding} name="building" value={building} disabled>
                                                                                    <option>Select Building</option>
                                                                                </select>
                                                                            )
                                            ) :center =="Kurunegala" ?(
                                                                faculty == "Computing" ?(
                                                                        <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                            <option>Select Building</option>
                                                                            <option value="Main building">Main building</option>
                                                                            <option value="A building">A building</option>
                                                                        </select>

                                                                    )

                                                                    : faculty == "Engineering" ?
                                                                    (
                                                                        <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                            <option>Select Building</option>
                                                                            <option value="Q building">Q building</option>
                                                                            <option value="E building">E building</option>
                                                                        </select>
                                                                    )

                                                                    :faculty == "Business" ?
                                                                        (
                                                                            <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                                <option>Select Building</option>
                                                                                <option value="Main building">Main building</option>
                                                                                <option value="X building">X building</option>
                                                                            </select>
                                                                        )
                                                                        :faculty == "Humanity science" ?
                                                                            (
                                                                                <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                                    <option>Select Building</option>
                                                                                    <option value="Y building">Y building</option>
                                                                                    <option value="W building">W building</option>
                                                                                </select>
                                                                            )
                                                                            :
                                                                            (
                                                                                <select className="form-control" onChange={handlechangeBuilding} name="building" value={building} disabled>
                                                                                    <option>Select Building</option>
                                                                                </select>
                                                                            )
                                                ) :center =="Jaffna" ?(
                                                                       faculty == "Computing" ?(
                                                                                <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                                    <option>Select Building</option>
                                                                                    <option value="Main building">Main building</option>
                                                                                    <option value="A building">A building</option>
                                                                                </select>

                                                                            )

                                                                            : faculty == "Engineering" ?
                                                                            (
                                                                                <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                                    <option>Select Building</option>
                                                                                    <option value="Q building">Q building</option>
                                                                                    <option value="E building">E building</option>
                                                                                </select>
                                                                            )

                                                                            :faculty == "Business" ?
                                                                                (
                                                                                    <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                                        <option>Select Building</option>
                                                                                        <option value="Main building">Main building</option>
                                                                                        <option value="X building">X building</option>
                                                                                    </select>
                                                                                )
                                                                                :faculty == "Humanity science" ?
                                                                                    (
                                                                                        <select className="form-control" onChange={handlechangeBuilding}  name="building" value={building}>
                                                                                            <option>Select Building</option>
                                                                                            <option value="Y building">Y building</option>
                                                                                            <option value="W building">W building</option>
                                                                                        </select>
                                                                                    )
                                                                                    :
                                                                                    (
                                                                                        <select className="form-control" onChange={handlechangeBuilding} name="building" value={building} disabled>
                                                                                            <option>Select Building</option>
                                                                                        </select>
                                                                                    )
                                                        ) :
                                            (
                                                <select className="form-control" onChange={handlechangeBuilding} name="building" value={building} disabled>
                                                    <option>Select Building</option>
                                                </select>
                                            )
                                }
                            </div>

                            <div className="lecturer_inputs">

                                <label htmlFor="level">Level</label>
                                <select className="form-control" onChange={handlechangeLevel} name="level" value={level}>
                                    <option>Select level</option>
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
                                    value={ level + "." + emp_id}
                                    onChange={handlechangeLevel}
                                    required
                                />
                            </div>
                            <div className="lecturer_buttons">
                                <button type="button" className="btn">
                                    Clear
                                </button>
                                <button type="submit" className="btn">
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
