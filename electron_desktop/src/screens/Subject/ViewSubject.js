import React, { useState, useEffect } from "react";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
import { db } from "../../firebase";
import Search from "../home/Search";
import { useHistory } from "react-router-dom";
import {viewSubject} from "../../redux/Subject/SubjectAction";


const ViewSubject = () => {
    const { loading, error, subject } = useSelector(
        (state) => state.get_subjects
    );
    const dispatch = useDispatch();
    const [subjectData, setSubjectData] = useState([]);
    const [checkData, setCheckData] = useState([]);
    console.log("subjects", subject);
    const history = useHistory();
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
            name: "View",
            pathname: "/subject/view",
        }
    ];

    useEffect(() => {
        dispatch(viewSubject());
    }, []);

    useEffect(() => {
        setSubjectData(subject);
    }, [subject]);

    const Handlebox = (e) => {
        if (e.target.checked) {
            let tempData = [
                ...checkData,
                {
                    id: e.target.value,
                },
            ];
            setCheckData(tempData);
        } else {
            setCheckData(checkData.filter((data) => data.id !== e.target.value));
        }

        console.log("checkData", checkData);
    };

    const DeleteAll = () => {
        db.collection("subjects")
            .get()
            .then((res) => {
                res.forEach((element) => {
                    element.ref.delete();
                });
            });
        setCheckData([]);
    };

    const DeleteSelected = () => {
        checkData.map((check_data) => {
            db.collection("subjects").doc(check_data.id).delete();
        });
        setCheckData([]);
    };

    const handleDelete = (data) => {
        db.collection("subjects").doc(data.id).delete();
        setCheckData(checkData.filter((e) => e.id !== data.id));
        console.log("checkData", checkData);
    };

    const searchData = (name) => {
        setCheckData([]);
        name?
            setSubjectData(
                subject.filter((data) => data.sub_name.includes(name))
            ):setSubjectData(
            subject
            )
    };

    const gotoUpdate = (data) => {
        history.push({
            pathname: "/subject/update",
            state: data,
        });
    };

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
                                        pathname: "/subject/add",
                                    })
                                }
                                className="btn btn-dark btn_new"
                            >
                                Add new record
                            </button>
                            <Search searchData={searchData} />
                        </div>
                        {subjectData.length > 0 && (
                            <table className="table table-dark table-hover LecturerViewContainer__table">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Subject ID</th>
                                    <th>Subject Name</th>
                                    <th>Offered Year</th>
                                    <th>Offred Semester</th>
                                    <th>Lecture Hours</th>
                                    <th>Tutorial Hours</th>
                                    <th>Lab Hours</th>
                                    <th>Evaluation Hours</th>
                                    <th>Action</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {subjectData.map((data) => (
                                    <tr key={data.id}>
                                        <td>
                                            <div className="form-check">
                                                <input
                                                    onChange={(e) => Handlebox(e)}
                                                    type="checkbox"
                                                    value={data.id}
                                                    className="form-check-input"
                                                />
                                            </div>
                                        </td>
                                        <td><span>{data.sub_id}</span></td>
                                        <td><span>{data.sub_name}</span></td>
                                        <td><span>{data.sub_off_year}</span> </td>
                                        <td><span>{data.sub_off_semi}</span> </td>
                                        <td><span>{data.sub_lec_hrs}</span> </td>
                                        <td><span>{data.sub_tut_hrs}</span> </td>
                                        <td><span>{data.sub_lab_hrs}</span> </td>
                                        <td><span>{data.sub_eva_hrs}</span> </td>

                                        <td>
                                            <button onClick={(e) => gotoUpdate(data)}>Edit</button>
                                        </td>

                                        <td>
                                            <button onClick={(e) => handleDelete(data)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}

                        <div className="LecturerViewContainer__bottom">
                            {subjectData.length > 0 && subjectData.length === subject.length && (
                                <button onClick={DeleteAll} className="btn btn-danger">
                                    Delete All
                                </button>
                            )}

                            {checkData.length > 0 && (
                                <button onClick={DeleteSelected} className="btn btn-danger">
                                    Delete Selected
                                </button>
                            )}
                        </div>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default ViewSubject;
