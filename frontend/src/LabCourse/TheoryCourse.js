import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";
import './courseStyle.css';

function TheoryCourse() {
    const[semesters,setSemester]=useState([]);
    const[selectedSemester,setSelectedSemester]=useState([]);
    const[selectedCourseName,setSelectedCourseName]=useState([]);
    const[selectedCourseCode,setSelectedCourseCode]=useState([]);
    const[selectedcredit,setSelectedCredit]=useState([]);
 


    useEffect(() => {
        // Fetch semester from the API
        axios
          .get('http://127.0.0.1:8000/core/semester-detail-list/')
          .then((response) => {
            setSemester(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
    
      const handleSemesterChange = (e) => {
        const selectedId = e.target.value;
        setSelectedSemester(selectedId);
      };

      
  const handleCourseCodeChange = (e) => {
    setSelectedCourseCode(e.target.value);
  };

  const handleCourseNameChanage= (e) => {
    setSelectedCourseName(e.target.value);
  };
 
    
      const handleSubmit = () => {
        // Send selected member IDs to the API for saving in the Tabulator model's tabulator field
        const data = {
        
          course_name:selectedCourseName,
          course_code:selectedCourseCode,
          semester:selectedSemester,
          
          
        };
        console.log(data)
        axios.post("http://127.0.0.1:8000/core/courselist/", data).then((response) => {
            // Handle the response as needed
            //navigate .push("/CommiteeMember");
          });
        }

    
  return (
    <div className='main'>
        <h1>Create Theory Course</h1>
        <div className='container'>



<form action="">
<div >
        <label htmlFor="semester" className='class-label'>Select semester</label>&nbsp;
        <select id="semester" value={selectedSemester} onChange={handleSemesterChange}>
          <option value="">Select semester</option>
          {semesters.map((semester) => (
            <option key={semester.id} value={semester.id}>
           {semester.exam_system.year} year {semester.semester} sem
            </option>
          ))}
        </select>
      </div>

{/* for course code */}
<div className='course-code'>
      <label htmlFor="coursecode" className='class-label'>Course Code</label> &nbsp;
      <input
        type="text"
        id="coursecode"
        value={selectedCourseCode}
        onChange={handleCourseCodeChange}
      />
    </div>

{/* course name */}
<div className='course-name'>
      <label htmlFor="coursename" className='class-label'>Course Name</label>&nbsp;
      <input
        type="text"
        id="coursename"
        value={selectedCourseName}
        onChange={handleCourseNameChanage}
      />
    </div>

    </form>
    </div>

    

<button onClick={handleSubmit}>Submit </button>

    </div>
  )
}

export default TheoryCourse;