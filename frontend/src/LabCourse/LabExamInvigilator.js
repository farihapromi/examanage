import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react';

function LabExamInvigilator() {
    const[semesters,setSemester] =useState([]);

    const[selectedSemester,setSelectedSemester]=useState([]);

    const[examiners,setExaminer]=useState([]);
    const[selectedExaminer,setSelectedExaminer]=useState([]);

    const [examyear,setExamyear]=useState([]);
    const[selectedExamYear,setSelectedExamyear]=useState([]);

    const[roles,setRole]=useState([]);
    const[selectedRole,setSelectedRole]=useState([]);

    const[order,setOrder]=useState([]);
    const[selectedOrder,setSelectedOrder]=useState('');
    const[courseExaminers,setCourseExaminer]=useState([]);
    const[selectedCourseExaminer,setSelectedCourseExaminer]=useState('');





    useEffect(() => {
        // Fetch semester from the API
        axios
          .get('http://127.0.0.1:8000/core/course-examiner-detail/')
          .then((response) => {
        
            setCourseExaminer(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

// for roles type

useEffect(() => {
   
    axios
      .get('http://127.0.0.1:8000/core/staff-list/')
      .then((response) => {
        setExaminer(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



    
      const handleCourseExaminerChange = (e) => {
       
        setSelectedCourseExaminer(e.target.value);
      };

const handleExaminerChange =(e) => {
  
  setSelectedExaminer(e.target.value);
  };


  const handleOrderChange=(e) => {
  
    setSelectedOrder(e.target.value);
  };



  const handleSubmit = () => {
    // Send selected member IDs to the API for saving in the Tabulator model's tabulator field
    const data = {
    
     
      // sem:selectedSemester,
      // exam_year:selectedExamYear,

      course_examiner:selectedCourseExaminer,
      order:selectedOrder,
      examiner:selectedExaminer,
     
     
      
      
    };
    console.log(data)
    axios.post("http://127.0.0.1:8000/core/examiner/", data).then((response) => {
     
      });
    }



  return (
    <div>

<h1>Lab Exam invigilator Schedule</h1>

        <form action="">

        <div >
        <label htmlFor="courseExaminer" className='class-label'>Course Examiner</label>&nbsp;
        <select id="courseExaminer" value={selectedCourseExaminer} onChange={ handleCourseExaminerChange }>
          <option value="">Select Course Examiner</option>
          {courseExaminers.map((courseExaminer) => (
            <option key={courseExaminer.id} value={courseExaminer.id}>
       {courseExaminer.examiner_list.sem.exam_system.year} year  {courseExaminer.examiner_list.sem.semester} semester  {courseExaminer.course.course_code}
            </option>
          ))}
        </select>
      </div>

      <div >

<label htmlFor="role" className='class-label'>order</label>&nbsp;
<input
 type="text" 
 value={selectedOrder}
 onChange={handleOrderChange}
 
 />

</div>
      {/* examiner */}
      <div >
        <label htmlFor="Examiner" className='class-label'>Examiner</label>&nbsp;
        <select id="Examiner" value={selectedExaminer} onChange={handleExaminerChange }>
          <option value="">Select Examiner</option>
          {examiners.map((examiner) => (
            <option key={examiner.id} value={examiner.id}>
        {examiner.first_name} {examiner.last_name}
            </option>
          ))}
        </select>
      </div>

    
{/* order */}



  




      <button onClick={handleSubmit}>Submit </button>
        </form>
    </div>
  )
}

export default LabExamInvigilator