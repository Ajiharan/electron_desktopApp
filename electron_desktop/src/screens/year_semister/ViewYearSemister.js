import React, { useState, useEffect } from "react";
import "./ViewYearSemister.css";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { viewSemister } from "../../redux/Year_semi/YearAction";
import { view_genGroupId } from "../../redux/genId/genIdAction";
import { view_genSubGroupId } from "../../redux/gensubId/genSubIdAction";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { db } from "../../firebase";
import Search from "../home/Search";
import YearSemisterTable from "./YearSemisterTable";
import { useHistory } from "react-router-dom";
const ViewYearSemister = () => {
  const { loading, error, year_semi } = useSelector(
    (state) => state.get_year_semister
  );
  const { gen_groupids } = useSelector((state) => state.get_genGroupId);
  const { gen_subgroupids } = useSelector((state) => state.get_genSubGroupId);
  const new_yearSemi = year_semi.map((data) => {
    return { ...data, isChecked: false };
  });

  console.log("new_yearSemo", new_yearSemi);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [checkData, setCheckData] = useState([]);
  const [tempCheckData, setTempCheckData] = useState([]);
  console.log("tempCheckData", tempCheckData);
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
      pathname: "/student/year_semister/add",
    },
    {
      id: 3,
      name: "view",
      pathname: "/student/year_semister/view",
    },
  ];

  useEffect(() => {
    dispatch(viewSemister());
    dispatch(view_genGroupId());
    dispatch(view_genSubGroupId());
  }, []);

  useEffect(() => {
    setUserData(new_yearSemi);
  }, [year_semi]);

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
    db.collection("students")
      .get()
      .then((res) => {
        res.forEach((element) => {
          element.ref.delete();
        });
      });
    db.collection("gen_groupids")
      .get()
      .then((res) => {
        res.forEach((element) => {
          element.ref.delete();
        });
      });
    db.collection("gen_subgroupids")
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
    const tempGroupData = tempCheckData.map((data) => {
      const temp = gen_groupids.filter(
        (filterData) =>
          filterData.gen_groupid.split(".")[0] +
            "." +
            filterData.gen_groupid.split(".")[1] ===
          data.year_semister
      );
      return {
        temp: temp,
      };
    });
    tempGroupData.map(({ temp }) => {
      temp.map(({ id, gen_groupid }) => {
        db.collection("gen_groupids").doc(id).delete();
      });
    });
    console.log("tempGroupData", tempGroupData);

    const tempSubGroupData = tempCheckData.map((data) => {
      const temp = gen_subgroupids.filter(
        (filterData) =>
          filterData.gen_subgroupid.split(".")[0] +
            "." +
            filterData.gen_subgroupid.split(".")[1] ===
          data.year_semister
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
      db.collection("students").doc(check_data.id).delete();
    });

    setCheckData([]);
    setTempCheckData([]);
  };

  const handleDelete = async (data) => {
    console.log("Delete Data", data.year_semister);
    db.collection("students").doc(data.id).delete();
    setCheckData(checkData.filter((e) => e.id !== data.id));
    const groupTempData = await gen_groupids.filter(
      (res) =>
        res.gen_groupid.split(".")[0] + "." + res.gen_groupid.split(".")[1] ===
        data.year_semister
    );
    const subgroupTempData = await gen_subgroupids.filter(
      (res) =>
        res.gen_subgroupid.split(".")[0] +
          "." +
          res.gen_subgroupid.split(".")[1] ===
        data.year_semister
    );
    // console.log("groupTempData", groupTempData);
    await groupTempData.map((res) => {
      db.collection("gen_groupids").doc(res.id).delete();
    });

    await subgroupTempData.map((res) => {
      db.collection("gen_subgroupids").doc(res.id).delete();
    });
    console.log("checkData", checkData);
  };

  const searchData = (name) => {
    console.log("Name Chanage", name);
    setUserData(
      year_semi.map((data) => {
        return { ...data, isChecked: false };
      })
    );
    setCheckData([]);
    setTempCheckData([]);
    if (name) {
      setUserData(
        new_yearSemi.filter((data) => data.year_semister.match(name))
      );
    } else {
      setUserData(new_yearSemi);
    }
  };

  const gotoUpdatePage = (data) => {
    history.push({
      pathname: "/student/year_semister/update",
      state: data,
    });
  };

  return (
    <div className="YearViewContainer">
      <div className="YearViewContainer__nav">
        <ScreenNav rightNavData={navData} />
      </div>
      <div className="container table-responsive-lg ">
        {loading ? (
          <Spinner Loader={DotLoader} size={30} />
        ) : (
          <React.Fragment>
            <div className="YearViewContainer__top">
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
            {year_semi.length === 0 ? (
              <p className="text-danger lead">data is not available</p>
            ) : userData?.length === 0 ? (
              <p className="text-danger lead">No results found</p>
            ) : null}
            {userData.length > 0 && (
              <YearSemisterTable
                userData={userData}
                Handlebox={Handlebox}
                handleDelete={handleDelete}
                gotoUpdatePage={gotoUpdatePage}
              />
            )}

            <div className="YearViewContainer__bottom">
              {checkData.length > 0 && (
                <button onClick={DeleteSelected} className="btn btn-danger">
                  Delete Selected
                </button>
              )}
              {userData.length > 0 && userData.length === year_semi.length && (
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

export default React.memo(ViewYearSemister);
