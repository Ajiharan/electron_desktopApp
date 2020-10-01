import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSuitableGroupId } from "../../redux/suitableGroupId/SuitableGroupIdAction";
import { viewGroupId } from "../../redux/groupId/GroupIdAction";
import { viewRoom } from "../../redux/Room/RoomAction";
import "./SuitableGroupId.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import Select from "react-select";

const SuitableGroupId = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [groupid_data, setGroupIds] = useState("");
  const [room_data, setRooms] = useState("");
  const [selectGroupId, setSelectGroupId] = useState(null);
  const [selectRoom, setSelectRoom] = useState([]);
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const { loading, error, suitableGroupId } = useSelector(
    (state) => state.addSuitableGroupId
  );
  const { room } = useSelector((state) => state.get_room);
  const { groupid } = useSelector((state) => state.get_groupId);

  useEffect(() => {
    dispatch(viewRoom());
    dispatch(viewGroupId());
  }, []);

  useEffect(() => {
    setRooms(room);
    setGroupIds(groupid);
  }, [room, groupid]);

  const room_options = room.map((data) => {
    console.log(data);
    return {
      value: data.room.name,
      label: data.room.name,
    };
  });

  const groupid_options = groupid.map((data) => {
    console.log(data);
    return {
      value: data.groupid.group_id,
      label: data.groupid.group_id,
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
      name: "SuitableGroupId",
      pathname: "/SuitableGroupId/add",
    },
  ];

  const handleGroupIdChange = (optionValue) => {
    setSelectGroupId(optionValue);
  };
  const handleRoomChange = (optionValue) => {
    setSelectRoom(optionValue);
    // console.log(optionValue);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(selectRoom);
    dispatch(
      addSuitableGroupId({
        selectRoom,
        selectGroupId,
      })
    );
  };
  return (
    <div className="SuitableGroupId">
      <ScreenNav rightNavData={navData} />
      <div className="SuitableGroupId__container">
        <div className="SuitableGroupId__box">
          <div className="lead text-success SuitableGroupId__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Add SuitableGroupId</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="SuitableGroupId_inputs">
              <label htmlFor="SuitableGroupId" className="text">
                groupid
              </label>
              <Select
                options={groupid_options}
                className="form-control"
                classNamePrefix="select"
                value={selectGroupId}
                onChange={handleGroupIdChange}
              />
            </div>
            <div className="SuitableGroupId_inputs">
              <label htmlFor="SuitableGroupId" className="text">
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
            <div className="SuitableGroupId_buttons">
              <button type="submit" className="btn">
                Add Suitable GroupId
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SuitableGroupId);
