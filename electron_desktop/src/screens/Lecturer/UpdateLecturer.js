import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import {UpdateLecturerDetails} from "../../redux/Lecturer/LecturerAction";

const UpdateLecturer = (props) => {
    console.log("props.history", props.location);
    const dispatch = useDispatch();
    const history = useHistory();
    const [clicked, isClicked] = useState(false);
    const [success, setSuccess] = useState("Successfully Updated!");

    const { loading, error } = useSelector((state) => state.Update_lecturer);

    const [name,setName] = useState('');
    const [emp_id,setEmpID] = useState('');
    const [faculty,setFaculty] =  useState('');
    const [department,setDepartment] = useState('');
    const [center,setCenter] = useState('');
    const [building,setBuilding] =useState('')
    const [level,setLevel] =useState(0);
    const [rank,setRank] =useState('');

    useEffect(() => {
        if (!props.location.state) {
            history.replace({
                pathname: "/lecturer/view",
            });
        }
        else {
            setName(props.location.state.name);
            setEmpID(props.location.state.emp_id);
            setCenter(props.location.state.center);
            setFaculty(props.location.state.faculty);
            setDepartment(props.location.state.department);
            setBuilding(props.location.state.building);
            setLevel(props.location.state.level);
            setRank(props.location.state.rank);
        }

    }, []);

    const submitHandler =e =>{
        e.preventDefault();
        isClicked(true);
        dispatch(UpdateLecturerDetails(props.location.state?.id,name,emp_id,faculty,center,department,building,level,level+"."+emp_id));
        console.log(name,emp_id,faculty,center,department,building,level,rank);
    }

    const navData = [
        {
            id: 1,
            name: "TimeTable > ",
            pathname: "/",
        },
        {
            id: 2,
            name: "Lecturer > ",
            pathname: "/lecturer/add",
        },
        {
            id: 3,
            name: "view > ",
            pathname: "/lecturer/view",
        },
        {
            id: 4,
            name: "update",
            pathname: "/lecturer/update",
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
                    <h2 className="text-center text-dark">Update Lecturer</h2>
                    <form id="myForm" onSubmit={(e) => submitHandler(e)} autoComplete="off">

                        <div className="lecturer_inputs">
                            <label htmlFor="name">Name</label>
                            <input
                                placeholder="Mr.Dilshan De Silva"
                                name="name"
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                value={emp_id}
                                onChange={(e) => setEmpID(e.target.value)}
                                required
                            />
                        </div>

                        <div className="lecturer_inputs">
                            <label htmlFor="center">Center</label>
                            <select className="form-control" onChange={(e) => setCenter(e.target.value)} name="center" value={center} required>
                                <option value="">None</option>
                                <option value="Malabe">Malabe</option>
                                <option value="Metro">Metro</option>
                                <option value="Kandy">Kandy</option>
                            </select>
                        </div>

                        <div className="lecturer_inputs">
                            <label htmlFor="faculty">Faculty</label>
                            {
                                center == "Malabe" ? (
                                    <select className="form-control" onChange={(e) => setFaculty(e.target.value)} name="faculty" value={faculty} required>
                                        <option value="">None</option>
                                        <option value="Computing">Computing</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Business">Business</option>
                                        <option value="Humanity science">Humanity science</option>
                                    </select>
                                ):center == "Metro" ?(
                                    <select className="form-control" onChange={(e) => setFaculty(e.target.value)} name="faculty" value={faculty} required>
                                        <option value="">None</option>
                                        <option value="Computing">Computing</option>
                                        <option value="Business">Business</option>
                                    </select>
                                ):center == "Kandy" ? (
                                    <select className="form-control" onChange={(e) => setFaculty(e.target.value)} name="faculty" value={faculty} required>
                                        <option value="">None</option>
                                        <option value="Computing">Computing</option>
                                        <option value="Business">Business</option>
                                    </select>
                                ):(
                                    <select className="form-control" onChange={(e) => setFaculty(e.target.value)} name="faculty" value={faculty} disabled>
                                        <option value="">None</option>
                                    </select>
                                )
                            }

                        </div>

                        <div className="lecturer_inputs">

                            <label htmlFor="department">Department</label>
                            {
                                center == "Malabe" ?(
                                    faculty == "Computing" ?(
                                            <select className="form-control" onChange={(e) => setDepartment(e.target.value)}  name="department" value={department} required>
                                                <option value="">None</option>
                                                <option value="Information Technology">Information Technology</option>
                                                <option value="Computer science & software engineering">Computer science & software engineering</option>
                                                <option value="Networking">Networking</option>
                                                <option value="Data Science">Data Science</option>
                                                <option value="Interactive media">Interactive media</option>
                                            </select>


                                        )

                                        : faculty == "Engineering" ?
                                        (
                                            <select className="form-control" onChange={(e) => setDepartment(e.target.value)}  name="department" value={department} required>
                                                <option value="">None</option>
                                                <option value="Architecture">Architecture</option>
                                                <option value="Civil Engineering">Civil Engineering</option>
                                                <option value="Electronic & Telecommunication Engineering">Electronic & Telecommunication Engineering</option>
                                                <option value="Quantity Surverying">Quantity Surverying</option>
                                            </select>
                                        )

                                        :faculty == "Business" ?
                                            (
                                                <select className="form-control" onChange={(e) => setDepartment(e.target.value)}  name="department" value={department} required>
                                                    <option value="">None</option>
                                                    <option value="a">a</option>
                                                    <option value="b">b</option>
                                                    <option value="c">c</option>
                                                    <option value="d">d</option>
                                                </select>
                                            )
                                            :faculty == "Humanity science" ?
                                                (
                                                    <select className="form-control" onChange={(e) => setDepartment(e.target.value)}  name="department" value={department} required>
                                                        <option value="">None</option>
                                                        <option value="Nursing">Nursing</option>
                                                        <option value="y">y</option>
                                                        <option value="z">z</option>
                                                        <option value="w">w</option>
                                                    </select>
                                                )
                                                :
                                                (
                                                    <select className="form-control" onChange={(e) => setDepartment(e.target.value)}  name="department" value={department} disabled>
                                                        <option value="">None</option>
                                                    </select>
                                                )
                                ):center == "Metro" ?(
                                    faculty == "Computing" ?(
                                            <select className="form-control" onChange={(e) => setDepartment(e.target.value)}  name="department" value={department} required>
                                                <option value="">None</option>
                                                <option value="Information Technology">Information Technology</option>
                                                <option value="Computer science & software engineering">Computer science & software engineering</option>
                                                <option value="Networking">Networking</option>
                                                <option value="Interactive media">Interactive media</option>
                                            </select>


                                        )

                                        :faculty == "Business" ?
                                        (
                                            <select className="form-control" onChange={(e) => setDepartment(e.target.value)}  name="department" value={department} required>
                                                <option value="">None</option>
                                                <option value="b">b</option>
                                                <option value="c">c</option>
                                            </select>
                                        ):

                                        (
                                            <select className="form-control" onChange={(e) => setDepartment(e.target.value)}  name="department" value={department} disabled>
                                                <option value="">None</option>
                                            </select>
                                        )
                                ):center == "Kandy" ?(
                                    faculty == "Computing" ?(
                                            <select className="form-control" onChange={(e) => setDepartment(e.target.value)}  name="department" value={department} required>
                                                <option value="">None</option>
                                                <option value="Information Technology">Information Technology</option>
                                                <option value="Computer science & software engineering">Computer science & software engineering</option>
                                                <option value="Networking">Networking</option>
                                                <option value="Data Science">Data Science</option>
                                            </select>


                                        )

                                        :faculty == "Business" ?
                                        (
                                            <select className="form-control" onChange={(e) => setDepartment(e.target.value)}  name="department" value={department} required>

                                                <option value="">None</option>
                                                <option value="a">a</option>
                                                <option value="b">b</option>
                                                <option value="c">c</option>
                                            </select>
                                        ):

                                        (
                                            <select className="form-control" onChange={(e) => setDepartment(e.target.value)}  name="department" value={department} disabled>
                                                <option value="">None</option>
                                            </select>
                                        )
                                ):(
                                    <select className="form-control" onChange={(e) => setDepartment(e.target.value)}  name="department" value={department} disabled>
                                        <option value="">None</option>
                                    </select>
                                )

                            }
                        </div>

                        <div className="lecturer_inputs">

                            <label htmlFor="building">Building</label>
                            {
                                center == "Malabe" ?(

                                    faculty == "Computing" ?(
                                            <select className="form-control" onChange={(e) => setBuilding(e.target.value)}  name="building" value={building} required>
                                                <option value="">None</option>
                                                <option value="Main building">Main building</option>
                                                <option value="New building">New building</option>
                                            </select>


                                        )

                                        :faculty == "Engineering" ?
                                        (
                                            <select className="form-control" onChange={(e) => setBuilding(e.target.value)}  name="building" value={building} required>

                                                <option value="">None</option>
                                                <option value="Architecture block">Architecture block</option>
                                                <option value="Engineering block">Engineering block</option>
                                                <option value="QS block">QS block</option>
                                            </select>
                                        )

                                        :faculty == "Business" ?
                                            (
                                                <select className="form-control" onChange={(e) => setBuilding(e.target.value)}  name="building" value={building} required>

                                                    <option value="">None</option>
                                                    <option value="D-Block">D-Block</option>
                                                </select>
                                            )
                                            :faculty == "Humanity science" ?
                                                (
                                                    <select className="form-control" onChange={(e) => setBuilding(e.target.value)}  name="building" value={building} required>

                                                        <option value="">None</option>
                                                        <option value="Nursing">Nursing Block</option>
                                                    </select>
                                                )
                                                :
                                                (
                                                    <select className="form-control" onChange={(e) => setBuilding(e.target.value)}  name="building" value={building} disabled>
                                                        <option value="">None</option>
                                                    </select>
                                                )
                                ) :center =="Metro" ? (
                                    faculty == "Computing" ?(
                                            <select className="form-control" onChange={(e) => setBuilding(e.target.value)}  name="building" value={building} required>
                                                <option value="">None</option>
                                                <option value="Main building">Main building</option>
                                                <option value="A building">A building</option>
                                            </select>

                                        )


                                        :faculty == "Business" ?
                                        (
                                            <select className="form-control" onChange={(e) => setBuilding(e.target.value)}  name="building" value={building} required>
                                                <option value="">None</option>
                                                <option value="Main building">Main building</option>
                                                <option value="X building">X building</option>
                                            </select>
                                        )
                                        :
                                        (
                                            <select className="form-control" onChange={(e) => setBuilding(e.target.value)}  name="building" value={building} disabled>
                                                <option value="">None</option>
                                            </select>
                                        )
                                ) :center =="Kandy" ?(
                                    faculty == "Computing" ?(
                                            <select className="form-control" onChange={(e) => setBuilding(e.target.value)}  name="building" value={building} required>
                                                <option value="">None</option>
                                                <option value="Main building">Main building</option>
                                                <option value="C building">C building</option>
                                            </select>

                                        )

                                        :faculty == "Business" ?
                                        (
                                            <select className="form-control" onChange={(e) => setBuilding(e.target.value)}  name="building" value={building} required>
                                                <option value="">None</option>
                                                <option value="Main building">Main building</option>
                                                <option value="X building">X building</option>
                                            </select>
                                        )

                                        :
                                        (
                                            <select className="form-control" onChange={(e) => setBuilding(e.target.value)}  name="building" value={building} disabled>
                                                <option value="">None</option>
                                            </select>
                                        )
                                ) :(
                                    <select className="form-control" onChange={(e) => setBuilding(e.target.value)}  name="building" value={building} disabled>
                                        <option value="">None</option>
                                    </select>
                                )
                            }
                        </div>

                        <div className="lecturer_inputs">

                            <label htmlFor="level">Level</label>
                            <select className="form-control" onChange={(e) => setLevel(e.target.value)}  name="building" value={level} required>
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
                                value={level + "." +emp_id}
                                onChange={(e) => setRank(e.target.value)}
                                required
                            />
                        </div>

                        <div className="lecturer_buttons">
                            <button type="button" className="btn">
                                Clear
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={(e) => {
                                    history.push({ pathname: "/lecturer/view" });
                                }}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn" disabled={!emp_id}>
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default React.memo(UpdateLecturer);
