import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render(){
        return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">Chronos Manager</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Default</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/users" className="nav-link">User List</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/usercreate" className="nav-link">Create User</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/departments" className="nav-link">Department List</Link>
                    </li>
                </ul>
            </div> 
        </nav>
        )
    }
}