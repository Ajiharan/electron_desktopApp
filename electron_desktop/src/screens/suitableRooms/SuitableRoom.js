import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSuitableRoom } from "../../redux/suitableRoom/SuitableRoomAction";
import { viewTag } from "../../redux/tag/TagAction";
import { viewRoom } from "../../redux/Room/RoomAction";
import "./SuitableRoom.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import Select from "react-select";

const SuitableRoom = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [tag_data, setTags] = useState("");
  const [room_data, setRooms] = useState("");
  const [selectTag, setSelectTag] = useState(null);
  const [selectRoom, setSelectRoom] = useState([]);
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const { loading, error, suitableRoom } = useSelector(
    (state) => state.addSuitableRoom
  );
  const { room } = useSelector((state) => state.get_room);
  const { tags } = useSelector((state) => state.get_tag);

  useEffect(() => {
    dispatch(viewRoom());
    dispatch(viewTag());
  }, []);

  useEffect(() => {
    setRooms(room);
    setTags(tags);
  }, [room, tags]);

  const room_options = room.map((data) => {
    console.log(data);
    return {
      value: data.room.name,
      label: data.room.name,
    };
  });

  const tag_options = tags.map((data) => {
    console.log(data);
    return {
      value: data.tag,
      label: data.tag,
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
      name: "SuitableRoom",
      pathname: "/SuitableRoom/add",
    },
  ];

  const handleTagChange = (optionValue) => {
    setSelectTag(optionValue);
  };
  const handleRoomChange = (optionValue) => {
    setSelectRoom(optionValue);
    // console.log(optionValue);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(selectRoom);
    dispatch(
      addSuitableRoom({
        selectRoom,
        selectTag,
      })
    );
  };
  return (
    <div className="SuitableRoom">
      <ScreenNav rightNavData={navData} />
      <div className="SuitableRoom__container">
        <div className="SuitableRoom__box">
          <div className="lead text-success SuitableRoom__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Add SuitableRoom</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="SuitableRoom_inputs">
              <label htmlFor="SuitableRoom" className="text">
                tags
              </label>
              <Select
                options={tag_options}
                className="form-control"
                classNamePrefix="select"
                value={selectTag}
                onChange={handleTagChange}
              />
            </div>
            <div className="SuitableRoom_inputs">
              <label htmlFor="SuitableRoom" className="text">
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
            <div className="SuitableRoom_buttons">
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

export default React.memo(SuitableRoom);
