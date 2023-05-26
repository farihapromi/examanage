import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select'; 

const ExaminerTable = () => {
  const [examinerLists, setExaminerLists] = useState([]);
  const [selectedExaminerList, setSelectedExaminerList] = useState('');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch examiner-lists
    axios.get('http://127.0.0.1:8000/core/examiner-detail-list/')
      .then(response => {
        setExaminerLists(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleExaminerListChange = (selectedOption) => {
    setSelectedExaminerList(selectedOption);
    fetchTableData(selectedOption.value);
  };

  const fetchTableData = (examinerListId) => {
    // Fetch course details, examiners, and their orders
    axios.get(`http://127.0.0.1:8000/core/examiner-detail-list/${examinerListId}/course-examiner-detail/`)
      .then(response => {
        setTableData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <label>Select Examiner List:</label>
      <Select
        options={examinerLists.sem.exam_system.year}
        value={selectedExaminerList}
        onChange={handleExaminerListChange}
      />



      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Full Marks</th>
            <th>Duration</th>
            <th>Order</th>
            <th>Examiner</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.course.course_code}</td>
              <td>{row.course.course_name}</td>
              <td>{row.full_marks}</td>
              <td>{row.duration}</td>
              <td>{row.order}</td>
              <td>{row.examiner.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExaminerTable;
