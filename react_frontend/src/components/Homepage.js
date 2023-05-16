// import HomePage from "../../templates/frontend/src/components/HomePage";

import React, { useState, useEffect } from 'react';

function HomePage() {
    const [examSchedules, setExamSchedules] = useState([]);
    const [selectedExamScheduleId, setSelectedExamScheduleId] = useState(null);
    const [courseSchedules, setCourseSchedules] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/core/examscheduledetail/')
            .then(response => response.json())
            .then(data => setExamSchedules(data))
            .catch(error => console.error(error));
    }, []);

    const handleSelectExamSchedule = (event) => {
        const examScheduleId = event.target.value;
        setSelectedExamScheduleId(examScheduleId);
        fetch(`http://127.0.0.1:8000/core/examscheduledetail/${examScheduleId}/coursescheduledetail/`)
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
            <table>
                <thead>
                    <tr>
                        <th>Exam Date</th>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {courseSchedules.map(courseSchedule => (
                        <tr key={courseSchedule.id}>
                            {/* <td>{courseSchedule.exam_date}</td> */}
                            <td>{new Date(courseSchedule.exam_date).toLocaleDateString('en-GB')}</td>
                            <td>{courseSchedule.course_code.course_code}</td>
                            <td>{courseSchedule.course_code.course_name}</td>
                            <td>{courseSchedule.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HomePage;
