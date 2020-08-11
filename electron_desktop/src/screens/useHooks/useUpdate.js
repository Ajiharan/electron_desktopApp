import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCheck = ({ updateData, data, setData, isClicked }) => {
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    isClicked(true);
    dispatch(updateData(data.id, data.year_semister));
  };

  const clearInput = () => {
    setData("");
  };

  return { submitHandler, clearInput };
};

export default useCheck;
