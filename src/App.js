import React from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
//import './App.css';
import Navbar from "./components/navbar.component";
import UserList from "./components/user-list.component";
import UserCreate from "./components/user-create.component";
import DefaultPage from "./components/default-page.component";
import DepartmentList from "./components/department-list.component";


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={DefaultPage} />
        <Route path="/users" exact component={UserList} />
        <Route path="/usercreate" exact component={UserCreate} />
        <Route path="/departments" exact component={DepartmentList} />
      </div>
    </Router>
  );
}

export default App;
