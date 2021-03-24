import React, { Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/layout/Landing';
import TopScores from './components/layout/TopScores';
import Navigation from './components/layout/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  
  return (
    <Router>
      <Fragment>
        <Navigation />
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/scores' component={TopScores} />
        </Switch>
      </Fragment>
    </Router>
  );
}
  

export default App;
