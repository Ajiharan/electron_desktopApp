import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSuitableSession } from "../../redux/suitableSession/SuitableSessionAction";
import { viewSessions } from "../../redux/session/sessionAction";
import { viewRoom } from "../../redux/Room/RoomAction";
import "./SuitableSession.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import Select from "react-select";

const SuitableSession = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [session_data, setSessions] = useState("");
  const [room_data, setRooms] = useState("");
  const [selectSession, setSelectSession] = useState(null);
  const [selectRoom, setSelectRoom] = useState([]);
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const { loading, error, suitableSession } = useSelector(
    (state) => state.addSuitableSession
  );
  const { room } = useSelector((state) => state.get_room);
  const { session } = useSelector((state) => state.get_Session);

  useEffect(() => {
    dispatch(viewRoom());
    dispatch(viewSessions());
  }, []);

  useEffect(() => {
    setRooms(room);
    setSessions(session);
  }, [room, session]);

  const room_options = room.map((data) => {
    console.log(data);
    return {
      value: data.room.name,
      label: data.room.name,
    };
  });

  const session_options = session.map((result) => {
    console.log(result);
    return {
      value:
        result.selectedValueLecturer +
        " " +
        result.selectedValueSubject +
        " " +
        result.selectedValueTag +
        " " +
        result.selectedValueGroup.label +
        " " +
        result.noOfstudents +
        " " +
        result.timeDuration,
      label:
        result.selectedValueLecturer +
        " " +
        result.selectedValueSubject +
        " " +
        result.selectedValueTag +
        " " +
        result.selectedValueGroup.label +
        " " +
        result.noOfstudents +
        " " +
        result.timeDuration,
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
      name: "SuitableSession",
      pathname: "/SuitableSession/add",
    },
  ];

  const handleSessionChange = (optionValue) => {
    setSelectSession(optionValue);
  };
  const handleRoomChange = (optionValue) => {
    setSelectRoom(optionValue);
    // console.log(optionValue);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(selectRoom);
    dispatch(
      addSuitableSession({
        selectRoom,
        selectSession,
      })
    );
  };
  return (
    <div className="SuitableSession">
      <ScreenNav rightNavData={navData} />
      <div className="SuitableSession__container">
        <div className="SuitableSession__box">
          <div className="lead text-success SuitableSession__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Add SuitableSession</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="SuitableSession_inputs">
              <label htmlFor="SuitableSession" className="text">
                session
              </label>
              <Select
                options={session_options}
                className="form-control"
                classNamePrefix="select"
                value={selectSession}
                onChange={handleSessionChange}
              />
            </div>
            <div className="SuitableSession_inputs">
              <label htmlFor="SuitableSession" className="text">
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
            <div className="SuitableSession_buttons">
              <button type="submit" className="btn">
                Add Suitable Session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SuitableSession);
