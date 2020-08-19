import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RoomUpdate.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { UpdateRoom } from "../../redux/Room/RoomAction";
import ScreenNav from "../screen-nav/ScreenNav";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
const Room = (props) => {
  console.log("props.history", props.location.state?.room.name);
  const dispatch = useDispatch();
  const history = useHistory();
  const [roomData, setroomData] = useState("");
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Updated");

  const { loading, error } = useSelector((state) => state.update_room);

  useEffect(() => {
    if (!props.location.state) {
      history.replace({
        pathname: "/room/room/view",
      });
    } else {
      setroomData(props.location.state);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: props.location.state?.room.name,
      type: props.location.state?.room.type,
      building: props.location.state?.room.building,
      capacity: props.location.state?.room.capacity,
    },
    onSubmit: (inputs) => {
      //   console.log("props.location.state?.id", props.location.state?.id);
      isClicked(true);
      dispatch(UpdateRoom(props.location.state?.id, inputs));
    },
  });

  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "Room > ",
      pathname: "/room/room/add",
    },
    {
      id: 3,
      name: "view > ",
      pathname: "/room/room/view",
    },
    {
      id: 4,
      name: "update",
      pathname: "/room/room/update",
    },
  ];

  return (
    <div className="roomUpdate">
      <ScreenNav rightNavData={navData} />
      <div className="roomUpdate__container">
        <div className="roomUpdate__box">
          <div className="lead text-success roomUpdate__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Update Room</h2>
          <form id="myForm" onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="roomUpdate_inputs">
              <label htmlFor="name">Room Name</label>
              <input
                placeholder="A640"
                name="name"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.name}
                required
              />
            </div>

            <div className="roomUpdate_inputs">
              <label htmlFor="capacity">Capacity</label>
              <input
                placeholder="150"
                name="capacity"
                type="text"
                className="form-control"
                value={formik.values.capacity}
                onChange={formik.handleChange}
                required
              />
            </div>

            <div className="roomUpdate_inputs">
              <label htmlFor="building">Building</label>
              <select
                className="form-control"
                onChange={formik.handleChange}
                name="building"
                value={formik.values.building}
                required
              >
                <option value="">None</option>
                <option value="new_building">New Building</option>
                <option value="main_building">Main Building</option>
                <option value="auditorium">Auditorium</option>
              </select>
            </div>

            <div className="roomUpdate_inputs">
              <label htmlFor="type">Type</label>
              <select
                className="form-control"
                onChange={formik.handleChange}
                name="type"
                value={formik.values.type}
                required
              >
                <option value="">None</option>
                <option value="lab">Laboratory</option>
                <option value="lecture">Lecture</option>
              </select>
            </div>

            <div className="roomUpdate_buttons">
              <button
                type="button"
                onClick={() => history.push("/room/room/view")}
                className="btn"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn"
                disabled={!formik.values.name}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Room;
