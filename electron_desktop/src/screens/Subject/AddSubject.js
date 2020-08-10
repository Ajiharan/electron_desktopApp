import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Spinner} from "../animations/Spinner";
import {DotLoader} from "react-spinners";
import "./Subject.css"
import ScreenNav from "../screen-nav/ScreenNav";
import { addSubject } from "../../redux/Subject/SubjectAction";

const AddSubject = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [clicked, isClicked] = useState(false);
    const [success, setSuccess] = useState("Successfully Added!");
    const { loading, error, subject } = useSelector(
        (state) => state.SubjectReducer
    );


    const [scode,setCode] = useState('');
    const [sname,setName] = useState('');
    const [off_year,setOffYear] = useState('');
    const [off_semi,setOffSemi] = useState('');
    const [lec_hrs,setLect] = useState('');
    const [tut_hrs,setTutorial] = useState('');
    const [lab_hrs,setLab] = useState('');
    const [eval_hrs,setEvaluation] = useState('');

    const handlechangeSubCode = e => {
        setCode(e.target.value)
    }

    const handlechangeSubName = e => {
        setName(e.target.value)
    }

    const handlechangeOffYear = e => {
        setOffYear(e.target.value)
    }

    const handlechangeOffSemi = e => {
        setOffSemi(e.target.value)
    }

    const handlechangeLectuer = e => {
        setLect(e.target.value+'hrs')
    }

    const handlechangeTutorial = e => {
        setTutorial(e.target.value+'hrs')
    }

    const handlechangeLab = e => {
        setLab(e.target.value+'hrs')
    }

    const handlechangeEvaluation = e => {
        setEvaluation(e.target.value+'hrs')
    }

    const infoSubmit = event =>{
        event.preventDefault();
        isClicked(true);
        dispatch(addSubject(sname,scode,off_year,off_semi,lec_hrs,tut_hrs,lab_hrs,eval_hrs));
        setCode("");
        setName("");
        setOffYear("");
        setOffSemi("");
        setLect("");
        setTutorial("");
        setLab("");
        setEvaluation("");
    }

    const navData = [
        {
            id: 1,
            name: "TimeTable > ",
            pathname: "/",
        },
        {
            id: 2,
            name: "Subject > ",
            pathname: "/subject/view",
        },
        {
            id: 3,
            name: "Add Subject",
            pathname: "/subject/add",
        },
    ];

    return (
        <div className="subject">
        <ScreenNav rightNavData={navData} />
    <div className="subject__container">
        <div className="subject__box">
        <div className="lead text-success subject__message">
        {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
    <p className={`lead ${error ? "text-danger" : "text-light"}`}>
    {!loading && !error && success}
    {!loading && error && error}
</p>
    </div>
    <h2 className="text-center text-dark">Add subject</h2>
    <form id="myForm" onSubmit={infoSubmit} autoComplete="off">
        <div className="subject_inputs">
        <label htmlFor="name">Subject Name</label>
    <input
    placeholder="OOC"
    name="sname"
    type="text"
    className="form-control"
    value={sname}
    onChange={handlechangeSubName}
    required
    />
    </div>

    <div className="subject_inputs">

        <label htmlFor="scode">Subject Code</label>
    <input
    placeholder="IT2030"
    name="scode"
    type="text"
    className="form-control"
    value={scode}
    onChange={handlechangeSubCode}
    required
    />
    </div>

    <div className="subject_inputs">

        <label htmlFor="offered_year">Offered Year</label>
    <select className="form-control" onChange={handlechangeOffYear} name="off_year" value={off_year}>
        <option>Select Year</option>
    <option value="Y1">Y1</option>
        <option value="Y2">Y2</option>
        <option value="Y3">Y3</option>
        <option value="Y4">Y4</option>
        </select>
        </div>
        <div className="subject_inputs">

        <label htmlFor="offered_semi">Offered Semester</label>
    <select className="form-control" onChange={handlechangeOffSemi} name="off_semi" value={off_semi}>
        <option>Select Year</option>
    <option value="S1">S1</option>
        <option value="S2">S2</option>
        </select>
        </div>
        <div className="subject_inputs">

        <label htmlFor="lecture_hrs">Number of lecture hours</label>
    <input
    placeholder="hrs"
    name="lecture_hrs"
    type="text"
    className="form-control"
    value={lec_hrs}
    onChange={handlechangeLectuer}
    required
    />
    </div>
    <div className="subject_inputs">

        <label htmlFor="tutorial_hrs">Number of Tutorial hours</label>
    <input
    placeholder="hrs"
    name="tutorial_hrs"
    type="text"
    className="form-control"
    value={tut_hrs}
    onChange={handlechangeTutorial}
    required
    />
    </div>
    <div className="subject_inputs">

        <label htmlFor="lab_hrs">Number of Practical hours</label>
    <input
    placeholder="hrs"
    name="lab_hrs"
    type="text"
    className="form-control"
    value={lab_hrs}
    onChange={handlechangeLab}
    required
    />
    </div>
    <div className="subject_inputs">

        <label htmlFor="evaluation_hrs">Number of Evaluation hours</label>
    <input
    placeholder="hrs"
    name="evaluation_hrs"
    type="text"
    className="form-control"
    value={eval_hrs}
    onChange={handlechangeEvaluation}
    required
    />
    </div>
    <div className="subject_buttons">
        <button type="button" className="btn">
        Clear
        </button>
        <button type="submit" className="btn" disabled={!scode}>
    Add
    </button>
    </div>
    </form>
    </div>
    </div>
    </div>

)
}

export default AddSubject