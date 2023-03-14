
import './App.css';
import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import LandingPage from './Components/LandingPage'
import Home from './Components/Home'
import ActivityCreate from './Components/ActivityCreate';
import Detail from './Components/Detail';
import About from './Components/About'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/'component={LandingPage}/>
          <Route path='/home' component={Home}/>
          <Route path='/activity' component={ActivityCreate}/>
          <Route path='/about' component={About}/>
          <Route path='/detail/:id' component={Detail}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

