import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';


class MainLayout extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <nav className="navBar">
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/monday-schedule">Monday</NavLink>
                </li>
                <li>
                    <NavLink to="/tuesday-schedule">Tuesday</NavLink>
                </li>
                <li>
                    <NavLink to="/wednesday-schedule">Wednesday</NavLink>
                </li>
                <li>
                    <NavLink to="/thursday-schedule">Thursday</NavLink>
                </li>
                <li>
                    <NavLink to="/friday-schedule">Friday</NavLink>
                </li>
                <li>
                    <NavLink to="/saturday-schedule">Saturday</NavLink>
                </li>
                <li>
                    <NavLink to="/sunday-schedule">Sunday</NavLink>
                </li>
            </ul>
            {this.props.children}
        </nav>
        );
    }
}

export default MainLayout;