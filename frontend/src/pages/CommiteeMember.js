
import React, { useEffect, useState } from "react";
import axios from "axios";

const MyComponent = () => {
  const [committeeMembers, setCommitteeMembers] = useState([]);
 
  const[examCommittee,setExamCommitee]= useState([]);
 
  const [selectedExamCommittee, setSelectedExamCommittee] = useState("");
 
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    

    //  date:"",
  
    exam_committee:"",
   
    committee_members:"",
    role:"",

    
    //  time:""
   
    });
    const [submittedData, setSubmittedData] = useState(null);


  useEffect(() => {
    // Fetch committee members from the API
    axios.get("http://127.0.0.1:8000/core/staff-list/").then((response) => {
      setCommitteeMembers(response.data);
    });
  }, []);

  useEffect(() => {
    // Fetch exam systems from the API
    axios.get("http://127.0.0.1:8000/core/committee-detail/").then((response) => {
      setExamCommitee(response.data);
    });
  }, []);
  const handleStaffChange = (e) => {
    setSelectedStaff(e.target.value);
  };
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission with the selected staff
  //   console.log(selectedStaff);
  // };


  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object with the data to submit
    const formData = {
     
      exam_committee: selectedExamCommittee,
      committee_members: selectedStaff,
      role: selectedRole,
    };

    // Post the data to the API endpoint
    axios.post("http://127.0.0.1:8000/core/committee-members/", formData
    )
      .then((response) => {
        // Handle the response if needed
        // console.log(response.data);
        setSubmittedData(response.data);
      
        setFormData({
          exam_committee:"",
   
          committee_members:"",
          role:"",
  
          });
        
      })
     
     
      .catch((error) => {
        // Handle errors if any
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Create Exam Commitee Member</h1>
      <form onSubmit={handleSubmit}>
      
        <label htmlFor="examCommittee">Exam Committee:</label>
        <select
          id="examCommittee"
          value={selectedExamCommittee}
          onChange={(e) => setSelectedExamCommittee(e.target.value)}
        >
          <option value="">Select an exam committee</option>
          {examCommittee.map((examcommittee) => (
            <option key={examcommittee.id} value={examcommittee.id}>
              {examcommittee.exam_system.year} year {examcommittee.exam_year}
            </option>
          ))}
        </select>
        <label htmlFor="staffName">Staff Name:</label>
        <select
          id="staffName"
          value={selectedStaff}
          onChange={handleStaffChange}
        >
          <option value="">Select a staff</option>
          {committeeMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.first_name} {member.last_name}
            </option>
          ))}
        </select>

      
        <div>
        <label htmlFor="role">Role:</label>
        <select id="role" value={selectedRole} onChange={handleRoleChange}>
          <option value="">Select a role</option>
          <option value="chairman">Chairman</option>
          <option value="member">Member</option>
          <option value="external">External</option>
        </select>
      </div>
        <button type="submit">Submit</button>
      </form>
      {/* showing submitted data */}
      
      {submittedData && (
  <div style={{ textAlign: "center" }}>
    <h2>Selected Data</h2>
    <p>
      Exam Committee:{" "}
      {examCommittee.find((item) => item.id === submittedData.exam_committee)?.exam_system.year} year
    </p>
    <p>
      Committee Member:{" "}
      {committeeMembers.find((item) => item.id === submittedData.committee_members)?.first_name}{" "}
      {committeeMembers.find((item) => item.id === submittedData.committee_members)?.last_name}
    </p>
    <p>Role: {submittedData.role}</p>
  </div>
)}



    </div>
  );
};

export default MyComponent;




// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CommiteeMember = () => {
//   const [committeeMembers, setCommitteeMembers] = useState([]);
//   const [selectedMembers, setSelectedMembers] = useState([]);
//   const [selectedRoles, setSelectedRoles] = useState([]);
//   const [selectedExamCommittee, setSelectedExamCommittee] = useState("");
//   const[examCommitee,SetExamCommitee]= useState("");
//   useEffect(() => {
//     // Fetch committee members from the API
//     axios.get("http://127.0.0.1:8000/core/exam-committees/").then((response) => {
//       setSelectedExamCommittee(response.data);
//     });
//   }, []);


//   useEffect(() => {
//     // Fetch committee members from the API
//     axios.get("http://127.0.0.1:8000/teachers/staff-list/").then((response) => {
//       setCommitteeMembers(response.data);
//     });
//   }, []);

//   const handleMemberChange = (e, index) => {
//     const membersCopy = [...selectedMembers];
//     membersCopy[index] = e.target.value;
//     setSelectedMembers(membersCopy);
//   };

//   const handleRoleChange = (e, index) => {
//     const rolesCopy = [...selectedRoles];
//     rolesCopy[index] = e.target.value;
//     setSelectedRoles(rolesCopy);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Create the exam committee using the selected values
//     const data = {
//       // exam_system: examCommitee,
//       // exam_year: examYear,
//       committee_members: selectedMembers.map((member, index) => ({
//         member: member,
//         role: selectedRoles[index]
//       }))
//     };

//     axios
//       .post("http://127.0.0.1:8000/core/committee-members/", data)
//       .then((response) => {
//         // Handle the response as needed
//       });
//   };
//   const handleECommitteChange = (e) => {
//     setSelectedExamCommittee(e.target.value);
//   };


//   return (
//     <form onSubmit={handleSubmit}>
//        {/* <div>
//         <label htmlFor="examSystem">Exam System:</label>
//         <select
//           id="examSystem"
//           value={selectedExamCommittee}
//           onChange={handleECommitteChange}
//         >
//           <option value="">Select an exam system</option>
//           {examCommitee.map((examSystem) => (
//             <option key={examSystem.id} value={examSystem.id}>
//               {examSystem.year}
//             </option>
//           ))}
//         </select>
//       </div> */}
//       {committeeMembers ?.map((member, index) => (
//         <div key={index}>
//           <label htmlFor={`member-${index}`}>Member:</label>
//           <select
//             id={`member-${index}`}
//             value={selectedMembers[index] || ""}
//             onChange={(e) => handleMemberChange(e, index)}
//           >
//             <option value="">Select a member</option>
//             {committeeMembers.map((member, index) => (
//               <option key={index} value={member.email}>
//                 {member.first_name} {member.last_name}
//               </option>
//             ))}
//           </select>

//           <label htmlFor={`role-${index}`}>Role:</label>
//           <select
//             id={`role-${index}`}
//             value={selectedRoles[index] || ""}
//             onChange={(e) => handleRoleChange(e, index)}
//           >
//             <option value="">Select a role</option>
//             <option value="chairman">Chairman</option>
//             <option value="member">Member</option>
//             <option value="external">External</option>
//           </select>
//         </div>
//       ))}
      
//       <button type="submit">Create Exam Committee</button>
//     </form>
//   );
// };

// export default CommiteeMember;
