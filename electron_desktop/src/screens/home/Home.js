import React from 'react';
import './home.css';
import {Spinner} from '../animations/Spinner';
import Search from './Search';
import HomeNestedList from './HomeList';
import { Link } from 'react-router-dom';

const Home = () => {

  
    return (
      <React.Fragment>
        <div className="container-fluid mt-4 pt-1">
            <div className="row">
                <div className="col-md-3">
                    <HomeNestedList/>
                </div>
                <div className="col-md-5">
                  <Spinner/>
                  <img className="img-fluid img-thumbnail" src={require("../images/imageHome1.gif")}/>
                </div>
                <div className="col-md-4">
                  <Search/>
                </div>
            </div>
            <div className="row">
              <p className="lead">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
              </p>
            </div>
        </div>
        <div className="container-fluid">
          <p className="lead text-center home__footer">@copyright 2020</p>
        </div>
     </React.Fragment>
    );
};

export default Home;