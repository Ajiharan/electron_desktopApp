import React from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';
import HomeScreen from './screens/home/Home';
import './App.css';
import Navbar from './screens/navbar/Navbar';

function App() {
  return (
   <React.Fragment>
     <HashRouter>
       <Navbar/>
        <Switch>
          <Route exact to="/" component={HomeScreen}/>
        </Switch>
     </HashRouter>
   </React.Fragment>
  );
}

export default App;
