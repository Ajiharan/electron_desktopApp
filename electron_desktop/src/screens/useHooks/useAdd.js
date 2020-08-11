import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAdd = ({ addData, data, setData, isClicked }) => {
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    isClicked(true);
    dispatch(addData(data));
    setData("");
  };

  const clearInput = () => {
    setData("");
  };

  return { submitHandler, clearInput };
};

export default useAdd;
