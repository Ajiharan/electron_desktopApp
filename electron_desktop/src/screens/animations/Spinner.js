import React from "react";
import { css } from "@emotion/core";
const Spinner = ({ Loader, size }) => {
  const override = css`
    display: flex;
    justify-content: center;
    margin: 10px auto;
    align-items: center;
    border-color: orange;
  `;
  return (
    <React.Fragment>
      <Loader css={override} size={size || 10} color={"red"} loading={true} />
    </React.Fragment>
  );
};

export { Spinner };
