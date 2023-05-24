import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExamResponsibilityForm = () => {
  const [examResponsibilities, setExamResponsibilities] = useState([]);
  const [selectedResponsibility, setSelectedResponsibility] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [staffMembers, setStaffMembers] = useState([]);
  const [staffPresent, setStaffPresent] = useState(false);
  const [departmentShortcode, setDepartmentShortcode] = useState('');

  useEffect(() => {
    // Fetch the list of exam responsibilities from the server
    axios.get("http://127.0.0.1:8000/core/exam-responsibility-detail/")
      .then((response) => {
        setExamResponsibilities(response.data);
      });
  }, []);

  // Fetch staff members from the API
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/core/staff-list/")
      .then((response) => {
        setStaffMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching staff members:", error);
      });
  }, []);

  const handleStaffChange = (e) => {
    setSelectedStaff(e.target.value);
  };

  const handleResponsibilityChange = (event) => {
    const responsibilityId = event.target.value;
    setSelectedResponsibility(responsibilityId);
  };

//   useEffect(() => {
//     if (selectedResponsibility && selectedStaff) {
//       // Fetch the ModerationReport for the selected ExamResponsibility
//       axios.get(`http://127.0.0.1:8000/core/moderation-reports-detail/${selectedResponsibility}/`)
//         .then((response) => {
//           const moderationReport = response.data;
//           // Check if the selected staff is in the present_members field
//           const isStaffPresent = moderationReport.present_members.some((member) => member.id === selectedStaff);
         
//           setStaffPresent(isStaffPresent);
//         });
//     }
//   }, [selectedResponsibility, selectedStaff]);


  useEffect(() => {
    if (selectedResponsibility && selectedStaff) {
      axios.get(`http://127.0.0.1:8000/core/moderation-reports-detail/${selectedResponsibility}/`)
        .then((response) => {
          const moderationReport = response.data;
         // const isStaffPresent = moderationReport.present_members.some((member) => member.id === parseInt(selectedStaff));
          const isStaffPresent = moderationReport.present_members.some((member) => member && member.id === parseInt(selectedStaff));
          //const isStaffPresent = moderationReport.present_members && moderationReport.present_members.some((member) => member && member.id === parseInt(selectedStaff));

          setStaffPresent(isStaffPresent);

          if (isStaffPresent) {
            const examResponsibilityId = moderationReport.exam_responsibility.id;
            axios.get(`http://127.0.0.1:8000/core/exam-responsibility-detail/${examResponsibilityId}/`)
              .then((response) => {
                const examResponsibility = response.data;
                const departmentShortcode = examResponsibility.department.shortcode;
                setDepartmentShortcode(departmentShortcode);
              });
          }
        });
    }
  }, [selectedResponsibility, selectedStaff]);



  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="responsibility">Exam Responsibility:</label>
        <select
          id="responsibility"
          value={selectedResponsibility}
          onChange={handleResponsibilityChange}
        >
          <option value="">Select Exam Responsibility</option>
          {examResponsibilities.map((responsibility) => (
            <option key={responsibility.id} value={responsibility.id}>
              Final Report {responsibility.sem.exam_system.year} year {responsibility.sem.semester} sem
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="staffName">Examiner:</label>
        <select
          id="staffName"
          value={selectedStaff}
          onChange={handleStaffChange}
        >
          <option value="">Select Staff</option>
          {staffMembers.map((staffMember) => (
            <option key={staffMember.id} value={staffMember.id}>
              {staffMember.first_name} {staffMember.last_name}
            </option>
          ))}
        </select>
      </div>

      {selectedStaff && selectedResponsibility && (
  <div>
    {staffPresent ? (
      <p>Selected staff is present in the ModerationReport.</p>
    ) : (
      <p>Selected staff is not present in the ModerationReport.</p>
    )}
  </div>

  
)}
 {/* <div>Selected Responsibility: {selectedResponsibility}</div>
      <div>Selected Staff: {selectedStaff}</div>
      <div>Staff Present: {staffPresent ? 'Yes' : 'No'}</div>
      <div>Department Shortcode: {departmentShortcode}</div> */}

      
      <button type="submit">Submit</button>
    </form>
  );
};

export default ExamResponsibilityForm;
