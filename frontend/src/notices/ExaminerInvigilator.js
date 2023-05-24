import React from 'react'
import { useState } from 'react'

function ExaminerInvigilator() {

    const[examiner,setExaminer]=useState([]);
    const[selectedExaminer,setSelectedExaminer]=useState([]);
    const[order,setOrder]=useState([]);

    const[course,setCourse]=useState([]);
    con
    useEffect(() => {
        // Fetch the list of courses from your backend API
        axios.get("http://127.0.0.1:8000/core/invigilator/").then(response => {
            setExaminer(response.data);
        });
      }, []);

      useEffect(() => {
        fetch('http://127.0.0.1:8000/core/lab-exam-schedule-detail/')
            .then(response => response.json())
            .then(data => setExamSchedules(data))
            .catch(error => console.error(error));
    }, []);
           
  


  return (
    <div>




    </div>
  )
}

export default ExaminerInvigilator