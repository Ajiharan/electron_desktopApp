import React, { useState, useEffect } from "react";
import "../Lecturer/ViewLecturer.css";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
import { db } from "../../firebase";
import Search from "../home/Search";
import { useHistory } from "react-router-dom";
import {viewSessions} from "../../redux/session/sessionAction";

const ViewSession = () => {
    const { loading, error, session } = useSelector(
        (state) => state.get_Session
    );
    const dispatch = useDispatch();
    const [SessionData, setSessionData] = useState([]);
    const [checkData, setCheckData] = useState([]);
    console.log("session", session);
    const history = useHistory();
    const navData = [
        {
            id: 1,
            name: "TimeTable > ",
            pathname: "/",
        },
        {
            id: 2,
            name: "Session > ",
            pathname: "/session/add",
        },
        {
            id: 3,
            name: "View ",
            pathname: "/session/view",
        }
    ];

    useEffect(() => {
        dispatch(viewSessions());
    }, []);

    useEffect(() => {
        setSessionData(session);
    }, [session]);

    // const Handlebox = (e) => {
    //     if (e.target.checked) {
    //         let tempData = [
    //             ...checkData,
    //             {
    //                 id: e.target.value,
    //             },
    //         ];
    //         setCheckData(tempData);
    //     } else {
    //         setCheckData(checkData.filter((data) => data.id !== e.target.value));
    //     }
    //
    //     console.log("checkData", checkData);
    // };
    //
    // const DeleteAll = () => {
    //     db.collection("sessions")
    //         .get()
    //         .then((res) => {
    //             res.forEach((element) => {
    //                 element.ref.delete();
    //             });
    //         });
    //     setCheckData([]);
    // };
    //
    // const DeleteSelected = () => {
    //     checkData.map((check_data) => {
    //         db.collection("sessions").doc(check_data.id).delete();
    //     });
    //     setCheckData([]);
    // };
    //
    // const handleDelete = (data) => {
    //     db.collection("sessions").doc(data.id).delete();
    //     setCheckData(checkData.filter((e) => e.id !== data.id));
    //     console.log("checkData", checkData);
    // };

    // const searchData = (name) => {
    //     setCheckData([]);
    //     name?
    //         setLecturerData(
    //             session.filter((data) => data.subject.includes(name))
    //         ):setLecturerData(
    //         session
    //         )
    // };
    //
    // const gotoUpdate = (data) => {
    //     history.push({
    //         pathname: "/lecturer/update",
    //         state: data,
    //     });
    // };

    return (
        <div className="LecturerViewContainer">
            <div className="LecturerViewContainer__nav">
                <ScreenNav rightNavData={navData} />
            </div>
            <div className="container table-responsive-lg ">
                {loading ? (
                    <Spinner Loader={DotLoader} size={30} />
                ) : (
                    <React.Fragment>
                        <div className="LecturerViewContainer__top">
                            <button
                                onClick={(e) =>
                                    history.push({
                                        pathname: "/lecturer/add",
                                    })
                                }
                                className="btn btn-dark btn_new"
                            >
                                Add new record
                            </button>
                            {/*<Search searchData={searchData} />*/}
                        </div>
                        {SessionData.length > 0 && (
                            <table className="table table-dark table-hover LecturerViewContainer__table">
                                <thead>
                                <tr>
                                    <th>Subject Code</th>
                                    <th>Subject Name</th>
                                    <th>Group ID</th>
                                    <th>Tags</th>
                                    <th>Lecturers</th>
                                    <th>Duration</th>
                                    <th>No Of Students</th>
                                    {/*<th>Rank</th>*/}
                                    {/*<th>Action</th>*/}
                                    {/*<th>Action</th>*/}
                                </tr>
                                </thead>
                                <tbody>
                                {SessionData.map((data) => (
                                    <tr key={data.id}>
                                        {/*<td>*/}
                                        {/*    <div className="form-check">*/}
                                        {/*        <input*/}
                                        {/*            onChange={(e) => Handlebox(e)}*/}
                                        {/*            type="checkbox"*/}
                                        {/*            value={data.id}*/}
                                        {/*            className="form-check-input"*/}
                                        {/*        />*/}
                                        {/*    </div>*/}
                                        {/*</td>*/}
                                        <td><span>{data.subCode}</span></td>
                                        <td><span>{data.selectedValueSubject}</span> </td>
                                        <td><span>{data.selectedValueGroup.label}</span></td>
                                        <td><span>{data.selectedValueTag.map((data) =>(
                                            <span>{data}<br/></span>
                                        ))}</span> </td>
                                        <td>{data.selectedValueLecturer.map((data) =>(
                                            <span>{data}<br/></span>
                                        ))}</td>
                                        <td><span>{data.timeDuration}hr</span> </td>
                                        <td><span>{data.noOfstudents}</span> </td>

                                        {/*<td>*/}
                                        {/*    <button onClick={(e) => gotoUpdate(data)}>Edit</button>*/}
                                        {/*</td>*/}

                                        {/*<td>*/}
                                        {/*    <button onClick={(e) => handleDelete(data)}>Delete</button>*/}
                                        {/*</td>*/}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}

                        {/*<div className="LecturerViewContainer__bottom">*/}
                        {/*    {lecturerData.length > 0 && lecturerData.length === session.length && (*/}
                        {/*        <button onClick={DeleteAll} className="btn btn-danger">*/}
                        {/*            Delete All*/}
                        {/*        </button>*/}
                        {/*    )}*/}

                        {/*    {checkData.length > 0 && (*/}
                        {/*        <button onClick={DeleteSelected} className="btn btn-danger">*/}
                        {/*            Delete Selected*/}
                        {/*        </button>*/}
                        {/*    )}*/}
                        {/*</div>*/}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default ViewSession;
