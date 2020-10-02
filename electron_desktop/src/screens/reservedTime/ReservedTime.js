import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRedervedTime } from "../../redux/reservedTime/ReservedTimeAction";
import { viewRoom } from "../../redux/Room/RoomAction";
import "./ReservedTime.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import Select from "react-select";

const ReservedTime = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [room_data, setRooms] = useState("");
  const [selectRoom, setSelectRoom] = useState([]);
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const { loading, error } = useSelector((state) => state.addReservedTime);
  const { room } = useSelector((state) => state.get_room);
  const [time, setTime] = useState("");
  useEffect(() => {
    dispatch(viewRoom());
  }, []);

  useEffect(() => {
    setRooms(room);
  }, [room]);

  const room_options = room.map((data) => {
    console.log(data);
    return {
      value: data.room.name,
      label: data.room.name,
    };
  });

  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "ReservedTime",
      pathname: "/reservedTime/add",
    },
  ];

  const handleRoomChange = (optionValue) => {
    setSelectRoom(optionValue);
    // console.log(optionValue);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addRedervedTime({
        selectRoom,
        time,
      })
    );
  };
  return (
    <div className="ReservedTime">
      <ScreenNav rightNavData={navData} />
      <div className="ReservedTime__container">
        <div className="ReservedTime__box">
          <div className="lead text-success ReservedTime__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Add SuitableRoom</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="ReservedTime_inputs">
              <label htmlFor="ReservedTime" className="text">
                rooms
              </label>
              <Select
                options={room_options}
                value={selectRoom}
                onChange={handleRoomChange}
                name="rooms"
                className="form-control"
                classNamePrefix="select"
              />
            </div>
            <div className="ReservedTime_inputs">
              <label htmlFor="ReservedTime" className="text">
                time
              </label>
              <input
                type="time"
                className="form-control"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="ReservedTime_buttons">
              <button type="submit" className="btn">
                Add Suitable Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ReservedTime);
