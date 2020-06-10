import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import MondayDailyPlanner from './pages/MondayDailyPlanner';
import TuesdayDailyPlanner from './pages/TuesdayDailyPlanner';
import MainLayout from './layouts/MainLayout';
import WednesdayDailyPlanner from './pages/WednesdayDailyPlanner';
import ThursdayDailyPlanner from './pages/ThursdayDailyPlanner';
import FridayDailyPlanner from './pages/FridayDailyPlanner';
import SaturdayDailyPlanner from './pages/SaturdayDailyPlanner';
import SundayDailyPlanner from './pages/SundayDailyPlanner';


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      <MainLayout>
        <Switch>
        <Route path={"/"} exact component={Home}/> 
        <Route path={"/monday-schedule"} component={MondayDailyPlanner}/>
        <Route path={"/tuesday-schedule"} component={TuesdayDailyPlanner}/>
        <Route path={"/wednesday-schedule"} component={WednesdayDailyPlanner}/>
        <Route path={"/thursday-schedule"} component={ThursdayDailyPlanner}/>
        <Route path={"/friday-schedule"} component={FridayDailyPlanner}/>
        <Route path={"/saturday-schedule"} component={SaturdayDailyPlanner}/>
        <Route path={"/sunday-schedule"} component={SundayDailyPlanner}/>
        </Switch>
      </MainLayout>
      </div>
    </Router>
    );
  }
}

export default App;