import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormFinal= () => {
  const [examResponsibilities, setExamResponsibilities] = useState([]);
  const [selectedExamResponsibility, setSelectedExamResponsibility] = useState(null);
  const [labExamInvigilationId, setLabExamInvigilationId] = useState(null);
  const [otherData, setOtherData] = useState([]);

  useEffect(() => {
    fetchExamResponsibilities();
  }, []);

  const fetchExamResponsibilities = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/core/exam-responsibilities');
      const examResponsibilities = response.data;
      setExamResponsibilities(examResponsibilities);
    } catch (error) {
      console.error('Error fetching exam responsibilities:', error);
    }
  };

  const handleExamResponsibilityChange = (event) => {
    const selectedId = event.target.value;
    const selectedResponsibility = examResponsibilities.find(
      (responsibility) => responsibility.id === selectedId
    );
    setSelectedExamResponsibility(selectedResponsibility);
    if (selectedResponsibility) {
      const labExamInvigilationId = selectedResponsibility.lab_exam_invigilation_schedule;
      setLabExamInvigilationId(labExamInvigilationId);
      fetchOtherData(labExamInvigilationId);
    }
  };

  const fetchOtherData = async (labExamInvigilationId) => {
    try {
      const url = `http://127.0.0.1:8000/core/lab-exam-schedule-detail/${labExamInvigilationId}/lab-course-schedule-detail/`;
      const response = await axios.get(url);
      const otherData = response.data;
      setOtherData(otherData);
    } catch (error) {
      console.error('Error fetching other data:', error);
    }
  };

  return (
    <div>
      <select onChange={handleExamResponsibilityChange}>
        {examResponsibilities.map((examResponsibility) => (
          <option key={examResponsibility.id} value={examResponsibility.id}>
            {examResponsibility.exam_year}  
      {examResponsibility.sem.semester}   semester        </option>
        ))}
      </select>
      {selectedExamResponsibility && (
        <div>
          Lab Exam Invigilation Schedule: {selectedExamResponsibility.lab_exam_invigilation_schedule}
        </div>
      )}
      {otherData && (
        <div>
          Other Data:
          <ul>
            {otherData.map((data) => (
              <li key={data.id}>{data.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default  FormFinal;
