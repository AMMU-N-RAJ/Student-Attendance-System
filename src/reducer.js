export const initialState = {
  user: null,
  courses: [
    { id: 'CST301', name: 'CST301', students: [] },
    { id: 'CST303', name: 'CST303', students: [] },
    { id: 'CST305', name: 'CST305', students: [] },
    { id: 'CST307', name: 'CST307', students: [] },
    { id: 'CST309', name: 'CST309', students: [] },
    { id: 'MCN301', name: 'MCN301', students: [] },
    { id: 'CSL331', name: 'CSL331', students: [] },
    { id: 'CSL333', name: 'CSL333', students: [] }
  ],
  selectedCourse: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };
    
    case 'SELECT_COURSE':
      return {
        ...state,
        selectedCourse: action.courseId
      };
    
    case 'ADD_STUDENT':
      return {
        ...state,
        courses: state.courses.map(course =>
          course.id === action.courseId
            ? {
                ...course,
                students: [
                  ...course.students,
                  {
                    id: Date.now(),
                    name: action.studentName,
                    status: 'dutyleave' // default status: gray
                  }
                ]
              }
            : course
        )
      };
    
    case 'DELETE_STUDENT':
      return {
        ...state,
        courses: state.courses.map(course =>
          course.id === action.courseId
            ? {
                ...course,
                students: course.students.filter(
                  student => student.id !== action.studentId
                )
              }
            : course
        )
      };
    
    case 'UPDATE_ATTENDANCE':
      return {
        ...state,
        courses: state.courses.map(course =>
          course.id === action.courseId
            ? {
                ...course,
                students: course.students.map(student =>
                  student.id === action.studentId
                    ? { ...student, status: action.status }
                    : student
                )
              }
            : course
        )
      };
    
    default:
      return state;
  }
};

export default reducer;
