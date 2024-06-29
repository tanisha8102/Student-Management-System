import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './StudentList.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingStudentId, setEditingStudentId] = useState(null);
    const [editingStudentData, setEditingStudentData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async() => {
            try {
                const response = await axios.get('http://localhost:5001/api/students');
                const sortedStudents = response.data.sort((a, b) => {
                    return a.studentId - b.studentId; // Sort by studentId numerically
                });
                setStudents(sortedStudents);
            } catch (err) {
                console.error('Error fetching students:', err);
            }
        };

        fetchStudents();
    }, []);

    const handleDelete = async(id) => {
        try {
            await axios.delete(`http://localhost:5001/api/students/${id}`);
            setStudents(students.filter(student => student._id !== id));
        } catch (err) {
            console.error('Error deleting student:', err);
            console.error('Response:', err.response); // Log response details if available
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingStudentData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditSubmit = async(e, id) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5001/api/students/${id}`, editingStudentData);
            setStudents(students.map(student => (student._id === id ? response.data : student)));
            setEditingStudentId(null);
        } catch (err) {
            console.error('Error updating student:', err);
        }
    };

    const handleEditClick = (student) => {
        setEditingStudentId(student._id);
        setEditingStudentData(student);
    };

    const handleSearch = async(e) => {
        const { value } = e.target;
        setSearchTerm(value);

        try {
            const response = await axios.get(`http://localhost:5001/api/students/search?term=${value}`);
            const sortedStudents = response.data.sort((a, b) => {
                return a.studentId - b.studentId; // Sort by studentId numerically
            });
            setStudents(sortedStudents);
        } catch (err) {
            console.error('Error searching students:', err);
        }
    };

    const renderStudentRow = (student) => {
        const isEditing = editingStudentId === student._id;
        const shouldHighlight = searchTerm &&
            (student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()));

        return ( <
            tr key = { student._id }
            className = { shouldHighlight ? 'highlight' : '' } > {
                isEditing ? ( <
                    >
                    <
                    td > < input type = "text"
                    name = "studentId"
                    value = { editingStudentData.studentId }
                    onChange = { handleEditChange }
                    className = "table-input" / > < /td> <
                    td > < input type = "text"
                    name = "firstName"
                    value = { editingStudentData.firstName }
                    onChange = { handleEditChange }
                    className = "table-input" / > < /td> <
                    td > < input type = "text"
                    name = "lastName"
                    value = { editingStudentData.lastName }
                    onChange = { handleEditChange }
                    className = "table-input" / > < /td> <
                    td > < input type = "text"
                    name = "course"
                    value = { editingStudentData.course }
                    onChange = { handleEditChange }
                    className = "table-input" / > < /td> <
                    td > < input type = "email"
                    name = "email"
                    value = { editingStudentData.email }
                    onChange = { handleEditChange }
                    className = "table-input" / > < /td> <
                    td > < input type = "text"
                    name = "phoneNumber"
                    value = { editingStudentData.phoneNumber }
                    onChange = { handleEditChange }
                    className = "table-input" / > < /td> <
                    td >
                    <
                    button onClick = {
                        (e) => handleEditSubmit(e, student._id) } > Save < /button> <
                    button onClick = {
                        () => setEditingStudentId(null) } > Cancel < /button> <
                    /td> <
                    />
                ) : ( <
                    >
                    <
                    td > { student.studentId } < /td> <
                    td > { student.firstName } < /td> <
                    td > { student.lastName } < /td> <
                    td > { student.course } < /td> <
                    td > { student.email } < /td> <
                    td > { student.phoneNumber } < /td> <
                    td >
                    <
                    button onClick = {
                        () => handleEditClick(student) } > Edit < /button> <
                    button onClick = {
                        () => handleDelete(student._id) } > Delete < /button> <
                    /td> <
                    />
                )
            } <
            /tr>
        );
    };

    return ( <
        div >
        <
        div className = "back-button" >
        <
        button onClick = {
            () => navigate('/') } > < FaArrowLeft / > Back < /button> <
        /div> <
        h2 > All Students < /h2> <
        input type = "text"
        placeholder = "Search by ID, Name, Course, Email, Phone Number..."
        value = { searchTerm }
        onChange = { handleSearch }
        /> <
        div className = "table-container" >
        <
        table >
        <
        thead >
        <
        tr >
        <
        th > Student ID < /th> <
        th > First Name < /th> <
        th > Last Name < /th> <
        th > Course < /th> <
        th > Email < /th> <
        th > Phone Number < /th> <
        th > Actions < /th> <
        /tr> <
        /thead> <
        tbody > { students.map(student => renderStudentRow(student)) } <
        /tbody> <
        /table> <
        /div> <
        /div>
    );
};

export default StudentList;