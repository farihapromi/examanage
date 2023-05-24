import React, { useState ,useEffect} from 'react'
import axios from 'axios';

function CreateLabInvigilator() {

const[courseSchedules,setCourseSchedule] =useState([]);
const[invigilators,SetInvigilator]=useState([]);
const[selectedCourseSchedule,setSelectedCourseSchedule]=useState([]);
const [selectedInvigilator,setSelectedInvigilator]=useState([]);

// courseshceudle

useEffect(() => {
    // Fetch course from the API
    axios
      .get('http://127.0.0.1:8000/core/lab-course-schedule-detail/')
      .then((response) => {
        setCourseSchedule(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



  useEffect(() => {
    // Fetch course from the API
    axios
      .get('http://127.0.0.1:8000/core/staff-list/')
      .then((response) => {
        SetInvigilator(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


const handleCourseScheduleChange = (e) => {
    setSelectedCourseSchedule(e.target.value);
  };



  const handleInvigilatorChange = (e) => {
    setSelectedInvigilator(e.target.value);
  };


  
  const handleSubmit = () => {
    // Send selected member IDs to the API for saving in the Tabulator model's tabulator field
    const data = {
    
     
  
     lab_course_schedule:selectedCourseSchedule,
      invigilator:selectedInvigilator,
      
      
    };
    console.log(data)
    axios.post("http://127.0.0.1:8000/core/lab-exam-invigilator/", data).then((response) => {
     
      });
    }



  return (
    <div>
        <h1>Create Lab Invigilator Schedule</h1>
<form action="">

{/* course schedule */}

<div >
        <label htmlFor="semester" className='class-label'>Select a course Schedule</label>&nbsp;
        <select id="semester" value={selectedCourseSchedule} onChange={handleCourseScheduleChange }>
          <option value="">Select a course schedule</option>
          {courseSchedules.map((courseschedule) => (
            <option key={courseschedule.id} value={courseschedule.id}>
          
           {courseschedule.course_code.course_code}
            </option>
          ))}
        </select>
      </div>


{/* for invigilator */}
<div >
        <label htmlFor="inivigilator" className='class-label'>Select inivigilator</label>&nbsp;
        <select id="inivigilator" value={selectedInvigilator} onChange={handleInvigilatorChange }>
          <option value="">Select inivigilator</option>
          {invigilators.map((invigilator) => (
            <option key={invigilator.id} value={invigilator.id}>
          {invigilator.first_name}    {invigilator.last_name}
            </option>
          ))}
        </select>
      </div>





</form>

<button onClick={handleSubmit}>Submit </button>
    </div>
  )
}

export default CreateLabInvigilator;