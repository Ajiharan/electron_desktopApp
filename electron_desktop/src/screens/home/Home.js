import React from 'react';
import './home.css';
import {Spinner} from '../animations/Spinner';
import Search from './Search';
import HomeNestedList from './HomeList';

const Home = () => {

  
    return (
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
      </div>
    );
};

export default Home;