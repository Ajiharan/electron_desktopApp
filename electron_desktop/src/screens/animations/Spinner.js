import React from 'react';
import {BeatLoader,BounceLoader} from "react-spinners";
import { css } from "@emotion/core";
const Spinner = (props) => {

        const override = css`
        display: flex;
        justify-content:center;
        margin: 10px auto;
        align-items:center;
        border-color: orange;
    `;
    return (
        <React.Fragment>
             <BeatLoader
                css={override}
                size={10}
                color={"#fa4e65"}
                loading={true}
             />
        </React.Fragment>
    );
};

export  {Spinner};