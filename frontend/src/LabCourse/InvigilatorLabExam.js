import React, { useState ,useEffect} from 'react'
import axios from 'axios';

function InvigilatorLabExam() {
    const[labCourseSchedules,setLabCourseSchedule]= useState([]);
    const[selectedLabCourseSchedule,setSelectedLabCourseSchedule]=useState([]);

    const[invigilators,setInvigilator]=useState([]);
    const[selectedInvigilator,setSelectedInvigilator]=useState([]);

    //lacourse


    useEffect(() => {
        // Fetch the list of courses from your backend API
        axios.get("http://127.0.0.1:8000/core/labcourselist/",).then(response => {
            setLabCourseSchedule(response.data);
        });
      }, []);

      //invigilator

      useEffect(() => {
        // Fetch the list of courses from your backend API
        axios.get("http://127.0.0.1:8000/core/staff-list/",).then(response => {
            setInvigilator(response.data);
        });
      }, []);

      const handleLabCourseChange = (e) => {
        setSelectedLabCourseSchedule(e.target.value);
      };
    
      const handleInvigilatorChange =(e)=>{
        setSelectedInvigilator(e.target.value);
      }
    
     


  return (
    <div>
<h1> Lab Exam Invigilator</h1>
{/* lab courses schedule */}
<form action="">

<div >
        <label htmlFor="labCourseSchedule" className='class-label'>Select a lab course schedule</label>&nbsp;
        <select id="labCourseSchedule" value={selectedLabCourseSchedule} onChange={handleLabCourseChange}>
          <option value="">Select a course examiner</option>
          {labCourseSchedules.map((labCourseSchedule) => (
            <option key={labCourseSchedule.id} value={labCourseSchedule.id}>
          {labCourseSchedule.course_code}
            </option>
          ))}
        </select>
      </div>



      {/* invigilator */}
      <div >
        <label htmlFor="invigilator" className='class-label'>Select Invigilator</label>&nbsp;
        <select id="invigilator" value={selectedInvigilator} onChange={handleInvigilatorChange}>
          <option value="">Select a Invigilator</option>
          {invigilators.map((invigilator) => (
            <option key={invigilator.id} value={invigilator.id}>
          {invigilator.first_name}
            </option>
          ))}
        </select>
      </div>






</form>




    </div>
  )
}

export default InvigilatorLabExam