import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import About from '../pages/About'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Transaction from './Transaction/Transaction'
import Navigation from './Navigation/Navigation'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navigation />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/transactions" component={Transaction} exact />
          <Route path="/about" component={About} exact />
          <Route path="/" component={Home} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
