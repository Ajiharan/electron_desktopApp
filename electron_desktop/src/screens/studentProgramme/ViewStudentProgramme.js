import React, { useState, useEffect } from "react";
import "./ViewStudentProgramme.css";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { viewProgramme } from "../../redux/programme/programmeAction";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { db } from "../../firebase";
import Search from "../home/Search";
import { useHistory } from "react-router-dom";
import ProgrammeTable from "./ProgrammeTable";
const ViewStudentProgramme = () => {
  const { loading, error, programme } = useSelector(
    (state) => state.get_programmmes
  );
  let new_programme;
  if (programme?.length > 0) {
    new_programme = programme.map((data) => {
      return { ...data, isChecked: false };
    });
  }

  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [checkData, setCheckData] = useState([]);
  console.log("programme", programme);
  const history = useHistory();
  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "Student Programme > ",
      pathname: "/student/programme/add",
    },
    {
      id: 3,
      name: "view",
      pathname: "/student/programme/view",
    },
  ];

  useEffect(() => {
    dispatch(viewProgramme());
  }, []);

  useEffect(() => {
    setUserData(new_programme);
  }, [programme]);

  const Handlebox = (e, data) => {
    if (e.target.checked) {
      data.isChecked = true;
      let tempData = [
        ...checkData,
        {
          id: e.target.value,
        },
      ];
      setCheckData(tempData);
    } else {
      data.isChecked = false;
      setCheckData(checkData.filter((data) => data.id !== e.target.value));
    }

    console.log("checkData", checkData);
  };

  const DeleteAll = () => {
    db.collection("programmes")
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
      db.collection("programmes").doc(check_data.id).delete();
    });
    setCheckData([]);
  };

  const handleDelete = (data) => {
    db.collection("programmes").doc(data.id).delete();
    setCheckData(checkData.filter((e) => e.id !== data.id));
    console.log("checkData", checkData);
  };

  const searchData = (name) => {
    console.log("Name Chanage", name);
    setUserData(
      programme.map((data) => {
        return { ...data, isChecked: false };
      })
    );
    setCheckData([]);
    if (name) {
      setUserData(new_programme.filter((data) => data.programme.match(name)));
    } else {
      setUserData(new_programme);
    }
  };

  const gotoUpdatePage = (data) => {
    history.push({
      pathname: "/student/programme/update",
      state: data,
    });
  };

  return (
    <div className="ProgrammeViewContainer">
      <div className="ProgrammeViewContainer__nav">
        <ScreenNav rightNavData={navData} />
      </div>
      <div className="container table-responsive-lg ">
        {loading ? (
          <Spinner Loader={DotLoader} size={30} />
        ) : (
          <React.Fragment>
            <div className="ProgrammeViewContainer__top">
              <button
                onClick={(e) =>
                  history.push({
                    pathname: "/student/programme/add",
                  })
                }
                className="btn btn-dark btn_new"
              >
                Add new record
              </button>
              <Search searchData={searchData} />
            </div>
            {programme.length === 0 ? (
              <p className="text-danger lead">data is not available</p>
            ) : userData?.length === 0 ? (
              <p className="text-danger lead">No results found</p>
            ) : null}
            {userData?.length > 0 && (
              <ProgrammeTable
                userData={userData}
                Handlebox={Handlebox}
                handleDelete={handleDelete}
                gotoUpdatePage={gotoUpdatePage}
              />
            )}

            <div className="ProgrammeViewContainer__bottom">
              {checkData.length > 0 && (
                <button onClick={DeleteSelected} className="btn btn-danger">
                  Delete Selected
                </button>
              )}
              {userData?.length > 0 && userData.length === programme.length && (
                <button onClick={DeleteAll} className="btn btn-danger">
                  Delete All
                </button>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default React.memo(ViewStudentProgramme);
