
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ResposiblityForm() {
//semester
    const [semesterOptions, setSemesterOptions] = useState([]);
    const [moderationReportOptions, setModerationReportOptions] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState([]);
    const [selectedModerationReport, setSelectedModerationReport] = useState(null);
    const[questionNum,setQuestionNum]= useState(null);
    const[selectedQuestionNum,setSelectedQuestionNum]=useState(null);
    const[stencils,setStencil]=useState([]);
    const[selectedStencil,setSelectedStencill]= useState([]);
    // Add other state variables and their setters as needed
    //tabulator

    const[tabulators,setTabulator]=useState([]);
    const[selectedTabulator,setSelectedTabulator]=useState(null);
//lab exam invigilator
const[labExamInvigilators,setLabExamInvigilator]=useState([]);
const[selectedLabExamInvigilator,setSelectedLabExamInvigilator]=useState('');
 //exam commitee
 const[examCommitees,setExamCommitee]=useState([]);
 const[selectedExamCommittee,setSelectedExamCommitee]=useState([]);
 //examineee number viva input
 const[examineeNums,setExamineeNum]=useState([]);
 const[selectedExamineeNum,setSelectedExamineeNum]=useState([]);
 //course lab tutorial
 const[labTutorials,setLabTutorial]=useState([]);
 const[selectedLabTutorial,setSelectedLabTutorial]=useState([]);
 //exam year input
 const[examYear,setExamyear]=useState([]);
 const[selectedExamyear,setSelectedExamYear]=useState([]);


//smester

useEffect(() => {
    // Fetch committee members from the API
    axios.get("http://localhost:8000/core/semester-detail-list/").then((response) => {
        setSemesterOptions(response.data);
    });
  }, []);




//moderation report


useEffect(() => {
    // Fetch committee members from the API
    axios.get("http://localhost:8000/core/moderation-reports-detail/").then((response) => {
        setModerationReportOptions(response.data);
    });
  }, []);

  //moderation question
  useEffect(() => {
    // Fetch committee members from the API
    axios.get("http://127.0.0.1:8000/core/staff-list/").then((response) => {
        setQuestionNum(response.data);
    });
  }, []);
  //stafff stencil
  useEffect(() => {
    // Fetch committee members from the API
    axios.get("http://localhost:8000/core/stencil-detail/").then((response) => {
        setStencil(response.data);
    });
  }, []);
//tabulator
  useEffect(() => {
    // Fetch committee members from the API
    axios.get("http://127.0.0.1:8000/core/tabulator-list-detail/").then((response) => {
        setTabulator(response.data);
    });
  }, []);
  //exam commitee
  useEffect(() => {
    // Fetch committee members from the API
    axios.get("http://127.0.0.1:8000/core/committee-detail/").then((response) => {
        setExamCommitee(response.data);
    });
  }, []);


  //lab tutorail
  
  useEffect(() => {
    // Fetch committee members from the API
    axios.get("http://127.0.0.1:8000/core/lab-tutorial-list-detail/").then((response) => {
        setLabTutorial(response.data);
    });
  }, []);

//lab exam invigilator
  useEffect(() => {
    // Fetch committee members from the API
    axios.get("http://127.0.0.1:8000/core/lab-exam-schedule-detail/").then((response) => {
        setLabExamInvigilator(response.data);
    });
  }, []);



//handaling response

const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const handleModerationReportChange = (e) => {
    setSelectedModerationReport(e.target.value);
  };
  const handleQuestionNumChange = (event) => {
    setSelectedQuestionNum(event.target.value);
  };
  const handaleStencillChange=(e)=>
{
setSelectedStencill(e.target.value);
}  

const handleLabExamInvigilatorChange=(e)=>
{
setSelectedLabExamInvigilator(e.target.value);
}  
const handleExamCommiteeChange=(e)=>
{
setSelectedExamCommitee(e.target.value);
}  


const handleExamineeNumberChange=(e)=>
{
setSelectedExamineeNum(e.target.value);
}  
const handleLabTutorialChange=(e)=>
{
setSelectedLabTutorial(e.target.value);
}  


const handleExamyearChange=(e)=>
{
setSelectedExamYear(e.target.value);
}


const handaleTabulatorChange=(e)=>
{
    setSelectedTabulator(e.target.value);
}  





const handleSubmit = (e) => {
  e.preventDefault();
  // Send selected member IDs to the API for saving in the Tabulator model's tabulator field
  const data = {
  
    exam_year:selectedExamyear,
    moderation_question_no:selectedQuestionNum,
    examinee_no_viva:selectedExamineeNum,
    sem:selectedSemester,
   
    moderation_report:selectedModerationReport,
    staff_stencil:selectedStencil,
    tabulators:selectedTabulator,
    lab_exam_invigilation_schedule:selectedLabExamInvigilator,
    exam_committee:selectedExamCommittee,
  
    course_lab_tutorial:selectedLabTutorial,
    
  };
  console.log(data)
  
  axios.post("http://127.0.0.1:8000/core/exam-responsibility-list/", data).then((response) => {
   
    });
  };




  return (
    <div>

{/* semetser */}

<form onSubmit={handleSubmit}>
    {/* exam year */}
<div>
    <label htmlFor="exam_year">Exam year</label>
    <input type="text" 
  
    id="exam_year"
    name="exam_year"
    value={selectedExamyear}
    onChange={handleExamyearChange}
    placeholder="Enter exam year"
  />
</div>


{/* semester */}


<div>
        <label htmlFor="semester">semester</label>
        <select
          id="semester"
          value={selectedSemester}
          onChange={handleSemesterChange}
        >
          <option value="">Select an exam system</option>
          {semesterOptions.map((semester) => (
            <option key={semester.id} value={semester.id}>
              {semester.exam_system.year} year {semester.semester} semster
            </option>
          ))}
        </select>
      </div>


{/* moderation repoert */}
<div>
    <label htmlFor="moderation_report">Moderation Report</label>
    <select 
    id="moderation_report"
    value={selectedModerationReport}
    onChange={handleModerationReportChange}
     >
<option value="">Moderation Report</option>

{moderationReportOptions.map((moderation) => (
            <option key={moderation.id} value={moderation.id}>
                {moderation.notice_question_moderation.exam_committee.exam_system.year}
                {moderation.notice_question_moderation.sem.semester} sem
                {moderation.notice_question_moderation.exam_year}year
            </option>
          ))}

    </select>
</div>


{/* staff stencil */}

<div>
    <label htmlFor="staff-stencil">Staff Stencil</label>
    <select 
    id="staff-stencil"
    value={selectedStencil}
    onChange={handaleStencillChange}
     >
<option value="">Staff Stencil</option>

{stencils.map((stencil) => (
            <option key={stencil.id} value={stencil.id}>
                
                {stencil.sem.exam_system.year} year {stencil.sem.semester} semester
             
            </option>
          ))}

    </select>
</div>

{/* tabulator */}
<div>
    <label htmlFor="tabulator">Tabulator</label>
    <select 
    id="tabulator"
    value={selectedTabulator}
    onChange={handaleTabulatorChange}
     >
<option value="">Tabulator</option>

{tabulators.map((tabolator) => (
            <option key={tabolator.id} value={tabolator.id}>
                
                {tabolator.sem.exam_system.year}year {tabolator.sem.semester}  semester
             
            </option>
          ))}

    </select>
</div>


{/* lab exam invigilator schdeule */}

<div>
    <label htmlFor="lab_exam_invigilator">Lab Exam invigilator Schedule</label>
    <select 
    id="lab_exam_invigilator"
    value={selectedLabExamInvigilator}
    onChange={ handleLabExamInvigilatorChange}
     >
<option value=""> Lab Exam Invigilator Schedule</option>

{labExamInvigilators.map((labExamInvigilator) => (
            <option key={labExamInvigilator.id} value={labExamInvigilator.id}>
                
                {labExamInvigilator.sem.exam_system.year}year {labExamInvigilator.sem.semester}  semester
             
            </option>
          ))}

    </select>
</div>

{/* exam commitee */}
<div>
    <label htmlFor="exam_commitee">Exam Commitee</label>
    <select 
    id="exam_commitee"
    value={selectedExamCommittee}
    onChange={  handleExamCommiteeChange}
     >
<option value="">Exam Commitee</option>

{examCommitees.map((examCommitee) => (
            <option key={examCommitee.id} value={examCommitee.id}>
                
                {examCommitee.exam_system.year} year   {examCommitee.exam_year} 
             
            </option>
          ))}

    </select>
</div>
{/* course lab tutorial */}
<div>
    <label htmlFor="lab_tutorial">Course Lab Tutorial</label>
    <select 
    id="lab_tutorial"
    value={selectedLabTutorial}
    onChange={handleLabTutorialChange}
     >
<option value="">Course Lab Tutorial</option>

{labTutorials.map((labTutorial) => (
            <option key={labTutorial.id} value={labTutorial.id}>
                
                {labTutorial.sem.exam_system.year}  year  {labTutorial.sem.semester} semester {labTutorial.exam_year} 
             
            </option>
          ))}

    </select>
</div>



{/* moderation q no */}
<div>
    <label htmlFor="moderation_ques_no">Moderation question No Viva</label>
    <input type="text" 
  
    id="moderation_ques_no"
    name="moderation_ques_no"
    value={selectedQuestionNum}
    onChange={handleQuestionNumChange}
    placeholder="Enter moderation question no"
  />
</div>



{/* examinee number */}
<div>
    <label htmlFor="examinee_num">Examinee Number</label>
    <input type="text" 
  
    id="examinee_num"
    name="examinee_num"
    value={selectedExamineeNum}
    onChange={handleExamineeNumberChange}
    placeholder="Enter examinee Number"
  />
</div>

<button type="submit">Submit</button>
</form>



    </div>
  )
}

export default ResposiblityForm