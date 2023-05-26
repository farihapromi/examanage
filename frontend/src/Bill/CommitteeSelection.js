import React, { useState, useEffect } from 'react';

const CommitteeSelection = () => {
  const [committees, setCommittees] = useState([]);
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [committeeMembers, setCommitteeMembers] = useState([]);

  useEffect(() => {
    // Fetch the list of committees
    fetch('http://localhost:8000/core/committee-detail/')
      .then(response => response.json())
      .then(data => setCommittees(data));
  }, []);

  useEffect(() => {
    if (selectedCommittee) {
      // Fetch the members of the selected committee
      fetch(`http://localhost:8000/core/committee-members-detail/${selectedCommittee.id}`)
        .then(response => response.json())
        .then(data => setCommitteeMembers(data));
    }
  }, [selectedCommittee]);

  return (
    <div>
      <label>Select Committee:</label>
      <select
        value={selectedCommittee ? selectedCommittee.id : ''}
        onChange={e => {
          const committeeId = e.target.value;
          const committee = committees.find(c => c.id === committeeId);
          setSelectedCommittee(committee);
        }}
      >
        <option value="">-- Select --</option>
        {committees.map(committee => (
          <option key={committee.id} value={committee.id}>
            {committee.sem.exam_system.year}
          </option>
        ))}
      </select>

      {selectedCommittee && (
        <div>
          <h3>Selected Committee: {selectedCommittee.name}</h3>

          <h4>Chairman:</h4>
          <select>
            {committeeMembers
              .filter(member => member.role === 'chairman')
              .map(member => (
                <option key={member.id} value={member.id}>
                  {member.committee_members.first_name}
                </option>
              ))}
          </select>

          {/* Render other committee members as needed */}
        </div>
      )}
    </div>
  );
};

export default CommitteeSelection;
