import React, { useState, useEffect } from "react";
import "./location_table.css";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
import { db } from "../../firebase";
import Search from "../home/Search";
import { useHistory } from "react-router-dom";
import { viewRoom } from "../../redux/Room/RoomAction";

const ViewRoom = () => {
  const { loading, error, room } = useSelector((state) => state.get_room);
  const dispatch = useDispatch();
  const [roomData, setRoomData] = useState([]);
  const [checkData, setCheckData] = useState([]);
  console.log("rooms", room);
  const history = useHistory();
  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "Generate TimeTable > ",
      pathname: "/generate_timetables/main",
    },
    {
      id: 3,
      name: "Location Details ",
      pathname: "/generate_timetables/location_table",
    },
  ];

  useEffect(() => {
    dispatch(viewRoom());
  }, []);

  useEffect(() => {
    setRoomData(room);
  }, [room]);

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

 
  const searchData = (name) => {
    setCheckData([]);
    if (name) {
      setRoomData(room.filter((data) => data.room.name.match(name)));
    } else {
      setRoomData(room);
    }
  };

  const gotoUpdate = (data) => {
    history.push({
      pathname: "/room/room/update",
      state: data,
    });
  };

  return (
    <div className="RoomViewContainer">
      <div className="RoomViewContainer__nav">
        <ScreenNav rightNavData={navData} />
      </div>
      <h2 className="text-center"> Location Details</h2>
      <div className="container table-responsive-lg ">
        {loading ? (
          <Spinner Loader={DotLoader} size={30} />
        ) : (
          <React.Fragment>
            <div className="RoomViewContainer__top">
             
              <Search searchData={searchData} />
            </div>
            <br></br>
            {roomData.length > 0 && (
              <table className="table table-dark table-hover RoomViewContainer__table">
                <thead>
                  <tr>
                    <th>Building</th>
                    <th>Room Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {roomData.map((data) => (
                    <tr key={data.id}>
                         <td>
                        <span>{data.room.building}</span>{" "}
                      </td>
                      
                      <td>
                        <span>{data.room.name}</span>
                      </td>
                      
                     
                     

                      <td>
                        <button >View</button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ViewRoom;
