import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './Search.css';
const Search = () => {
    return (
        <React.Fragment>
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="searchbar">
                        <input className="search_input" type="text" name="" placeholder="Search..."/>
                        <a href="#" className="search_icon"><SearchIcon/></a>
                       
                    </div>
                </div>
                <h5 className="text-center">No results found</h5>
            </div>
        </React.Fragment>
    );
};

export default Search;