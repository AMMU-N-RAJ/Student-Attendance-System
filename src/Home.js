import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from './StateProvider';

function Home() {
  const navigate = useNavigate();
  const [{ user, courses }, dispatch] = useStateValue();

  const handleCourseClick = (courseId) => {
    dispatch({
      type: 'SELECT_COURSE',
      courseId: courseId
    });
    navigate(`/course/${courseId}`);
  };

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="home">
      <div className="home__container">
        <h1 className="home__title">Select a Course!!</h1>
        <p className="home__subtitle">Choose a course to manage student attendance</p>
        
        <div className="home__courses">
          {courses.map((course) => (
            <div
              key={course.id}
              className="home__course"
              onClick={() => handleCourseClick(course.id)}
            >
              <div className="home__courseIcon">
                <img className="login__logo"
              src="https://cet.etlab.in/assets/3c0b6e64/manual.png"
            /></div>
              <h2 className="home__courseName">{course.name}</h2>
              <p className="home__courseInfo">
                {course.students.length} student{course.students.length !== 1 ? 's' : ''}
              </p>
              <button className="home__courseButton">View Attendance</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
