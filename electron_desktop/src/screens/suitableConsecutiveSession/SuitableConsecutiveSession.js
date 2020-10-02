import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSuitableConsecutiveSession } from "../../redux/suitableConsecutiveSession/SuitableConsecutiveSessionAction";
import { viewConsecutiveSessions } from "../../redux/consecutive/consecutiveAction";
import { viewRoom } from "../../redux/Room/RoomAction";
import "./SuitableConsecutiveSession.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import Select from "react-select";

const SuitableConsecutiveSession = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [consecutivesession_data, setConsecutiveSessions] = useState("");
  const [room_data, setRooms] = useState("");
  const [selectConsecutiveSession, setSelectConsecutiveSession] = useState(null);
  const [selectRoom, setSelectRoom] = useState([]);
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const { loading, error, suitableConsecutiveSession } = useSelector(
    (state) => state.addSuitableConsecutiveSession
  );
  const { room } = useSelector((state) => state.get_room);
  const { consecutive_sessions } = useSelector((state) => state.get_consecutiveSession);

  useEffect(() => {
    dispatch(viewRoom());
    dispatch(viewConsecutiveSessions());
  }, []);

  useEffect(() => {
    setRooms(room);
    setConsecutiveSessions(consecutive_sessions);
  }, [room, consecutive_sessions]);

  const room_options = room.map((data) => {
    console.log(data);
    return {
      value: data.room.name,
      label: data.room.name,
    };
  });

  const consecutivesession_options = consecutive_sessions.map((result) => {
    console.log(result);
    return {
      value:
        result.lecture +
        " " +
        result.tutorial,
    
      label:
        result.lecture +
        " " +
        result.tutorial,
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
      name: "SuitableConsecutiveSession",
      pathname: "/SuitableConsecutiveSession/add",
    },
  ];

  const handleConsecutiveSessionChange = (optionValue) => {
    setSelectConsecutiveSession(optionValue);
  };
  const handleRoomChange = (optionValue) => {
    setSelectRoom(optionValue);
    // console.log(optionValue);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(selectRoom);
    dispatch(
      addSuitableConsecutiveSession({
        selectRoom,
        selectConsecutiveSession,
      })
    );
  };
  return (
    <div className="SuitableConsecutiveSession">
      <ScreenNav rightNavData={navData} />
      <div className="SuitableConsecutiveSession__container">
        <div className="SuitableConsecutiveSession__box">
          <div className="lead text-success SuitableConsecutiveSession__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Add SuitableConsecutiveSession</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="SuitableConsecutiveSession_inputs">
              <label htmlFor="SuitableConsecutiveSession" className="text">
                consecutivesession
              </label>
              <Select
                options={consecutivesession_options}
                className="form-control"
                classNamePrefix="select"
                value={selectConsecutiveSession}
                onChange={handleConsecutiveSessionChange}
              />
            </div>
            <div className="SuitableConsecutiveSession_inputs">
              <label htmlFor="SuitableConsecutiveSession" className="text">
                rooms
              </label>
              <Select
                options={room_options}
                isMulti
                value={selectRoom}
                onChange={handleRoomChange}
                name="rooms"
                className="basic-multi-select form-control"
                classNamePrefix="select"
              />
            </div>
            <div className="SuitableConsecutiveSession_buttons">
              <button type="submit" className="btn">
                Add Suitable ConsecutiveSession
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SuitableConsecutiveSession);
