import React from 'react';
import './table.css';
import img2 from './img2.png';
import { useState, useEffect } from 'react';
import Department from './Department';
import axios from 'axios';

function Table() {
 
const [selectedStaffId, setSelectedStaffId] = useState('');
const [staffMembers, setStaffMembers] = useState([]);
const[selectedSemester,setSelectedSemester]= useState([]);
const[semesters,setSemester]= useState([]);
const [selectedStaffName, setSelectedStaffName] = useState('');
const[selectedExamyear,setSelectedExamyear]=useState('');
const [selectedStaff, setSelectedStaff] = useState(null);
const [submittedData, setSubmittedData] = useState(null);
const[examResponsibilties,setExamResposibilities]= useState([]);
const[selectedExamResponse,setSelectedExamResponse]=useState(null);
const[staffPresent,setStaffPresent]=useState([]);
const [selectedResponsibility, setSelectedResponsibility] = useState(null);

//
const [departmentShortcode, setDepartmentShortcode] = useState('');



useEffect(() => {
  if (selectedResponsibility && selectedStaff) {
    axios.get(`http://127.0.0.1:8000/core/moderation-reports-detail/${selectedResponsibility}/`)
      .then((response) => {
        const moderationReport = response.data;
        const isStaffPresent = moderationReport.present_members.some((member) => member.id === parseInt(selectedStaff));
        setStaffPresent(isStaffPresent);
        

        if (isStaffPresent) {
          // If staff is present, retrieve the department shortcode of the ExamResponsibility
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





// exam responsibilty
useEffect(() => {
  // Fetch exam responsibilty from the API
  axios.get("http://127.0.0.1:8000/core/exam-responsibility-detail/").then((response) => {
    setExamResposibilities(response.data);
  });
}, []);



useEffect(() => {
  // Fetch examiner from the API
  axios.get("http://127.0.0.1:8000/core/staff-list/").then((response) => {
    setStaffPresent(response.data);
  });
}, []);









function getSelectedStaffName(selectedId) {
  const selectedStaff = staffMembers.find(staffMember => staffMember.id === selectedId);
  if (selectedStaff) {
    return `${selectedStaff.first_name} ${selectedStaff.last_name}`;
  }
  return '';
}

  const rowHeaders = [
    'প্রশ্নপত্র প্রণয়ন',
    'অনুবাদ',
    'প্রশ্নপত্র পরিমার্জন',
    'উত্তরপত্র মূল্যায়ন',
    'ব্যবহারিক পরীক্ষা',
    'মৌখিক পরীক্ষা',
    'থিসিস/প্রজেক্ট মূল্যায়ন',
    'অনুশীলনী',
    'টেবুলেশন',
    'ষ্টেনসিল কাটা',
    'কমিটির সভাপতির পারিতোষোক',
    'তত্ত্বাবধায়কের সম্মানী োত্তর/ এম ফিল/পিএইচডি',
    'আনুষঙ্গিক খরচ',
  ];

  const columnHeaders = [
    'বিভাগ',
    'কোর্স নং',
    'উত্তরপত্র/থিসিস সংখ্যা',
    'মোট দিন/সদস্য সংখ্যা',
    'কত ঘন্টার পরীক্ষা',
    'টাকার পরিমান',
  ];

  const handleExamResponseChanage= (e) => {
    setSelectedExamResponse(e.target.value);
  };
  const handleStaffSelection = (e) => {
    setSelectedStaffName(e.target.value.toUpperCase()); ;
  };
 



//exam responsibilty




  return (

<div>


  
<label htmlFor="">Select Staff</label>
    <select value={selectedStaffId} onChange={handleStaffSelection}>
  <option value="">Select a staff member</option>
  {staffPresent.map(staffMember => (
    <option key={staffMember.id} value={staffMember.first_name+' '+staffMember.last_name} >
     {staffMember.first_name} {staffMember.last_name}
      
    </option>
  ))}
</select> 

{/* for exm repsonibilty */}

 <select value={selectedExamResponse} onChange={handleExamResponseChanage}>
<option value="">Select Exam responsibilty</option>
{examResponsibilties.map(examResponsibilty=> (
<option key={examResponsibilty.id} value={examResponsibilty.id}>
 Final Report {examResponsibilty.sem.exam_system.year} year {examResponsibilty.sem.semester} sem
</option>
))}
</select>
<div>Selected Responsibility: {selectedExamResponse}</div>
      <div>Selected Staff: {selectedStaffId}</div>
      <div>Staff Present: {staffPresent ? 'Yes' : 'No'}</div>
      <div>Department Shortcode: {departmentShortcode}</div>

 






    
    <div className='Title'> 
   
        <h1 className='header'>পরীক্ষা নিয়ন্ত্রকের অফিস</h1>
        <h2 className='header'>জাহাঙ্গীরনগর বিশ্ববিদ্যালয়</h2>
        <p className='paragraph-savar' >সাভার,ঢাকা</p>
        {/* <img src={img2} className="img-left" alt="" /> */}
    </div>
    <div>
      
       <label htmlFor=""> স্বারক সংখ্যা ঃ জাবি পনিঅ &nbsp;
       <input type="text" /></label>
    </div>
    <div className='bill-form'>
    <p className='header-2'>পরীক্ষা সংক্রান্ত কাজের পারিতোষিক বিল ফরম-১</p>
    <p className='header-3'>(পরীক্ষা কমিটির সভাপতির মাধ্যমে পরীক্ষা নিয়ন্ত্রকের অফিসে পাঠাতে হবে)</p>
    <br />
    <br />
    {selectedStaff && selectedResponsibility && (
  <div>
    {staffPresent ? (
      <p>Selected staff is present in the ModerationReport. Department: {departmentShortcode}</p>
    ) : (
      <p>Selected staff is not present in the ModerationReport.</p>
    )}
  </div>
)}

    <p className='name'>(ইংরেজীতে বড় অক্ষরে) ঃ  {selectedStaffName}</p>



 
    {selectedStaff && (
  <p>
    Selected Staff: {selectedStaff.firstName} {selectedStaff.lastName}
  </p>
)}
    <p className='name'>পদবী ও পূর্ণ ঠিকানা  ঃ </p>
    <p>



   
    {selectedExamyear}  সনের  &nbsp; {}  &nbsp;পর্ব  &nbsp;
  


    {selectedSemester} 
সেমিস্টার স্নাতক সম্মান/স্নাতকোত্তর/এম ফিল/পিএইচডি পরীক্ষা সংক্রান্ত 
        কাজের   বিস্তারিত বিবরণ &nbsp;</p> 

    <table className="custom-table">
      <thead>
        <tr>
          <th >কাজের নাম</th>
          {columnHeaders.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
        <tr>
          
        </tr>
      </thead>
      <tbody>

        {rowHeaders.map((rowHeader, rowIndex) => (
          <tr key={rowIndex}>
 {/* <th>{rowData.name}</th> */}
      {/* <td>{rowData.division}</td>
      <td>{rowData.courseNo}</td>
      <td>{rowData.answerPaperCount}</td>
      <td>{rowData.totalDaysOrMembers}</td>
      <td>{rowData.examHours}</td>
      <td>{rowData.amount}</td> */}
      {/* <td>name</td>
      <td>Address</td> */}

            {rowIndex === rowHeaders.length - 1 ? (
              <th rowSpan="2">{rowHeader}
            
              </th>

            ) : (
              <th>{rowHeader}</th>
              
            )}
{/* new part */}



{columnHeaders.map((columnHeader, colIndex) => (
        <td key={colIndex}>
          {/* Add your data here based on the row and column */}
          {/* For example, to add data in the 'বিভাগ' column and 'কাজের নাম' row: */}
          {/* {rowHeader === 'প্রশ্নপত্র প্রণয়ন' && columnHeader === 'বিভাগ' && (
            // Add your data here
            <td><Department /></td>
            
          )} */}
        </td>
      ))}
    </tr>
  ))}
  

          
        {/* ))} */}
       
        <tr>
      
        <th>রশিদ নং</th>
       
      
          
          {/* Empty cell for the bottom-left corner */}
          {columnHeaders.map((header, index) => (
            <th key={index} className="empty-header"></th>
          ))}
          
        </tr>


      </tbody>
    </table>
    </div>
    </div>
  );
}

export default Table;
