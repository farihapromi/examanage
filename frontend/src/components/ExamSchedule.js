import React, { useState, useEffect } from "react";
import axios from "axios";

function ExamSchedule() {
  const [examSchedules, setExamSchedules] = useState([]);
  const [selectedExamSchedule, setSelectedExamSchedule] = useState("");
  const [filteredCourseSchedules, setFilteredCourseSchedules] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/core/examschedulelist/")
      .then((response) => setExamSchedules(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedExamSchedule) {
      axios.get(`http://127.0.0.1:8000/core/coursescheduledetail/?examSchedulelist=${selectedExamSchedule}`)
        .then((response) => setFilteredCourseSchedules(response.data))
       
        .catch((error) => console.error(error));
    } else {
      setFilteredCourseSchedules([]);
    }
  }, [selectedExamSchedule]);

  return (
    <div>
      <select onChange={(e) => setSelectedExamSchedule(e.target.value)}>
        <option value="">Select Exam Schedule</option>
        {examSchedules.map((schedule) => (
          <option key={schedule.id} value={schedule.id}>
            {schedule.sem.semester}
          </option>
        ))}
      </select>
      <ul>
        {filteredCourseSchedules.map((schedule) => (
          <li key={schedule.id}>{schedule.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ExamSchedule;
