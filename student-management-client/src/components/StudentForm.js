import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentList.css';

const StudentForm = () => {
    const [student, setStudent] = useState({
        studentId: '',
        firstName: '',
        lastName: '',
        course: '',
        email: '',
        phoneNumber: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/students', student);
            console.log('Student added:', response.data);
            // Clear the form after successful submission
            setStudent({
                studentId: '',
                firstName: '',
                lastName: '',
                course: '',
                email: '',
                phoneNumber: ''
            });
        } catch (err) {
            console.error('Error adding student:', err);
        }
    };

    const handleViewStudents = () => {
        navigate('/students');
    };

    return ( <
        div className = "form-container" >
        <
        form onSubmit = { handleSubmit } >
        <
        input type = "text"
        name = "studentId"
        placeholder = "Student ID"
        value = { student.studentId }
        onChange = { handleChange }
        required /
        >
        <
        input type = "text"
        name = "firstName"
        placeholder = "First Name"
        value = { student.firstName }
        onChange = { handleChange }
        required /
        >
        <
        input type = "text"
        name = "lastName"
        placeholder = "Last Name"
        value = { student.lastName }
        onChange = { handleChange }
        required /
        >
        <
        select name = "course"
        value = { student.course }
        onChange = { handleChange }
        required >
        <
        option value = "" > Select Course < /option> <
        option value = "B.Tech Computer Science " > B.Tech Computer Science < /option> <
        option value = " B.Tech Information Technology" > B.Tech Information Technology < /option> <
        option value = "B.Tech Data Science " > B.Tech Data Science < /option> <
        option value = " B.Tech Mechanical" > B.Tech Mechanical < /option> <
        option value = "B.Tech Electrical " > B.Tech Electrical < /option> <
        option value = "BBA" > BBA < /option> <
        option value = " B.Sc " > B.Sc < /option> < /
        select > <
        input type = "email"
        name = "email"
        placeholder = "Email"
        value = { student.email }
        onChange = { handleChange }
        required /
        >
        <
        input type = "text"
        name = "phoneNumber"
        placeholder = "Phone Number"
        value = { student.phoneNumber }
        onChange = { handleChange }
        required /
        >
        <
        button type = "submit"
        style = {
            { width: "380px" }
        } > Add Student < /button> < /
        form > <
        button style = {
            { width: "300px" }
        }
        className = "view-students-btn"
        onClick = { handleViewStudents } > View All Students < /button> < /
        div >
    );
};

export default StudentForm;