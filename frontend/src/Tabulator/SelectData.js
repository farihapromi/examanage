import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SelectData() {
  const [examBills, setExamBills] = useState([]);

  useEffect(() => {
    // Fetch exam bills from the API
    axios.get("http://127.0.0.1:8000/core/exam-bills/")
      .then((response) => {
        // Assuming the response data is an array of exam bill objects
        const examBillsData = response.data;
        setExamBills(examBillsData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <p>Exam Details:</p>
      <ul>
        {examBills.map((examBill) => (
          <li key={examBill.id}>
            Examiner: {examBill.examiner}<br />
            Semester: {examBill.sem}<br />
            Exam Year: {examBill.exam_year}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectData;
