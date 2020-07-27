import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

const Search = () => {
    return (
        <React.Fragment>
            <div className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="searchbar">
                        <input className="search_input" type="text" name="" placeholder="Search..."/>
                        <a href="#" className="search_icon"><SearchIcon/></a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Search;