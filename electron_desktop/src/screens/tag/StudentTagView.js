import React, { useState, useEffect } from "react";
import "./StudentView.css";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { viewTag } from "../../redux/tag/TagAction";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { db } from "../../firebase";
import Search from "../home/Search";
import StudentTagTable from "./StudentTagTable";
import { useHistory } from "react-router-dom";
const StudentView = () => {
  const { loading, error, tags } = useSelector((state) => state.get_tag);
  const new_tags = tags.map((data) => {
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
      name: "Student > ",
      pathname: "/student/tag/add",
    },
    {
      id: 3,
      name: "view",
      pathname: "/student/tag/view",
    },
  ];

  useEffect(() => {
    dispatch(viewTag());
  }, []);

  useEffect(() => {
    setUserData(new_tags);
  }, [tags]);

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
    db.collection("tags")
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
      db.collection("tags").doc(check_data.id).delete();
    });
    setCheckData([]);
  };

  const handleDelete = (data) => {
    db.collection("tags").doc(data.id).delete();
    setCheckData(checkData.filter((e) => e.id !== data.id));
    console.log("checkData", checkData);
  };

  const searchData = (name) => {
    console.log("Name Chanage", name);
    setUserData(
      tags.map((data) => {
        return { ...data, isChecked: false };
      })
    );
    setCheckData([]);

    if (name) {
      setUserData(new_tags.filter((data) => data.tag.match(name)));
    } else {
      setUserData(new_tags);
    }
  };

  const gotoUpdatePage = (data) => {
    history.push({
      pathname: "/student/tag/update",
      state: data,
    });
  };

  return (
    <div className="TagViewContainer">
      <div className="TagViewContainer__nav">
        <ScreenNav rightNavData={navData} />
      </div>
      <div className="container table-responsive-lg ">
        {loading ? (
          <Spinner Loader={DotLoader} size={30} />
        ) : (
          <React.Fragment>
            <div className="TagViewContainer__top">
              <button
                onClick={(e) =>
                  history.push({
                    pathname: "/student/tag/add",
                  })
                }
                className="btn btn-dark btn_new"
              >
                Add new record
              </button>
              <Search searchData={searchData} />
            </div>
            {userData.length > 0 && (
              <StudentTagTable
                userData={userData}
                Handlebox={Handlebox}
                handleDelete={handleDelete}
                gotoUpdatePage={gotoUpdatePage}
              />
            )}

            <div className="TagViewContainer__bottom">
              {checkData.length > 0 && (
                <button onClick={DeleteSelected} className="btn btn-danger">
                  Delete Selected
                </button>
              )}
              {userData.length > 0 && userData.length === tags.length && (
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

export default StudentView;
