import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import {UpdateSubjectDetails} from "../../redux/Subject/SubjectAction";

const UpdateSubject = (props) => {
    console.log("props.history", props.location);
    const dispatch = useDispatch();
    const history = useHistory();
    const [clicked, isClicked] = useState(false);
    const [success, setSuccess] = useState("Successfully Updated!");

    const { loading, error } = useSelector((state) => state.Update_Subject);

    const [scode,setCode] = useState('');
    const [sname,setName] = useState('');
    const [off_year,setOffYear] = useState('');
    const [off_semi,setOffSemi] = useState('');
    const [lec_hrs,setLect] = useState('');
    const [tut_hrs,setTutorial] = useState('');
    const [lab_hrs,setLab] = useState('');
    const [eval_hrs,setEvaluation] = useState('');

    useEffect(() => {
        if (!props.location.state) {
            history.replace({
                pathname: "/subject/view",
            });
        }
        else {
            setName(props.location.state.sub_name);
            setCode(props.location.state.sub_id);
            setOffYear(props.location.state.sub_off_year);
            setOffSemi(props.location.state.sub_off_semi);
            setLect(props.location.state.sub_lec_hrs);
            setTutorial(props.location.state.sub_tut_hrs);
            setLab(props.location.state.sub_lab_hrs);
            setEvaluation(props.location.state.sub_eva_hrs);
        }

    }, []);

    const submitHandler =e =>{
        e.preventDefault();
        isClicked(true);
        dispatch(UpdateSubjectDetails(props.location.state?.id,sname,scode,off_year,off_semi,lec_hrs,tut_hrs,lab_hrs,eval_hrs));
        console.log(sname,scode,off_year,off_semi,lec_hrs,tut_hrs,lab_hrs,eval_hrs);
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
            pathname: "/subject/add",
        },
        {
            id: 3,
            name: "view > ",
            pathname: "/subject/view",
        },
        {
            id: 4,
            name: "update",
            pathname: "/subject/update",
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
                    <h2 className="text-center text-dark">Update Subject</h2>
                    <form id="myForm" onSubmit={(e) => submitHandler(e)} autoComplete="off">
                        <div className="subject_inputs">
                            <label htmlFor="name">Subject Name</label>
                            <input
                                placeholder="OOC"
                                name="sname"
                                type="text"
                                className="form-control"
                                value={sname}
                                onChange={(e) => setName(e.target.value)}
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
                                pattern="[A-Z]{2}[0-9]{4}"
                                title="Should be the format(IT2030)!"
                                value={scode}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="subject_inputs">

                            <label htmlFor="offered_year">Offered Year</label>
                            <select className="form-control" onChange={(e) => setOffYear(e.target.value)} name="off_year" value={off_year}>
                                <option>Select Year</option>
                                <option value="Y1">Y1</option>
                                <option value="Y2">Y2</option>
                                <option value="Y3">Y3</option>
                                <option value="Y4">Y4</option>
                            </select>
                        </div>
                        <div className="subject_inputs">

                            <label htmlFor="offered_semi">Offered Semester</label>
                            <select className="form-control" onChange={(e) => setOffSemi(e.target.value)}name="off_semi" value={off_semi}>
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
                                onChange={(e) => setLect(e.target.value)}
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
                                onChange={(e) => setTutorial(e.target.value)}
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
                                onChange={(e) => setLab(e.target.value)}
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
                                onChange={(e) => setEvaluation(e.target.value)}
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
                                    history.push({ pathname: "/subject/view" });
                                }}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn" disabled={!scode}>
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default React.memo(UpdateSubject);
