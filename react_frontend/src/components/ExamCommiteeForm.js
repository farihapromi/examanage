import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExamCommitteeForm() {
  const [examSystems, setExamSystems] = useState([]);
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [selectedExamSystem, setSelectedExamSystem] = useState(null);
  const [selectedCommitteeMembers, setSelectedCommitteeMembers] = useState([]);

  useEffect(() => {
    // Fetch exam systems from the backend API
    axios.get('http://127.0.0.1:8000/core/examsystemlist/')
      .then(response => {
        setExamSystems(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    // Fetch committee members from the backend API
    axios.get('http://127.0.0.1:8000/core/examcommittees/')
      .then(response => {
        setCommitteeMembers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleExamSystemChange = (event) => {
    setSelectedExamSystem(event.target.value);
  };

  const handleCommitteeMembersChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedCommitteeMembers(selectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make API request to create the exam committee
    axios.post('/api/examCommittees', {
      examSystem: selectedExamSystem,
      committeeMembers: selectedCommitteeMembers
    })
      .then(response => {
        // Handle success
        console.log(response.data);
      })
      .catch(error => {
        // Handle error
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="examSystem">Exam System:</label>
        <select id="examSystem" value={selectedExamSystem} onChange={handleExamSystemChange}>
          <option value="">Select an exam system</option>
          {examSystems.map(examSystem => (
            <option key={examSystem.id} value={examSystem.id}>{examSystem.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="committeeMembers">Committee Members:</label>
<select id="committeeMembers" multiple value={selectedCommitteeMembers} onChange={handleCommitteeMembersChange}>
{committeeMembers.map(committeeMember => (
<option key={committeeMember.id} value={committeeMember.id}>{committeeMember.name}</option>
))}
</select>
</div>
<button type="submit">Create Exam Committee</button>
</form>
);
}

export default ExamCommitteeForm;
