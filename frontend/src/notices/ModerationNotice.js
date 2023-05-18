import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModerationNotice() {
  const [noticeQuestionModerations, setNoticeQuestionModerations] = useState([]);
  const [selectedModeration, setSelectedModeration] = useState('');
  const [noticeQuestionModeration, setNoticeQuestionModeration] = useState(null);
  const [moderationReport, setModerationReport] = useState(null);

  useEffect(() => {
    // Fetch notice question moderations from the API
    axios
      .get('http://localhost:8000/core/ques-mod-list-detail/')
      .then((response) => {
        setNoticeQuestionModerations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleModerationChange = (e) => {
    const selectedId = e.target.value;
    setSelectedModeration(selectedId);

    // Find the selected notice question moderation
    const selected = noticeQuestionModerations.find((moderation) => moderation.id.toString() === selectedId);
    setNoticeQuestionModeration(selected);
  };



  useEffect(() => {
    if (noticeQuestionModeration) {
      // Fetch moderation report data for the selected notice question moderation
      axios
        .get(`http://localhost:8000/core/moderation-reports/?ques-mod-list-detail=${noticeQuestionModeration.id}`)
        .then((response) => {
          setModerationReport(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [noticeQuestionModeration]);

  return (
    <div>
      <select value={selectedModeration} onChange={handleModerationChange}>
        <option value="">Select a notice question moderation</option>
        {noticeQuestionModerations.map((moderation) => (
          <option key={moderation.id} value={moderation.id}>
            {moderation.sem.exam_system.year} year {moderation.sem.semester} semester {moderation.exam_year}
          </option>
        ))}
      </select>

      {noticeQuestionModeration && (
        <div>
          <h2>Notice Question Moderation</h2>
          <p>Date: {noticeQuestionModeration.date}</p>
          <p>Day: {noticeQuestionModeration.day}</p>
          <p>Time: {noticeQuestionModeration.time}</p>
          <p>Exam Year: {noticeQuestionModeration.exam_year}</p>
          <p>Semester: {noticeQuestionModeration.sem.semester}</p>
        </div>
      )}

      {moderationReport && (
        <div>
          <h2>Moderation Report</h2>
          <p>Notice Question Moderation: {moderationReport.notice_question_moderation}</p>
          <p>Present Members:</p>
          <ul>
            {moderationReport.present_members.map((member) => (
              <li key={member.id}>{member.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ModerationNotice;
