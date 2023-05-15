import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyInvigilator() {
   

    
        const [examSchedules, setExamSchedules] = useState([]);
        const [selectedExamScheduleId, setSelectedExamScheduleId] = useState(null);
        const [courseSchedules, setCourseSchedules] = useState([]);
    
        useEffect(() => {
            axios.get('http://127.0.0.1:8000/core/examschedules/')
                .then(response => {
                    setExamSchedules(response.data);
                })
                .catch(error => console.error(error));
        }, []);
    
        const handleSelectExamSchedule = (event) => {
            const examScheduleId = event.target.value;
            setSelectedExamScheduleId(examScheduleId);
            axios.get(`http://127.0.0.1:8000/core/examschedules/${examScheduleId}/coursescheduledetail/`)
                .then(response => {
                    setCourseSchedules(response.data.course_schedule);
                })
                .catch(error => console.error(error));
        };
    
        return (
            <div>
                <h1>Department of Computer Science</h1>
                <select value={selectedExamScheduleId} onChange={handleSelectExamSchedule}>
                    <option value="">Select an exam schedule</option>
                    {examSchedules.map(examSchedule => (
                        <option key={examSchedule.id} value={examSchedule.id}>
                            {examSchedule.sem} - {examSchedule.exam_year}
                        </option>
                    ))}
                </select>
                <table>
                    <thead>
                        <tr>
                            <th>Exam Date</th>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Invigilators</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseSchedules.map(courseSchedule => (
                            <tr key={courseSchedule.id}>
                                <td>{courseSchedule.exam_date}</td>
                                <td>{courseSchedule.course_code}</td>
                                <td>{courseSchedule.course_code.course_name}</td>
                                <td>
                                    {courseSchedule.invigilator.map(invigilator => (
                                        <span key={invigilator.id}>
                                            {invigilator.invigilator.first_name} {invigilator.invigilator.last_name}
                                            <br />
                                        </span>
                                    ))}
                                </td>
                                <td>{courseSchedule.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
    
  
    export default MyInvigilator;
