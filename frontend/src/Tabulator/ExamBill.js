
import React, { useEffect, useState } from "react";
import axios from "axios";

const Exambill = () => {
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const[examResponses,setExamResponse]=useState([]);
 
  // const[examCommittee,setExamCommitee]= useState([]);
  // const[examYear,setExamYear]=useState([]);
  // const[selectedExamyear,setSelectedExamyear]=useState('');
  // const [selectedStaffId, setSelectedStaffId] = useState('');
  // const [selectedResponse, setSelectedResponse] = useState("");
 
  const [selectedStaff, setSelectedStaff] = useState("");
 
  
 



  const[selectedExamResponse,setSelectedExamResponse]=useState("");

const [formData, setFormData] = useState({
    
    exam_responsibility:"",
    examiner:" ",
   
   
    });
    const [submittedData, setSubmittedData] = useState(null);


    useEffect(() => {
        // Fetch committee members from the API
        axios.get("http://127.0.0.1:8000/core/staff-list/").then((response) => {
          setStaffMembers(response.data);
        });
      }, []);
     
      useEffect(() => {
        // Fetch exam responsibilitu from the API
        axios.get("http://127.0.0.1:8000/core/exam-responsibility-detail/").then((response) => {
            setExamResponse(response.data);
        });
      }, []);



      


 const handleExamResponseChange= (e) => {
    setSelectedExamResponse(e.target.value);
  };


  const handleStaffChange = (e) => {
    setSelectedStaff(e.target.value);
  };




  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object with the data to submit
    const formData = {
   
    exam_responsibility:selectedExamResponse,
    examiner:selectedStaff,
   
   
   


    };
    console.log(formData)
    

    // Post the data to the API endpoint
    axios.post("http://127.0.0.1:8000/core/exam-bills/", formData,
    )
      .then((response) => {
        // Handle the response if needed
        // console.log(response.data);
        setSubmittedData(response.data);
      
        setFormData({
    
    exam_responsibility:"",
    examiner:" ",
    
   
  
          });
        
      })
     
     
      .catch((error) => {
        // Handle errors if any
        console.error(error.response);
      });
  };

  return (
    <div>

<h1>Exam Responsibilty</h1>
<div>

      <form onSubmit={handleSubmit}>


      {/* ecam responsibility */}
      <label htmlFor="exam-responsibilty">Exam responsibilty</label>
        <select
          id="exam-responsibility"
          value={selectedExamResponse}
          onChange={ handleExamResponseChange}
        >
          <option value="">Select exam resposnibilty</option>
          {examResponses.map((examresponse) => (
            <option key={examresponse.id} value={examresponse.id}>
          Final Report {examresponse.sem.exam_system.year} year {examresponse.sem.semester} sem
            </option>
          ))}
        </select>

        
        <br />
        <br />
        <br />
        {/* for staff */}
        <label htmlFor="staffName">Examiner</label>
        <select
          id="staffName"
          value={selectedStaff}
          onChange={handleStaffChange}
        >
          
          {staffMembers.map(staffMember => (
    <option key={staffMember.id} value={staffMember.id}>
     {staffMember.first_name} {staffMember.last_name}
      
    </option>
  ))}
        </select> 

<br />
      
      <br />
        <button type="submit">Submit</button>
      </form>
      </div>
      {/* showing submitted data */}
      
      {submittedData && (
  <div style={{ textAlign: "center" }}>
    <h2>Selected Data</h2>
   
    
    <p>
  Committee Member:{" "}
  {staffMembers.find((item) => item.id === submittedData.examiner)?.first_name}{" "}
  {staffMembers.find((item) => item.id === submittedData.examiner)?.last_name}
</p>
<p>Exam Responsibility: {submittedData.exam_responsibility}</p>
  </div>
)}



    </div>
  );
};

export default Exambill;



