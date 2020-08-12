import React, { useState, useEffect } from "react";
import "./ViewStudentGroupId.css";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { viewGroupId } from "../../redux/groupId/GroupIdAction";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { db } from "../../firebase";
import Search from "../home/Search";
import StudentGroupIdTable from "./StudentGroupIdTable";
import { useHistory } from "react-router-dom";
const ViewStudentGroupId = () => {
  const { loading, error, group_id } = useSelector(
    (state) => state.get_groupId
  );
  const new_group_id = group_id.map((data) => {
    return { ...data, isChecked: false };
  });

  //   console.log("new_yearSemo", new_yearSemi);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [checkData, setCheckData] = useState([]);
  //   console.log("year and semi", year_semi);
  const history = useHistory();
  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "Student GroupId > ",
      pathname: "/student/group_id/add",
    },
    {
      id: 3,
      name: "view",
      pathname: "/student/group_id/view",
    },
  ];

  useEffect(() => {
    dispatch(viewGroupId());
  }, []);

  useEffect(() => {
    setUserData(new_group_id);
  }, [group_id]);

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
    db.collection("groupids")
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
      db.collection("groupids").doc(check_data.id).delete();
    });
    setCheckData([]);
  };

  const handleDelete = (data) => {
    db.collection("groupids").doc(data.id).delete();
    setCheckData(checkData.filter((e) => e.id !== data.id));
    console.log("checkData", checkData);
  };

  const searchData = (name) => {
    console.log("Name Chanage", name);
    setUserData(
      group_id.map((data) => {
        return { ...data, isChecked: false };
      })
    );
    setCheckData([]);

    if (name) {
      setUserData(new_group_id.filter((data) => data.group_id.match(name)));
    } else {
      setUserData(new_group_id);
    }
  };

  const gotoUpdatePage = (data) => {
    history.push({
      pathname: "/student/group_id/update",
      state: data,
    });
  };

  return (
    <div className="StudentGroupIdViewContainer">
      <div className="StudentGroupIdViewContainer__nav">
        <ScreenNav rightNavData={navData} />
      </div>
      <div className="container table-responsive-lg ">
        {loading ? (
          <Spinner Loader={DotLoader} size={30} />
        ) : (
          <React.Fragment>
            <div className="StudentGroupIdViewContainer__top">
              <button
                onClick={(e) =>
                  history.push({
                    pathname: "/student/year_semister/add",
                  })
                }
                className="btn btn-dark btn_new"
              >
                Add new record
              </button>
              <Search searchData={searchData} />
            </div>
            {userData.length > 0 && (
              <StudentGroupIdTable
                userData={userData}
                Handlebox={Handlebox}
                handleDelete={handleDelete}
                gotoUpdatePage={gotoUpdatePage}
              />
            )}

            <div className="StudentGroupIdViewContainer__bottom">
              {userData.length > 0 && userData.length === group_id.length && (
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

export default React.memo(ViewStudentGroupId);
