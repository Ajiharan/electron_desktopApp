import React, { useState, useEffect } from "react";
import "./StudentViewSubGroupId.css";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { viewSubGroupId } from "../../redux/subgroupId/SubGroupIdAction";
import { view_genGroupId } from "../../redux/genId/genIdAction";
import { view_genSubGroupId } from "../../redux/gensubId/genSubIdAction";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { db } from "../../firebase";
import Search from "../home/Search";
import SubGroupIdTable from "./StudentSubgroupIdTable";
import { useHistory } from "react-router-dom";
const StudentViewSubGroupId = () => {
  const { loading, error, sub_groupids } = useSelector(
    (state) => state.get_SubGroupId
  );
  const { gen_groupids } = useSelector((state) => state.get_genGroupId);
  const { gen_subgroupids } = useSelector((state) => state.get_genSubGroupId);
  const new_sub_groupids = sub_groupids.map((data) => {
    return { ...data, isChecked: false };
  });

  //   console.log("new_yearSemo", new_yearSemi);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [checkData, setCheckData] = useState([]);
  const [tempCheckData, setTempCheckData] = useState([]);
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
      name: "Student SubGroup Number > ",
      pathname: "/student/subgroup_id/add",
    },
    {
      id: 3,
      name: "view",
      pathname: "/student/subgroup_id/view",
    },
  ];

  useEffect(() => {
    dispatch(viewSubGroupId());
    dispatch(view_genGroupId());
    dispatch(view_genSubGroupId());
  }, []);

  useEffect(() => {
    setUserData(new_sub_groupids);
  }, [sub_groupids]);

  const Handlebox = (e, data) => {
    if (e.target.checked) {
      data.isChecked = true;
      let tempData = [
        ...checkData,
        {
          id: e.target.value,
        },
      ];
      setTempCheckData([...tempCheckData, { ...data, id: e.target.value }]);
      setCheckData(tempData);
    } else {
      data.isChecked = false;
      setCheckData(checkData.filter((data) => data.id !== e.target.value));
      setTempCheckData(
        tempCheckData.filter((data) => data.id !== e.target.value)
      );
    }

    console.log("checkData", checkData);
  };

  const DeleteAll = () => {
    const tempSubGroupData = sub_groupids.map((data) => {
      const temp = gen_subgroupids.filter(
        (filterData) =>
          filterData.gen_subgroupid.split(".")[4] === data.sub_groupid
      );
      return {
        temp: temp,
      };
    });

    tempSubGroupData.map(({ temp }) => {
      temp.map(({ id, gen_subgroupid }) => {
        db.collection("gen_subgroupids").doc(id).delete();
      });
    });
    console.log("tempSubGroupData", tempSubGroupData);

    db.collection("sub_groupids")
      .get()
      .then((res) => {
        res.forEach((element) => {
          element.ref.delete();
        });
      });
    setCheckData([]);
    setTempCheckData([]);
  };

  const DeleteSelected = () => {
    const tempSubGroupData = tempCheckData.map((data) => {
      const temp = gen_subgroupids.filter(
        (filterData) =>
          filterData.gen_subgroupid.split(".")[4] === data.sub_groupid
      );
      return {
        temp: temp,
      };
    });

    tempSubGroupData.map(({ temp }) => {
      temp.map(({ id, gen_subgroupid }) => {
        db.collection("gen_subgroupids").doc(id).delete();
      });
    });

    checkData.map((check_data) => {
      db.collection("sub_groupids").doc(check_data.id).delete();
    });
    setCheckData([]);
    setTempCheckData([]);
  };

  const handleDelete = (data) => {
    const tempSub = gen_subgroupids.filter(
      (filterData) =>
        filterData.gen_subgroupid.split(".")[4] === data.sub_groupid
    );

    tempSub.map(({ id, gen_subgroupid }) => {
      db.collection("gen_subgroupids").doc(id).delete();
    });
    db.collection("sub_groupids").doc(data.id).delete();
    setCheckData(checkData.filter((e) => e.id !== data.id));
    console.log("checkData", checkData);
  };

  const searchData = (name) => {
    console.log("Name Chanage", name);
    setUserData(
      sub_groupids.map((data) => {
        return { ...data, isChecked: false };
      })
    );
    setCheckData([]);
    setTempCheckData([]);

    if (name) {
      setUserData(
        new_sub_groupids.filter((data) => data.sub_groupid.match(name))
      );
    } else {
      setUserData(new_sub_groupids);
    }
  };

  const gotoUpdatePage = (data) => {
    history.push({
      pathname: "/student/subgroup_id/update",
      state: data,
    });
  };

  return (
    <div className="StudentViewSubGroupIdContainer">
      <div className="StudentViewSubGroupIdContainer__nav">
        <ScreenNav rightNavData={navData} />
      </div>
      <div className="container table-responsive-lg ">
        {loading ? (
          <Spinner Loader={DotLoader} size={30} />
        ) : (
          <React.Fragment>
            <div className="StudentViewSubGroupIdContainer__top">
              <button
                onClick={(e) =>
                  history.push({
                    pathname: "/student/subgroup_id/add",
                  })
                }
                className="btn btn-dark btn_new"
              >
                Add new record
              </button>
              <Search searchData={searchData} />
            </div>
            {sub_groupids.length === 0 ? (
              <p className="text-danger lead">data is not available</p>
            ) : userData?.length === 0 ? (
              <p className="text-danger lead">No results found</p>
            ) : null}
            {userData.length > 0 && (
              <SubGroupIdTable
                userData={userData}
                Handlebox={Handlebox}
                handleDelete={handleDelete}
                gotoUpdatePage={gotoUpdatePage}
              />
            )}

            <div className="StudentViewSubGroupIdContainer__bottom">
              {checkData.length > 0 && (
                <button onClick={DeleteSelected} className="btn btn-danger">
                  Delete Selected
                </button>
              )}
              {userData.length > 0 && userData.length === sub_groupids.length && (
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

export default React.memo(StudentViewSubGroupId);
