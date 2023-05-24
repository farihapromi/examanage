import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

function FinalNotice() {
  const [examSchedules, setExamSchedules] = useState([]);
  const [selectedExamScheduleId, setSelectedExamScheduleId] = useState('');
  const [selectedExamSchedule, setSelectedExamSchedule] = useState(null);

  useEffect(() => {
    fetchExamSchedules();
  }, []);

  const fetchExamSchedules = () => {
    axios
      .get('http://127.0.0.1:8000/core/examscheduledetail/')
      .then(response => {
        setExamSchedules(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSelectExamSchedule = event => {
    const selectedId = event.target.value;
    setSelectedExamScheduleId(selectedId);

    const selectedSchedule = examSchedules.find(
      examSchedule => examSchedule.id === selectedId
    );
    setSelectedExamSchedule(selectedSchedule);
  };

  return (
    <div>
      <NavBar/>
      <select value={selectedExamScheduleId} onChange={handleSelectExamSchedule}>
        <option value="">Select an exam schedule</option>
        {examSchedules.map(examSchedule => (
          <option key={examSchedule.id} value={examSchedule.id}>
            {examSchedule.sem.exam_system.year} year {examSchedule.sem.semester} semester{' '}
            {examSchedule.exam_year}
          </option>
        ))}
      </select>

      {selectedExamSchedule && (
        <div>
          <h2>
            বিষয়ঃ {selectedExamSchedule.sem.exam_system.year}পর্ব {selectedExamSchedule.sem.semester} সেমিস্টার
            স্নাতক(সম্মান) {selectedExamSchedule.exam_year} প্রশ্নকর্তা ও পরীক্ষকের তালিকা
          </h2>
          <p>
            জনাব, কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং বিভাগের {selectedExamSchedule.sem.exam_system.year} পর্ব &nbsp;
            {selectedExamSchedule.sem.semester} সেমিস্টার স্নাতক(সম্মান) {selectedExamSchedule.exam_year}ইং সনের
            পরীক্ষার প্রশ্নকর্তা ও পরীক্ষকের তালিকা এতদসংগে সংযুক্ত করে আপনার অবগতি ও প্রয়োজনীয় ব্যবস্থা
            গ্রহণের জন্য প্রেরণ করা হলো
          </p>
          <p>ধন্যবাদান্তে,</p>
          <p>আপনার বিশ্বস্ত</p>
        </div>
      )}
    </div>
  );
}

export default FinalNotice;
