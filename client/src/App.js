import React, { Component } from "react";
import "./App.css";

import { Route } from "react-router-dom";

import Monsters from "./components/Monsters";
import Nav from "./components/Nav";
import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/monsters" component={Monsters} />
      </div>
    );
  }
}

const Home = () => {
  return <h1>Hi, you're home</h1>;
};

export default App;
