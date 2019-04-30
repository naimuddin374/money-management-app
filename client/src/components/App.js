import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
      <br/>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Home} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
