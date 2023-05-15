import React, { useState, useEffect } from 'react';

import axios from 'axios';
import './style.css'


function InvigilationSchedule() {
   
  

  
        const [examSchedules, setExamSchedules] = useState([]);
        const [selectedExamScheduleId, setSelectedExamScheduleId] = useState(null);
        const [courseSchedules, setCourseSchedules] = useState([]);
        const[invigilatorschedule,setInvigilatorSchedule]=useState([]);
        const [invigilatorNames, setInvigilatorNames] = useState({});
      
    
        useEffect(() => {
            fetch('http://127.0.0.1:8000/core/examscheduledetail/')
                .then(response => response.json())
                .then(data => setExamSchedules(data))
                .catch(error => console.error(error));
        }, []);

        // useEffect(() => {
        //     fetch('http://127.0.0.1:8000/core/invigilationschedule/')
        //         .then(response => response.json())
        //         .then(data => {
        //             const invigilatorNamesArr = data.map(invigilator => ({
        //                 id: invigilator.id,
        //                 name: `${invigilator.first_name} ${invigilator.last_name}`
        //             }));
                  
        //             setInvigilatorNames(invigilatorNamesArr);
        //         })
        //         .catch(error => console.error(error));
        // }, []);

        useEffect(() => {
            fetch('http://127.0.0.1:8000/core/invigilationschedule/1/')
              .then(response => response.json())
              .then(data => {
                const invigilatorNamesArr = data.map(invigilator => ({
                  id: invigilator.id,
                  name: `${invigilator.first_name} ${invigilator.last_name}`
                }));
                setInvigilatorNames(invigilatorNamesArr);
              })
              .catch(error => console.error(error));
          }, []);
             
        
    


        
    
        const handleSelectExamSchedule = (event) => {
            const examScheduleId = event.target.value;
            setSelectedExamScheduleId(examScheduleId);
            fetch(`http://127.0.0.1:8000/core/examscheduledetail/${examScheduleId}/coursescheduledetail/?format=json&expand=invigilator`)
                .then(response => response.json())
                .then(data => setCourseSchedules(data))
                .catch(error => console.error(error));
        };
        
        



       
    
        return (
            <div>
                <h1>Department of Computer Science</h1>
                
                <select value={selectedExamScheduleId} onChange={handleSelectExamSchedule}>
                    <option value="">Select an exam schedule</option>
                    {examSchedules.map(examSchedule => (
                        
                        <option key={examSchedule.id} value={examSchedule.id}>
                           {examSchedule.sem.exam_system.year} year {examSchedule.sem.semester} semester {examSchedule.exam_year}
                        </option>
                    ))}
                </select>

              
                <table className='table-container'>
                    <thead>
                        <tr>
                            <th>Exam Date</th>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Invigilator</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseSchedules.map(courseSchedule => {
                            console.log(courseSchedule.invigilator); 
                            return(
                            
                            <tr key={courseSchedule.id}>
                                <td>{new Date(courseSchedule.exam_date).toLocaleDateString('en-GB')}</td>
                                <td>{courseSchedule.course_code.course_code}</td>
                                <td>{courseSchedule.course_code.course_name}</td>
                                <td>
                             {courseSchedule.invigilator.map(invigilator => (
                                        <span key={invigilator.id}>
                                            {invigilator.first_name} {invigilator.last_name}
                                            <br />
                                        </span>
                                    ))}
                                </td>
                              
                                {/* <td>{courseSchedule.invigilator.name}</td> */}
                                <td>{courseSchedule.time}</td>
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
        );
    }
    
    
    
    
export default InvigilationSchedule;
