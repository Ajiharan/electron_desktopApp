import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSuitableLecturer } from "../../redux/SuitableLecturer/SuitableLecturerAction";
import { viewLecturer } from "../../redux/Lecturer/LecturerAction";
import { viewRoom } from "../../redux/Room/RoomAction";
import "./SuitableLecturer.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import Select from "react-select";

const SuitableLecturer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [lecturer_data, setLecturers] = useState("");
  const [room_data, setRooms] = useState("");
  const [selectLecturer, setSelectLecturer] = useState(null);
  const [selectRoom, setSelectRoom] = useState([]);
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const { loading, error, suitableLecturer } = useSelector(
    (state) => state.addSuitableLecturer
  );
  const { room } = useSelector((state) => state.get_room);
  const { lecturer } = useSelector((state) => state.get_lecturers);

  useEffect(() => {
    dispatch(viewRoom());
    dispatch(viewLecturer());
  }, []);

  useEffect(() => {
    setRooms(room);
    setLecturers(lecturer);
  }, [room, lecturer]);

  const room_options = room.map((data) => {
    console.log(data);
    return {
      value: data.room.name,
      label: data.room.name,
    };
  });

  const lecturer_options = lecturer.map((data) => {
    console.log(data);
    return {
      value: data.name,
      label: data.name,
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
      name: "SuitableLecturer",
      pathname: "/SuitableLecturer/add",
    },
  ];

  const handleLecturerChange = (optionValue) => {
    setSelectLecturer(optionValue);
  };
  const handleRoomChange = (optionValue) => {
    setSelectRoom(optionValue);
    // console.log(optionValue);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(selectRoom);
    dispatch(
      addSuitableLecturer({
        selectRoom,
        selectLecturer,
      })
    );
  };
  return (
    <div className="SuitableLecturer">
      <ScreenNav rightNavData={navData} />
      <div className="SuitableLecturer__container">
        <div className="SuitableLecturer__box">
          <div className="lead text-success SuitableLecturer__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Add SuitableLecturer</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="SuitableLecturer_inputs">
              <label htmlFor="SuitableLecturer" className="text">
                lecturer
              </label>
              <Select
                options={lecturer_options}
                className="form-control"
                classNamePrefix="select"
                value={selectLecturer}
                onChange={handleLecturerChange}
              />
            </div>
            <div className="SuitableLecturer_inputs">
              <label htmlFor="SuitableLecturer" className="text">
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
            <div className="SuitableLecturer_buttons">
              <button type="submit" className="btn">
                Add Suitable Lecturer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SuitableLecturer);
