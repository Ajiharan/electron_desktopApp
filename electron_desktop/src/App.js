import React from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';
import HomeScreen from './screens/home/Home';
import './App.css';
import Navbar from './screens/navbar/Navbar';
import Yearsemister from './screens/year_semister/Yearsemister';

function App() {
  return (
   <React.Fragment>
     <HashRouter>
       <Navbar/>
        <Switch>
          <Route exact path="/" component={HomeScreen}/>       
          <Route exact path="/student/year_semister/add" component={Yearsemister}/>   
        </Switch>
     </HashRouter>
   </React.Fragment>
  );
}

export default App;
