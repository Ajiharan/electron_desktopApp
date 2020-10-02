import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Session.css";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {Spinner} from "../animations/Spinner";
import {DotLoader} from "react-spinners";
import {viewLecturer} from "../../redux/Lecturer/LecturerAction";
import ScreenNav from "../screen-nav/ScreenNav";
import {viewSubject} from "../../redux/Subject/SubjectAction";
import {view_genSubGroupId} from "../../redux/gensubId/genSubIdAction";
import {view_genGroupId} from "../../redux/genId/genIdAction";
import {useHistory} from "react-router-dom";
import {UpdateSessionDetails} from "../../redux/session/sessionAction";

const animatedComponents = makeAnimated();

const UpdateSession = (props) => {
    console.log("props.history", props.location);
    const dispatch = useDispatch();
    const history = useHistory();
    const [clicked, isClicked] = useState(false);
    const [success, setSuccess] = useState("Successfully Updated!");

    const { loading, error } = useSelector((state) => state.update_session);

    const[selectedValueSubject,setselectedValueSubject] = useState("");
    const[subCode,setSubCode] = useState("")
    const [lecturerData, setLecturerData] = useState([]);
    const { lod, erro, lecturer } = useSelector(
        (state) => state.get_lecturers
    );

    const[subjectData,setSubjectData] = useState([]);
    const{load,err,subject} = useSelector(
        (state) => state.get_subjects
    ) ;

    const[subgroupIds,setsubgroupIds] = useState([]);
    const { lo, er, gen_subgroupids } = useSelector(
        (state) => state.get_genSubGroupId
    );

    const[groupids,setgroupIds] = useState([]);
    const { l, e, gen_groupids } = useSelector(
        (state) => state.get_genGroupId
    );

    const[doc_id,setDocId] = useState("");

    useEffect(() => {
        if (!props.location.state) {
            history.replace({
                pathname: "/session/view",
            });
        }
        else {
            setDocId(props.location.state.id);
          setselectedValueLecturer(props.location.state.selectedValueLecturer);
          setSubCode(props.location.state.subCode);
          setselectedValueTag(props.location.state.selectedValueTag);
          setselectedValueSubject(props.location.state.selectedValueSubject);
          setselectedValueGroup(props.location.state.selectedValueGroup);
          noOfstudents = props.location.state.noOfstudents;
          timeDuration = props.location.state.timeDuration;
        }

    }, []);

    useEffect(() => {
        dispatch(viewLecturer());
        dispatch(viewSubject());
        dispatch(view_genSubGroupId());
        dispatch(view_genGroupId());
    }, []);

    useEffect(() => {
        setLecturerData(lecturer);
        setSubjectData(subject);
        setsubgroupIds(gen_subgroupids);
        setgroupIds(gen_groupids);
    }, [lecturer,subject,gen_subgroupids,gen_groupids]);
    //
    // const Clectureroptions = [{ value:'', label: '',isFixed: true }]
    // const Electureroptions = [{ value:'', label: '',isFixed: true }]
    // const Blectureroptions = [{ value:'', label: '',isFixed: true }]
    // const Hlectureroptions = [{ value:'', label: '',isFixed: true }]
    // const Olectureroptions = [{ value:'', label: '',isFixed: true }]
    const lectureroptions = [{ value:'', label: '',isFixed: true }]
    // lecturerData.map((data) => data.faculty == 'Computing' ? Clectureroptions.push({value:data.name,label:data.name,isFixed: true})
    //     : data.faculty == 'Engineering' ? Electureroptions.push({value:data.name,label:data.name,isFixed: true})
    //         :data.faculty == 'Business' ? Blectureroptions.push({value:data.name,label:data.name,isFixed: true})
    //             :data.faculty == 'Humanity science' ? Hlectureroptions.push({value:data.name,label:data.name,isFixed: true})
    //                 :Olectureroptions.push({value:data.name,label:data.name,isFixed: true})
    // );
    //
    lecturerData.map((data) => lectureroptions.push({value:data.name,label: data.name,isFixed: true}));
    //
    // const subjectoptions = [{ value: 'None', label: 'None',isFixed: true }]
    // subjectData.map((data) => subjectoptions.push({value:data,label:data.sub_name,isFixed: true}));
    //
    const tagoptions = [
        { value: 'Lecture', label: 'Lecture',isFixed: true },
        { value: 'Tutorial', label: 'Tutorial',isFixed: true },
        { value: 'Practical', label: 'Practical',isFixed: true }
    ]
    //
    const[selectedValueLecturer,setselectedValueLecturer] = useState([]);
    // const groupedOptions = [
    //     {
    //         label: 'Computing',
    //         options: Clectureroptions,
    //     },
    //     {
    //         label: 'Engineering',
    //         options: Electureroptions,
    //     },
    //     {
    //         label: 'Business',
    //         options: Blectureroptions,
    //     },
    //     {
    //         label: 'Humanity & Science',
    //         options: Hlectureroptions,
    //     },
    //     {
    //         label: 'Other',
    //         options: Olectureroptions,
    //     }
    // ];
    // const groupStyles = {
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    // };
    // const groupBadgeStyles = {
    //     backgroundColor: '#EBECF0',
    //     borderRadius: '2em',
    //     color: '#172B4D',
    //     display: 'inline-block',
    //     fontSize: 12,
    //     fontWeight: 'normal',
    //     lineHeight: '1',
    //     minWidth: 1,
    //     padding: '0.16666666666667em 0.5em',
    //     textAlign: 'center',
    // };
    //
    // const formatGroupLabel = data => (
    //     <div style={groupStyles}>
    //         <span>{data.label}</span>
    //     </div>
    // );
    //
    const handleChangeLecturers = (e) =>{
        setselectedValueLecturer(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    const handleChangeSubject = (e) =>{
        setselectedValueSubject(e.sub_name);
        setSubCode(e.sub_id);
    }

    const[selectedValueTag,setselectedValueTag] = useState([]);
    const handleChangeTag = (e) =>{
        setselectedValueTag(Array.isArray(e) ? e.map(x => x.value) : []);
    }
    const studentgroupIdOptions =  [{ value: 'None', label: 'None',isFixed: true }];
    var noOfstudents = 120;
    var timeDuration = 3;
    //
    selectedValueTag == 'Practical'?
        subgroupIds.map((data) => studentgroupIdOptions.push({value:data,label:data.gen_subgroupid,isFixed: true}))
        :
        groupids.map((data) => studentgroupIdOptions.push({value:data,label:data.gen_groupid,isFixed: true}))
    ;

    const[selectedValueGroup,setselectedValueGroup] = useState([]);
    const handleChangeGroup= (e) =>{
        setselectedValueGroup(e);
    }

    selectedValueTag == 'Practical'?
        noOfstudents = 60 : noOfstudents = 120;

    selectedValueTag == 'Practical' || selectedValueTag == 'Lecture'?
        timeDuration = 2
        : selectedValueTag == 'Tutorial' ?  timeDuration = 1 : timeDuration = 3;

    const handleSubmit = (e) =>{
        e.preventDefault();
        isClicked(true);
        let updateDetails = {
            doc_id,selectedValueLecturer,selectedValueSubject,subCode,selectedValueTag,selectedValueGroup,noOfstudents,timeDuration
        }
        // console.log(data);
        dispatch(UpdateSessionDetails(updateDetails));
        console.log(updateDetails);
    }

    const navData = [
        {
            id: 1,
            name: "TimeTable > ",
            pathname: "/",
        },
        {
            id: 2,
            name: "Session > ",
            pathname: "/session/view",
        },
        {
            id: 3,
            name: "Add Session",
            pathname: "/session/add",
        },
    ];

    return (

        <div className="session">
            <ScreenNav rightNavData={navData} />
            <div className="session__container">
                <div className="session__box">
                    <div className="lead text-success session__message">
                        {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
                        <p className={`lead ${error ? "text-danger" : "text-success"}`}>
                            {!loading && !error && success}
                            {!loading && error && error}
                        </p>
                    </div>
                    <h2 className="text-center text-dark">Add Session</h2>
                    <form id="myForm"
                          onSubmit={handleSubmit}
                          autoComplete="off">

                        <label htmlFor="title">Select subject</label>
                        <input name="subCode" type="text" className="form-control" value={selectedValueSubject} disabled/>

                        <label htmlFor="title">Subject code</label>
                        <input name="subCode" type="text" className="form-control" value={subCode} disabled/>

                        <label htmlFor="title">Select Tag</label>
                        <Select closeMenuOnSelect={false} components={animatedComponents} isMulti  options={tagoptions}
                                onChange={handleChangeTag}
                                name="tag"
                                value={tagoptions.filter(obj => selectedValueTag.includes(obj.value))}
                        />

                        <label htmlFor="title">Select Group Id</label>
                        <Select options={studentgroupIdOptions}
                                onChange={handleChangeGroup}
                                name="group"
                                value={selectedValueGroup}
                        />

                        <label htmlFor="title">Select Lecturers</label>
                        <Select closeMenuOnSelect={false} components={animatedComponents} isMulti options={lectureroptions}
                                // formatGroupLabel={formatGroupLabel}
                                onChange={handleChangeLecturers}
                                name="lecturers"
                                value={lectureroptions.filter(obj => selectedValueLecturer.includes(obj.value))}
                        />

                        <label htmlFor="title">No of Students</label>
                        <input name="subCode" type="text" className="form-control" value={noOfstudents}/>

                        <label htmlFor="title">Time duration</label>
                        <input name="subCode" type="text" className="form-control" value={timeDuration}/>

                        <div className="session_buttons">
                            <button type="button" className="btn">Clear</button>
                            <button type="submit" className="btn">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default React.memo(UpdateSession);
