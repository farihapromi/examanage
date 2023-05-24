import React, { useState ,useEffect} from 'react'
import axios from 'axios';

function CourseExaminer() {
const[examinerlists,setExaminerList]=useState([]);
const[selectedExaminerList,setSelectedExaminerList]=useState([]);


const[courses,setCourse]=useState([]);
const[selectedCourse,setSelectedCourse]=useState([]);
const[fullMarks,setFullMarks]=useState([]);
const[selectedFullMarks,setSelectedFullMarks]=useState([]);
const[durations,setDuration]=useState([]);
const[selectedDuration,setSelectedDuration]=useState([]);


useEffect(() => {
    // Fetch examiner list
    axios.get("http://127.0.0.1:8000/core/examiner-detail-list/").then((response) => {
        setExaminerList(response.data);
    });
}, []);

useEffect(() => {
    // Fetch courses
    axios.get("http://127.0.0.1:8000/core/courselist").then((response) => {
        setCourse(response.data);
    });
}, []);

const handleExaminerListChange=(e)=>{
    setSelectedExaminerList(e.target.value)
}

const handleCourseChange=(e)=>{
    setSelectedCourse(e.target.value)
}

const handleDurationChange=(e)=>{
    setSelectedDuration(e.target.value)
}
const hadnleFullMarksChange=(e)=>{
    setSelectedFullMarks(e.target.value)
}

const handleSubmit = () => {
   
    const data = {
    
    
    examiner_list:selectedExaminerList,
    course:selectedCourse,
    full_marks:selectedFullMarks,
    duration:selectedDuration,
      
      
    };
    console.log(data)
    axios.post("http://127.0.0.1:8000/core/course-examiner/", data).then((response) => {
     
      });
    }






  return (
    <div>
        <form action="">
        <div>
<label htmlFor="examinerlist">ExaminerList</label>


        
        <select id="examinerlist" value={selectedExaminerList} onChange={ handleExaminerListChange}>
          <option value="">Select examiner list</option>
          {examinerlists.map((examinerlist) => (
            <option key={examinerlist.id} value={examinerlist.id}>
                {examinerlist.sem.semester}semester {examinerlist.exam_year}
          
          
            </option>
          ))}
        </select>
      </div>
{/* course */}
<div>
<label htmlFor="courselist">Course List</label>


        
        <select id="courselist" value={selectedCourse} onChange={ handleCourseChange}>
          <option value="">Select course list</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
               {course.course_code} {course.course_name}
          
          
            </option>
          ))}
        </select>
      </div>

      {/* duration */}
      <div>
      <label htmlFor="duration">Duration</label>
      <input
        type="text"
        id="duration"
        value={selectedDuration}
        onChange={ handleDurationChange}
      />
    </div>

    {/* full marks */}
    <div>
        <label htmlFor="full_marks">Full Marks</label>
        <input type="number"
        id="full_marks"
        value={selectedFullMarks}
        onChange={hadnleFullMarksChange}
         />
    </div>



      </form>

<button onClick={handleSubmit}>Submit </button>
    </div>
  )
}

export default CourseExaminer