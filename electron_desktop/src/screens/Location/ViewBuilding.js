import React, { useState, useEffect } from "react";
import "./ViewBuilding.css";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { viewBuilding } from "../../redux/Building/BuildingAction";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { db } from "../../firebase";
import Search from "../home/Search";
import BuildingTable from "./BuildingTable";
import { useHistory } from "react-router-dom";
const ViewBuilding = () => {
  const { loading, error, building } = useSelector(
    (state) => state.get_building
  );
  let new_building ;
  if( building?.length > 0 ){
      new_building = building.map((data) => {
    return { ...data, isChecked: false };
  })};

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
      name: "Building > ",
      pathname: "/location/building/add",
    },
    {
      id: 3,
      name: "view",
      pathname: "/location/building/view",
    },
  ];

  useEffect(() => {
    dispatch(viewBuilding());
  }, []);

  useEffect(() => {
    setUserData(new_building);
  }, [building]);

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
    db.collection("buildings")
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
      db.collection("buildings").doc(check_data.id).delete();
    });
    setCheckData([]);
  };

  const handleDelete = (data) => {
    db.collection("buildings").doc(data.id).delete();
    setCheckData(checkData.filter((e) => e.id !== data.id));
    console.log("checkData", checkData);
  };

  const searchData = (name) => {
    console.log("Name Chanage", name);
    setUserData(
      building.map((data) => {
        return { ...data, isChecked: false };
      })
    );
    setCheckData([]);

    if (name) {
      setUserData(new_building.filter((data) => data.building.match(name)));
    } else {
      setUserData(new_building);
    }
  };

  const gotoUpdatePage = (data) => {
    history.push({
      pathname: "/location/building/update",
      state: data,
    });
  };

  return (
    <div className="BuildingViewContainer">
      <div className="BuildingViewContainer__nav">
        <ScreenNav rightNavData={navData} />
      </div>
      <div className="container table-responsive-lg ">
        {loading ? (
          <Spinner Loader={DotLoader} size={30} />
        ) : (
          <React.Fragment>
            <div className="BuildingViewContainer__top">
              <button
                onClick={(e) =>
                  history.push({
                    pathname: "/location/building/add",
                  })
                }
                className="btn btn-dark btn_new"
              >
                Add new record
              </button>
              <Search searchData={searchData} />
            </div>
            {userData?.length > 0 && (
              <BuildingTable
                userData={userData}
                Handlebox={Handlebox}
                handleDelete={handleDelete}
                gotoUpdatePage={gotoUpdatePage}
              />
            )}

            <div className="BuildingViewContainer__bottom">
              {userData?.length > 0 && userData?.length === building?.length && (
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

export default React.memo(ViewBuilding);
