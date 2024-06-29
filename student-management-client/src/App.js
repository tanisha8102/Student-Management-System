import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css'; // Importing the CSS file


const App = () => {
    return ( <
        Router >
        <
        div className = "App" >
        <
        h1 > STUDENT PROFILE MANAGEMENT < /h1> <
        Routes >
        <
        Route path = "/"
        element = { < StudentForm / > }
        /> <
        Route path = "/students"
        element = { < StudentList / > }
        /> < /
        Routes > <
        /div> < /
        Router >
    );
};

export default App;