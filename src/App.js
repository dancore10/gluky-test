import React from "react";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";

import { Router, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import history from "./utils/history";
import Home from "./components/Home";
import Posts from "./components/Posts";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact component={Home}/>
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/posts" component={Posts} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;