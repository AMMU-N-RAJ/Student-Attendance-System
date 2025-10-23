import React, { useState } from 'react';
import { useStateValue } from './StateProvider';  
import { useParams, useNavigate } from 'react-router-dom';
import "./Checkout.css";

function Checkout() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [{ courses, user }, dispatch] = useStateValue();
  const [studentName, setStudentName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Find the current course
  const currentCourse = courses.find(course => course.id === courseId);

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (studentName.trim()) {
      dispatch({
        type: 'ADD_STUDENT',
        courseId: courseId,
        studentName: studentName.trim()
      });
      setStudentName('');
      setShowAddForm(false);
    }
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch({
        type: 'DELETE_STUDENT',
        courseId: courseId,
        studentId: studentId
      });
    }
  };

  const handleStatusChange = (studentId, currentStatus) => {
    // Cycle through: present -> absent -> dutyleave
    let newStatus;
    if (currentStatus === 'present') {
      newStatus = 'absent';
    } else if (currentStatus === 'absent') {
      newStatus = 'dutyleave';
    } else {
      newStatus = 'present';
    }

    dispatch({
      type: 'UPDATE_ATTENDANCE',
      courseId: courseId,
      studentId: studentId,
      status: newStatus
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'present':
        return '#4CAF50'; // green
      case 'absent':
        return '#f44336'; // red
      case 'dutyleave':
        return '#9e9e9e'; // gray
      default:
        return '#9e9e9e';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'present':
        return 'Present';
      case 'absent':
        return 'Absent';
      case 'dutyleave':
        return 'Duty Leave';
      default:
        return 'Duty Leave';
    }
  };

  if (!currentCourse) {
    return (
      <div className="checkout">
        <div className="checkout__container">
          <h2>Course not found</h2>
          <button onClick={() => navigate('/')} className="checkout__backButton">
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout__container">
        <div className="checkout__header">
          <button onClick={() => navigate('/')} className="checkout__backButton">
            ← Back to Courses
          </button>
          <h1 className="checkout__title">{currentCourse.name} - Student Attendance</h1>
        </div>

        <div className="checkout__controls">
          <button 
            onClick={() => setShowAddForm(!showAddForm)} 
            className="checkout__addButton"
          >
            {showAddForm ? 'Cancel' : '+ Add Student'}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddStudent} className="checkout__addForm">
            <input
              type="text"
              placeholder="Enter student name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="checkout__input"
              autoFocus
            />
            <button type="submit" className="checkout__submitButton">
              Add
            </button>
          </form>
        )}

        <div className="checkout__legend">
          <h3>Attendance Status:</h3>
          <div className="checkout__legendItems">
            <div className="checkout__legendItem">
              <span className="checkout__legendColor" style={{ backgroundColor: '#4CAF50' }}></span>
              <span>Present</span>
            </div>
            <div className="checkout__legendItem">
              <span className="checkout__legendColor" style={{ backgroundColor: '#f44336' }}></span>
              <span>Absent</span>
            </div>
            <div className="checkout__legendItem">
              <span className="checkout__legendColor" style={{ backgroundColor: '#9e9e9e' }}></span>
              <span>Duty Leave</span>
            </div>
          </div>
          <p className="checkout__hint">Click on a student's status to change it</p>
        </div>

        <div className="checkout__students">
          {currentCourse.students.length === 0 ? (
            <div className="checkout__empty">
              <p>No students added yet. Click "Add Student" to get started.</p>
            </div>
          ) : (
            currentCourse.students.map((student) => (
              <div key={student.id} className="checkout__student">
                <div className="checkout__studentInfo">
                  <h3 className="checkout__studentName">{student.name}</h3>
                  <button
                    className="checkout__statusButton"
                    style={{ backgroundColor: getStatusColor(student.status) }}
                    onClick={() => handleStatusChange(student.id, student.status)}
                  >
                    {getStatusText(student.status)}
                  </button>
                </div>
                <button
                  onClick={() => handleDeleteStudent(student.id)}
                  className="checkout__deleteButton"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {currentCourse.students.length > 0 && (
          <div className="checkout__summary">
            <h3>Summary</h3>
            <p>Total Students: {currentCourse.students.length}</p>
            <p>Present: {currentCourse.students.filter(s => s.status === 'present').length}</p>
            <p>Absent: {currentCourse.students.filter(s => s.status === 'absent').length}</p>
            <p>Duty Leave: {currentCourse.students.filter(s => s.status === 'dutyleave').length}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;