


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory ,useNavigate,Link} from "react-router-dom";
import NavBar from "../components/NavBar";

const ExamCommitteeForm = () => {
  const navigate = useNavigate(); 

  const [examSystems, setExamSystems] = useState([]);
  const [selectedExamSystem, setSelectedExamSystem] = useState("");
  const [committeeMembers, setCommitteeMembers] = useState([]);
  // const [selectedMembers, setSelectedMembers] = useState([]);
  // const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState(Array(5).fill(""));
   const [selectedRoles, setSelectedRoles] = useState(Array(5).fill(""));
  const [examYear, setExamYear] = useState(""); // Step 1
 
  useEffect(() => {
    // Fetch committee members from the API
    axios.get("http://127.0.0.1:8000/core/staff-list/").then((response) => {
      setCommitteeMembers(response.data);
    });
  }, []);

  useEffect(() => {
    // Fetch exam systems and committee members from the API
    axios.get("http://127.0.0.1:8000/core/examsystemlist/").then((response) => {
      setExamSystems(response.data);
    });

    
  }, []);

  
  const handleMemberChange = (e, index) => {
    const membersCopy = [...selectedMembers];
    membersCopy[index] = e.target.value;
    setSelectedMembers(membersCopy);
  };

  const handleRoleChange = (e, index) => {
    const rolesCopy = [...selectedRoles];
    rolesCopy[index] = e.target.value;
    setSelectedRoles(rolesCopy);
  };





  const handleExamSystemChange = (e) => {
    setSelectedExamSystem(e.target.value);
  };

  const handleExamYearChange = (e) => {
    setExamYear(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create the exam committee using the selected values
    navigate('/committee-member');

    const data = {
      exam_system: selectedExamSystem,
      exam_year: examYear,
      // committee_members: selectedMembers.map((member, index) => ({
      //   member: member,
      //   role: selectedRoles[index]
      // })
      // )
     // Replace with the selected exam year
    
    };

    axios.post("http://127.0.0.1:8000/core/exam-committees/", data).then((response) => {
      // Handle the response as needed
      //navigate .push("/CommiteeMember");
    });
  };

  return (
  <div>
    {/* start */}
    <NavBar/>
    {/* end */}




    <h1>Create Exam Commitee</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="examSystem">Exam System:</label>
        <select
          id="examSystem"
          value={selectedExamSystem}
          onChange={handleExamSystemChange}
        >
          <option value="">Select an exam system</option>
          {examSystems.map((examSystem) => (
            <option key={examSystem.id} value={examSystem.id}>
              {examSystem.year}
            </option>
          ))}
        </select>
      </div>
      <br />

      {/* for member */}
      {/* {[...Array(4)].map((_, index) => ( 
        <div key={index}>
          <label htmlFor={`member-${index}`}>Member:</label>
          <select
            id={`member-${index}`}
            value={selectedMembers[index] || ""}
            onChange={(e) => handleMemberChange(e, index)}
          >
            <option value="">Select a member</option>
            {committeeMembers.map((member, index) => (
              <option key={index} value={member.email}>
                {member.first_name} {member.last_name}
              </option>
            ))}
          </select>

          <label htmlFor={`role-${index}`}>Role:</label>
          <select
            id={`role-${index}`}
            value={selectedRoles[index] || ""}
            onChange={(e) => handleRoleChange(e, index)}
          >
            <option value="">Select a role</option>
            <option value="chairman">Chairman</option>
            <option value="member">Member</option>
            <option value="external">External</option>
          </select>
        </div>
      ))} */}

<br />
      <div>
      <label htmlFor="examYear">Exam Year:</label>
      <input
        type="text"
        id="examYear"
        value={examYear}
        onChange={handleExamYearChange}
      />
    </div>
    <br />
    <div>
  <button type="submit">Create Exam Committee</button>
  <Link to="/committee-member"></Link>
</div>


{/*      
    <button type="submit">Create Exam Committee</button>
     
      <Link to="/committee-member">
     
        </Link>  */}

    </form>


    </div>
  );
};

export default ExamCommitteeForm;


