import React, { Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/layout/Landing';
import TopScores from './components/layout/TopScores';
import PuzzleFactory from './components/layout/PuzzleFactory';
import Navigation from './components/layout/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './components/layout/404';

const App = () => {
  
  return (
    <Router>
      <Fragment>
        <Navigation />
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/scores' component={TopScores} />
          <Route exact path='/admin-only' component={PuzzleFactory} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    </Router>
  );
}
  

export default App;
