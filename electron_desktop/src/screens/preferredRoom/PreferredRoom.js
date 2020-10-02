import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPreferredRoom } from "../../redux/preferedRoom/PreferedRoomAction";
import { viewSubject } from "../../redux/Subject/SubjectAction";
import { viewTag } from "../../redux/tag/TagAction";
import { viewRoom } from "../../redux/Room/RoomAction";
import "./PreferredRoom.css";
import { Spinner } from "../animations/Spinner";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import ScreenNav from "../screen-nav/ScreenNav";
import Select from "react-select";

const PreferredRoom = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [tag_data, setTags] = useState("");
  const [room_data, setRooms] = useState("");
  const [subject_data, setSubject] = useState("");
  const [selectTag, setSelectTag] = useState([]);
  const [selectRoom, setSelectRoom] = useState([]);
  const [selectSubject, setSelectSubject] = useState([]);
  const [clicked, isClicked] = useState(false);
  const [success, setSuccess] = useState("Successfully Added");
  const { loading, error } = useSelector((state) => state.addpreferredRoom);
  const { room } = useSelector((state) => state.get_room);
  const { tags } = useSelector((state) => state.get_tag);
  const { subject } = useSelector((state) => state.get_subjects);
  const [room_options, setRoomOptions] = useState([]);
  useEffect(() => {
    dispatch(viewRoom());
    dispatch(viewTag());
    dispatch(viewSubject());
  }, []);

  useEffect(() => {
    setRooms(room);
    setTags(tags);
    setSubject(subject);
  }, [room, tags, subject]);

  useEffect(() => {
    setSelectRoom([]);
    if (selectTag.value === "lecture") {
      const temp = room.filter((data) => {
        if (data.room.type === "lecture") {
          return data;
        }
      });
      setRoomOptions(
        temp.map((data) => {
          return { value: data.room.name, label: data.room.name };
        })
      );
    } else if (selectTag.value === "lab") {
      const temp = room.filter((data) => {
        if (data.room.type === "lab") {
          return data;
        }
      });
      setRoomOptions(
        temp.map((data) => {
          return { value: data.room.name, label: data.room.name };
        })
      );
    } else {
      const temp = room.filter((data) => {
        if (data.room.type === "tutorial") {
          return data;
        }
      });
      setRoomOptions(
        temp.map((data) => {
          return { value: data.room.name, label: data.room.name };
        })
      );
    }
  }, [selectTag]);

  const tag_options = tags.map((data) => {
    return {
      value: data.tag,
      label: data.tag,
    };
  });

  const sub_options = subject.map((data) => {
    return {
      value: data.sub_name,
      label: data.sub_name,
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
      name: "PreferredRoom",
      pathname: "/PreferredRoom/add",
    },
  ];

  const handleTagChange = (optionValue) => {
    setSelectTag(optionValue);
  };
  const handleRoomChange = (optionValue) => {
    setSelectRoom(optionValue);
    // console.log(optionValue);
  };
  const handleSubChange = (optionValue) => {
    setSelectSubject(optionValue);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      addPreferredRoom({
        selectRoom,
        selectTag,
        selectSubject,
      })
    );
  };
  return (
    <div className="PreferredRoom">
      <ScreenNav rightNavData={navData} />
      <div className="PreferredRoom__container">
        <div className="PreferredRoom__box">
          <div className="lead text-success PreferredRoom__message">
            {loading && clicked && <Spinner Loader={DotLoader} size={30} />}
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {!loading && !error && success}
              {!loading && error && error}
            </p>
          </div>

          <h2 className="text-center text-dark">Add Preffered Room</h2>
          <form id="frm" onSubmit={(e) => submitHandler(e)}>
            <div className="PreferredRoom_inputs">
              <label htmlFor="PreferredRoom" className="text">
                Subject
              </label>
              <Select
                options={sub_options}
                className="form-control"
                classNamePrefix="select"
                value={selectSubject}
                onChange={handleSubChange}
              />
            </div>
            <div className="PreferredRoom_inputs">
              <label htmlFor="PreferredRoom" className="text">
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
            <div className="PreferredRoom_inputs">
              <label htmlFor="PreferredRoom" className="text">
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
            <div className="PreferredRoom_buttons">
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

export default React.memo(PreferredRoom);
