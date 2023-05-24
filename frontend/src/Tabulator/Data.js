import React from 'react';
import './table.css';
import img2 from './img2.png';
import { useState, useEffect } from 'react';
import Department from './Department';
import axios from 'axios';


function Data() {
 
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




useEffect(() => {
  fetch('http://127.0.0.1:8000/core/staff-list/')
  .then(response => response.json())
  .then(data => {
    // Filter out staff members with is_staff set to true
    const filteredStaffMembers = data.filter(staffMember => !staffMember.is_staff);
    setStaffMembers(filteredStaffMembers);
  })
  .catch(error => console.error(error));
}, []);


//exam responsibilty
useEffect(() => {
    // Fetch exam responsibilty from the API
    axios.get("http://127.0.0.1:8000/core/exam-responsibility-detail/").then((response) => {
      setExamResposibilities(response.data);
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
      // const selectedId = e.target.value;
      // setSelectedStaffId(selectedId);
      const staffId = e.target.value;
    setSelectedStaffId(staffId);
  
  
      const selectedStaff = staffMembers.find(staffMember => staffMember.id === staffId);
      if (selectedStaff) {
        setSelectedStaffName(`${selectedStaff.first_name} ${selectedStaff.last_name}`);
        const selectedMember = staffMembers.find((member) => member.id === staffId);
        setSelectedStaff(selectedMember);
       
        // Fetch moderation report and stencil information
        fetch('http://127.0.0.1:8000/core/ques-mod-list-detail/')
          .then(response => response.json())
          .then(data => {
            // Filter moderation reports for the selected semester and exam year
            const moderationReports = data.filter(report => report.sem.id === selectedSemester && report.exam_year === selectedExamyear);
   
            // Check if the selected staff is present in any moderation report
            // const isStaffInModerationReport = moderationReports.some(report => report.present_members.includes(selectedId));
   
            // Fetch stencils for the selected semester and exam year
            fetch('http://127.0.0.1:8000/core/stencil/')
              .then(response => response.json())
              .then(data => {
                // Filter stencils for the selected semester and exam year and staff
                // const stencils = data.filter(stencil => stencil.sem.id === selectedSemester && stencil.exam_year === selectedExamyear && stencil.staff === selectedId);
  
        // console.log('Has stencil:', hasStencil);
    })
    .catch(error => console.error(error));
})
.catch(error => console.error(error));
}
};



//exam responsibilty








return (


<div>



<label htmlFor="">Select Staff</label>
<select value={selectedStaffId} onChange={handleStaffSelection }>
<option value="">Select a staff member</option>
{staffMembers.map(staffMember => (
<option key={staffMember.id} value={staffMember.first_name+' '+staffMember.last_name} >
{staffMember.first_name} {staffMember.last_name}

    
</option>
  ))}
</select>


{/* for exam responsibilty */}


<select value={selectedExamResponse} onChange={handleExamResponseChanage}>
<option value="">Select Exam responsibilty</option>
{examResponsibilties.map(examResponsibilty=> (
<option key={examResponsibilty.id} value={examResponsibilty.id}>
 Final Report {examResponsibilty.sem.exam_system.year} year {examResponsibilty.sem.semester} sem
</option>
))}
</select>






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
{selectedStaffId && (
<p>
Selected Staff Member: {selectedStaffId}{" "}
{staffMembers.find(member => member.id === selectedStaffId)?.member.first_name}
</p>
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
  {rowHeader === 'প্রশ্নপত্র প্রণয়ন' && columnHeader === 'বিভাগ' && (     // Add your data here
            <td><Department /></td>
           
          )}
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

export default Data













   
   
   
     
 
