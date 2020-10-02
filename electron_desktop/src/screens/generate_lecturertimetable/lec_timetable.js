import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./lec_timetable.css";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {Spinner} from "../animations/Spinner";
import {DotLoader} from "react-spinners";
import {viewLecturer} from "../../redux/Lecturer/LecturerAction";
import ScreenNav from "../screen-nav/ScreenNav";
import {viewSubject} from "../../redux/Subject/SubjectAction";
import {view_genSubGroupId} from "../../redux/gensubId/genSubIdAction";
import {view_genGroupId} from "../../redux/genId/genIdAction";
import {viewWorkingdays} from "../../redux/Working_days/WorkingdaysAction";
import {viewRoom} from "../../redux/Room/RoomAction";

import {Addlecturertimetable} from "../../redux/generate_lecturertimetable/lecturertimetableAction";

const animatedComponents = makeAnimated();

const Lecturertimetableadd = () => {
    const dispatch = useDispatch();
    const [clicked, isClicked] = useState(false);
    const [success, setSuccess] = useState("Successfully Added!");
    const {loading,error,lecturertimetabledata} = useSelector(
        (state) => state.lecturertimetable_addReducer
    );
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

    const [workingdaysdata, setworkingdaysData] = useState([]);
    const { lod1, erro1, get_workingdays } = useSelector(
        (state) => state.get_workingdays
    );
    const [roomdata, setRoomData] = useState([]);
    const { lod2, erro12, room } = useSelector(
        (state) => state.get_room
    );
    useEffect(() => {
        dispatch(viewLecturer());
        dispatch(viewSubject());
        dispatch(view_genSubGroupId());
        dispatch(view_genGroupId());
        dispatch(viewWorkingdays());
        dispatch(viewRoom());
    }, []);

    useEffect(() => {
        setLecturerData(lecturer);
        setSubjectData(subject);
        setsubgroupIds(gen_subgroupids);
        setgroupIds(gen_groupids);
        setworkingdaysData(get_workingdays);
        setRoomData(room)
    }, [lecturer,subject,gen_subgroupids,gen_groupids,room]);

    const Clectureroptions = [{ value:'', label: '',isFixed: true }]
    const Electureroptions = [{ value:'', label: '',isFixed: true }]
    const Blectureroptions = [{ value:'', label: '',isFixed: true }]
    const Hlectureroptions = [{ value:'', label: '',isFixed: true }]
    const Olectureroptions = [{ value:'', label: '',isFixed: true }]
    const lectureroptions = [{ value:'', label: '',isFixed: true }]
    lecturerData.map((data) => data.faculty == 'Computing' ? Clectureroptions.push({value:data.name,label:data.name,isFixed: true})
        : data.faculty == 'Engineering' ? Electureroptions.push({value:data.name,label:data.name,isFixed: true})
            :data.faculty == 'Business' ? Blectureroptions.push({value:data.name,label:data.name,isFixed: true})
                :data.faculty == 'Humanity science' ? Hlectureroptions.push({value:data.name,label:data.name,isFixed: true})
                    :Olectureroptions.push({value:data.name,label:data.name,isFixed: true})
    );

    lecturerData.map((data) => lectureroptions.push({value:data.name,label: data.name,isFixed: true}));

    const subjectoptions = [{ value: 'None', label: 'None',isFixed: true }]
    subjectData.map((data) => subjectoptions.push({value:data,label:data.sub_name,isFixed: true}));

    const tagoptions = [
        { value: 'Lecture', label: 'Lecture',isFixed: true },
        { value: 'Tutorial', label: 'Tutorial',isFixed: true },
        { value: 'Practical', label: 'Practical',isFixed: true }
    ]
    const workingdaysoptions = [
        { value: 'Monday', label: 'Monday',isFixed: true },
        { value: 'Tuesday', label: 'Tuesday',isFixed: true },
        { value: 'Wednesday', label: 'Wednesday',isFixed: true },
        { value: 'Thursday', label: 'Thursday',isFixed: true },
        { value: 'Friday', label: 'Friday',isFixed: true }
    ]

    const workinghoursoptions = [
        { value: '08.30 AM', label: '08.30 AM',isFixed: true },
        { value: '09.30 AM', label: '09.30 AM',isFixed: true },
        { value: '10.30 AM' , label: '10.30 AM',isFixed: true },
        { value: '11.30 AM', label: '11.30 AM',isFixed: true },
        { value: '01.30 PM', label: '1.30 PM',isFixed: true },
        { value: '02.30 PM', label: '2.30 PM',isFixed: true },
        { value: '03.30 PM', label: '3.30 PM',isFixed: true },
        { value: '04.30 PM', label: '10.30 PM',isFixed: true },
        { value: '05.30 PM', label: '11.30 PM',isFixed: true },
    ]
    const roomoptions = [
        { value: 'B501', label: 'B501',isFixed: true },
        { value: 'B401', label: 'B401',isFixed: true },
        { value: 'N3B', label: 'B401',isFixed: true }
        
    ]

    const[selectedValueLecturer,setselectedValueLecturer] = useState([]);
    const groupedOptions = [
        {
            label: 'Computing',
            options: Clectureroptions,
        },
        {
            label: 'Engineering',
            options: Electureroptions,
        },
        {
            label: 'Business',
            options: Blectureroptions,
        },
        {
            label: 'Humanity & Science',
            options: Hlectureroptions,
        },
        {
            label: 'Other',
            options: Olectureroptions,
        }
    ];
    const groupStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    };
    const groupBadgeStyles = {
        backgroundColor: '#EBECF0',
        borderRadius: '2em',
        color: '#172B4D',
        display: 'inline-block',
        fontSize: 12,
        fontWeight: 'normal',
        lineHeight: '1',
        minWidth: 1,
        padding: '0.16666666666667em 0.5em',
        textAlign: 'center',
    };

    const formatGroupLabel = data => (
        <div style={groupStyles}>
            <span>{data.label}</span>
        </div>
    );

    const handleChangeLecturers = (e) =>{
        setselectedValueLecturer(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    const[selectedValueSubject,setselectedValueSubject] = useState("");
    const[subCode,setSubCode] = useState("");
    const handleChangeSubject = (e) =>{
        setselectedValueSubject(e.value.sub_name);
        setSubCode(e.value.sub_id);
    }

    const[selectedValueTag,setselectedValueTag] = useState([]);
    const handleChangeTag = (e) =>{
        setselectedValueTag(Array.isArray(e) ? e.map(x => x.value) : []);
    }
    const[selectedValueWorkingday,setselectedValueWorkingday] = useState([]);
    const handleChangeWorkingday = (e) =>{
        setselectedValueWorkingday(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    const[selectedValueWorkinghour,setselectedValueWorkinghour] = useState([]);
    const handleChangeWorkinghour = (e) =>{
        setselectedValueWorkinghour(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    const[selectedValueroom,setselectedValueroom] = useState([]);
    const handleChangeroom = (e) =>{
        setselectedValueroom(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    const studentgroupIdOptions =  [{ value: 'None', label: 'None',isFixed: true }];
    var noOfstudents = 120;
    var timeDuration = 3;

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
        let data = {
            selectedValueLecturer,selectedValueSubject,subCode,selectedValueTag,selectedValueGroup,noOfstudents,timeDuration,selectedValueWorkingday,selectedValueWorkinghour,selectedValueroom
        }
        console.log(data);
        dispatch(Addlecturertimetable(data))
    }

    const navData = [
        {
            id: 1,
            name: "TimeTable > ",
            pathname: "/",
        },
        {
            id: 2,
            name: "Generate Time Table > ",
            pathname: "/",
        },
        {
            id: 3,
            name: "Add Lecturer Time Table",
            pathname: "/generate_lecturertimetable/lec_timetable",
        }
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
                    <h2 className="text-center text-dark">Generate Lecturer Time Table</h2>
                    <form id="myForm" onSubmit={handleSubmit} autoComplete="off">

                  

                    <label htmlFor="title">Select Lecturers</label>
                            <Select closeMenuOnSelect={false}   options={groupedOptions}
                                    formatGroupLabel={formatGroupLabel}
                                    onChange={handleChangeLecturers}
                                    name="lecturers"
                                    value={e}
                            />

                            
                                <label htmlFor="title">Select Working Day</label>
                            <Select closeMenuOnSelect={false}   options={workingdaysoptions}
                                    onChange={handleChangeWorkingday}
                                    name="workingdays"
                                    value={e}
                            />
                             <label htmlFor="title">Select Time</label>
                            <Select closeMenuOnSelect={false}   options={workinghoursoptions}
                                    onChange={handleChangeWorkinghour}
                                    name="workinghours"
                                    value={e}
                            />


                            <label htmlFor="title">Select subject</label>
                            <Select options={subjectoptions}
                                    onChange={handleChangeSubject}
                                    name="subject"
                                    value={e}
                            />

                            <label htmlFor="title">Subject code</label>
                        <input
                            name="subCode" type="text" className="form-control" value={subCode} disabled

                        />

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
                               <label htmlFor="title">Select Location</label>
                            <Select closeMenuOnSelect={false}   options={roomoptions}
                                    onChange={handleChangeroom}
                                    name="room"
                                    value={e}
                            />


                         <br></br>

                       
                        <div className="session_buttons">
                            <button type="button" className="btn">Clear</button>
                            <button type="submit" className="btn">Generate</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default Lecturertimetableadd;
