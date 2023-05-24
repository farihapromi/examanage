import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import NavBar from "../components/NavBar";

function QuestionMod() {
  const [examCommittee, setExamCommittee] = useState([]);
  const [sem, setSem] = useState([]);
  const [formData, setFormData] = useState({
    exam_committee: "",
    date: "",
    day: "",
    time: "",
    exam_year: "",
    sem: "",
  });

  useEffect(() => {
    // Fetch exam committee from the API
    axios
      .get("http://127.0.0.1:8000/core/committee-detail/")
      .then((response) => {
        setExamCommittee(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Fetch semester from the API
    axios
      .get("http://127.0.0.1:8000/core/semester-detail-list/")
      .then((response) => {
        setSem(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8000/core/quesmodlist/", formData)
      .then((response) => {
        console.log(response.data);
        console.log(formData)
        setFormData({
          exam_committee: "",
          date: "",
          day: "",
          time: "",
          exam_year: "",
          sem: "",
         
        });
        
        // TODO: Handle successful form submission
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>

<NavBar/>

      <form onSubmit={handleSubmit}>
        <label htmlFor="exam_committee">Exam Committee:</label>
        <select
          id="exam_committee"
          name="exam_committee"
          value={formData.exam_committee}
          onChange={handleInputChange}
          required
        >
          <option value="">Select an exam committee</option>
          {examCommittee.map((examcommittee) => (
            <option key={examcommittee.id} value={examcommittee.id}>
              {examcommittee.exam_system.year} year {examcommittee.exam_year}
            </option>
          ))}
        </select>
        <br />

        <label htmlFor="sem">Semester:</label>
        <select
          id="sem"
          name="sem"
          value={formData.sem}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a semester</option>
          {sem.map((semester) => (
            <option key={semester.id} value={semester.id}>
              {semester.exam_system.year} year {semester.semester} sem 
            </option>
          ))}
        </select>
        <br />

        <label htmlFor="date">Exam Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
<br />
        <label htmlFor="day">Day:</label>
        <input
          type="text"
          id="day"
          name="day"
          value={formData.day}
          onChange={handleInputChange}
        />

<br />
        <label htmlFor="time">Time:</label>
        <input
          type="text"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="exam_year">Exam Year:</label>
        <input
  type="text"
  id="exam_year"
  name="exam_year"
  value={formData.exam_year}
  onChange={handleInputChange}
  required
/>
<br />

<button type="submit">Submit</button>
</form>
</div>
);
}

export default QuestionMod;
