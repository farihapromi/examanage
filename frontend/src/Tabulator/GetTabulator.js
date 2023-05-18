import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetTabulator() {
  const [examCommittees, setExamCommittees] = useState([]);
  const [selectedCommittee, setSelectedCommittee] = useState('');
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const[semesters,setSemester]=useState([]);
  const[selectedSemester,setSelectedSemester]=useState([]);
 
  const[studentNum,setStudentNum]= useState(null);


  useEffect(() => {
    // Fetch exam committees from the API
    axios
      .get('http://127.0.0.1:8000/core/committee-detail/')
      .then((response) => {
        setExamCommittees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // semester

  useEffect(() => {
    // Fetch semester from the API
    axios
      .get('http://127.0.0.1:8000/core/semester-detail-list/')
      .then((response) => {
        setSemester(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    if (selectedCommittee) {
      fetchCommitteeMembers(selectedCommittee);
    } else {
      setCommitteeMembers([]);
    }
  }, [selectedCommittee]);

  const fetchCommitteeMembers = (committeeId) => {
    axios
      .get(`http://127.0.0.1:8000/core/exam-committees/${committeeId}/committee-members-detail/`)
      .then((response) => {
        setCommitteeMembers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCommitteeChange = (e) => {
    const selectedId = e.target.value;
    setSelectedCommittee(selectedId);
  };

  const handleSemesterChange = (e) => {
    const selectedId = e.target.value;
    setSelectedSemester(selectedId);
  };

  const handleMemberSelection = (memberId) => {
    const isSelected = selectedMembers.includes(memberId);

    if (isSelected) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  const handleMemberChange = (e, memberId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedMembers((prevSelectedMembers) => [
        ...prevSelectedMembers,
        memberId,
      ]);
    } else {
      setSelectedMembers((prevSelectedMembers) =>
        prevSelectedMembers.filter((id) => id !== memberId)
      );
    }
  };
  const handaleStudentChange=(e)=>
{   const selectedId = e.target.value;
  setStudentNum(selectedId )
} 

  const handleSubmit = () => {
    // Send selected member IDs to the API for saving in the Tabulator model's tabulator field
    const data = {
      exam_committee: selectedCommittee,
      tabulator: selectedMembers.length > 0 ? selectedMembers[0] : null,
      examinee_no:studentNum,
      sem:selectedSemester,
    };
    console.log(data)

    axios
      .post('http://127.0.0.1:8000/core/tabulators/', data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <label htmlFor="committee">Select an exam committee:</label>
        <select id="committee" value={selectedCommittee} onChange={handleCommitteeChange}>
          <option value="">Select an exam committee</option>
          {examCommittees.map((committee) => (
            <option key={committee.id} value={committee.id}>
           {committee.exam_system.year} year {committee.exam_year}semester {committee.exam_year}
            </option>
          ))}
        </select>
      </div>
      {/* {/* for semester */}
      <div>
        <label htmlFor="semester">Select semester</label>
        <select id="semester" value={selectedSemester} onChange={handleSemesterChange}>
          <option value="">Select semester</option>
          {semesters.map((semester) => (
            <option key={semester.id} value={semester.id}>
           {semester.exam_system.year} year {semester.semester} sem
            </option>
          ))}
        </select>
      </div>

      {/* <div>
      <label htmlFor="semester">Select semester</label>
      <select id="semester" value={selectedSemester} onChange={handleSemesterChange}>
        <option value="">Select semester</option>
        {semesters
          .filter((semester) => semester.exam_system === selectedCommittee.exam_system) // Filter semesters based on selected exam committee
          .map((semester) => (
            <option key={semester.id} value={semester.id}>
              {semester.exam_system.year} year {semester.semester} sem
            </option>
          ))}
      </select>
    </div> */}



      <div>
        <p>Exam Committee Members:</p>
        {/* {committeeMembers.map((member) => (
          <div key={member.id}>
            <input
              type="checkbox"
              id={member.id}
              value={member.id}
              checked={selectedMembers.includes(member.id)}
              onChange={() => handleMemberSelection(member.id)}
            />
            <label htmlFor={member.id}>{member.first_name}</label>
          </div>
        ))} */}
 {committeeMembers.map((member) => (
          <div key={member.committee_members.id} >
            <input
      type="radio"
      value={member.committee_members.id}
      id={`member-${member.id}`}
      name="selectedMember"
      // checked={selectedMembers === member.id}
      checked={selectedMembers.includes(member.id)}
      onChange={() => handleMemberSelection(member.id)}
    />
            <label htmlFor={`member-${member.id}`}>
              {member.committee_members.first_name} {member.committee_members.last_name}
            </label>
          </div>
        ))}


      </div>
      {/* Student */}
      
<div>
    <label htmlFor="student_num">Student Number</label>
   
    <input 
    type="number" 
  
    id="student_num"
    name="student_num"
    value={studentNum}
    onChange={handaleStudentChange}
    placeholder="Enter Number of Students"
  />
</div>
<br />


      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default GetTabulator;
