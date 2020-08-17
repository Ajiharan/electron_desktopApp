import React, { useState, useEffect } from "react";
import "./ViewRoom.css";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../animations/Spinner";
import { DotLoader, MoonLoader } from "react-spinners";
import { db } from "../../firebase";
import Search from "../home/Search";
import { useHistory } from "react-router-dom";
import {viewRoom} from "../../redux/Room/RoomAction";

const ViewRoom = () => {
  const { loading, error, room } = useSelector(
      (state) => state.get_room
  );
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
      name: "Room > ",
      pathname: "/room/room/view",
    },
    {
      id: 3,
      name: "View ",
      pathname: "/room/room/view",
    }
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

  const DeleteAll = () => {
    db.collection("rooms")
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
      db.collection("rooms").doc(check_data.id).delete();
    });
    setCheckData([]);
  };

  const handleDelete = (data) => {
    db.collection("rooms").doc(data.id).delete();
    setCheckData(checkData.filter((e) => e.id !== data.id));
    console.log("checkData", checkData);
  };

  const searchData = (name) => {
    setCheckData([]);
    name?
        setRoomData(
            room.filter((data) => data.name.includes(name))
        ):setRoomData(
        room
        )
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
        <div className="container table-responsive-lg ">
          {loading ? (
              <Spinner Loader={DotLoader} size={30} />
          ) : (
              <React.Fragment>
                <div className="RoomViewContainer__top">
                  <button
                      onClick={(e) =>
                          history.push({
                            pathname: "/room/room/add",
                          })
                      }
                      className="btn btn-dark btn_new"
                  >
                    Add new record
                  </button>
                  <Search searchData={searchData} />
                </div>
                {roomData.length > 0 && (
                    <table className="table table-dark table-hover RoomViewContainer__table">
                      <thead>
                      <tr>
                        <th></th>
                        <th>Room Name</th>
                        <th>Capacity</th>
                        <th>Building</th>
                        <th>Type</th>
                        <th>Action</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                      {roomData.map((data) => (
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
                            <td><span>{data.name}</span></td>
                            <td><span>{data.capacity}</span></td>
                            <td><span>{data.building}</span> </td>
                            <td><span>{data.type}</span> </td>

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

                <div className="RoomViewContainer__bottom">
                  {roomData.length > 0 && roomData.length === room.length && (
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

export default ViewRoom;
