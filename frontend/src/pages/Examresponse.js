import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const Examresponse = () => {
    const [semesterOptions, setSemesterOptions] = useState([]);
    const [moderationReportOptions, setModerationReportOptions] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState([]);
    const [selectedModerationReport, setSelectedModerationReport] = useState(null);
    const[questionNum,setQuestionNum]= useState(null);
    const[selectedQuestionNum,setSelectedQuestionNum]=useState(null);
    const[stencil,setStencil]=useState([]);
    const[selectedStencil,setSelectedStencill]= useState(null);
    // Add other state variables and their setters as needed
    //tabulator
    const[tabolator,setTabolator]=useState([]);
    const[setselectedTabulator,setSelectedTabulator]=useState(null);
//lab exam invigilator
const[labExamInvigilators,setLabExamInvigilator]=useState([]);
const[selectedLabExamInvigilator,setSelectedLabExamInvigilator]=useState('');
 //exam commitee
 const[examCommitee,setExamCommitee]=useState([]);
 const[selectedExamCommittee,setSelectedExamCommitee]=useState([]);
 //examineee number viva
 const[examineeNums,setExamineeNum]=useState([]);
 const[selectedExamineeNum,setSelectedExamineeNum]=useState([]);
 //course lab tutorial
 const[labTutorials,setLabTutorial]=useState([]);
 const[selectedLabTutorial,setSelectedLabTutorial]=useState([]);
 //exam year
 const[examYear,setExamyear]=useState([]);
 const[selectedExamyear,setSelectedExamYear]=useState([]);


  
    useEffect(() => {
      // Fetch semester options
      axios.get('http://localhost:8000/core/semester-detail-list/')  // Replace with your API endpoint for fetching semesters
        .then(response => {
          const options = response.data.map(semester => ({
            value: semester.id,
            label: `${semester.exam_system.year} year ${semester.semester} sem`
          }));
          setSemesterOptions(options);
        })
        .catch(error => {
          console.error('Error fetching semesters:', error);
        });
  
      // Fetch moderation report options
      axios.get('http://localhost:8000/core/moderation-reports-detail/')  // Replace with your API endpoint for fetching moderation reports
        .then(response => {
          const options = response.data.map(report => ({
            value: report.id,
            label: `${report.notice_question_moderation.exam_committee.exam_system.year} year ${report.notice_question_moderation.sem.semester} sem ${report.notice_question_moderation.exam_year}`  // Modify this based on your moderation report model
          }));
          setModerationReportOptions(options);
        })
        .catch(error => {
          console.error('Error fetching moderation reports:', error);
        });
//stencil
axios.get('http://localhost:8000/core/stencil-detail/')  // Replace with your API endpoint for fetching moderation reports
.then(response => {
  const options = response.data.map(stencil => ({
    value: stencil.id,
    label: `${stencil.sem.exam_system.year} year ${stencil.sem.semester} sem ${stencil.exam_year}`  // Modify this based on your moderation report model
  }));
  setSelectedStencill(options);
})
.catch(error => {
  console.error('Error fetching stencil info:', error);
});

// fetch tabulator
axios.get('http://127.0.0.1:8000/core/tabulator-list-detail/')  // Replace with your API endpoint for fetching moderation reports
.then(response => {
  const options = response.data.map(tabulator => ({
    value: tabulator.id,
    label: `${tabulator.sem.exam_system.year} year ${tabulator.sem.semester} semester  `  // Modify this based on your moderation report model
  }));
  setSelectedTabulator(options);
})
.catch(error => {
  console.error('Error fetching tabulator info:', error);
});


//lab exam invigilator
axios.get("http://127.0.0.1:8000/core/lab-exam-schedule-detail/").then((response) => {


  const options = response.data.map(invigilator => ({
    value: invigilator.id,
    label: `${invigilator.sem.exam_system.year} year  ${invigilator.sem.semester} semester
    ${invigilator.exam_year} `  // Modify this based on your moderation report model
  }));
  setLabExamInvigilator(options);
})
.catch(error => {
  console.error('Error fetching lab exam Invigilator info:', error);
});


  
      // Add additional fetch requests for other foreign key fields
      //exam commitee
      axios.get("http://127.0.0.1:8000/core/committee-detail/").then((response) => {

  
      const options = response.data.map(examcommitee => ({
        value: examcommitee.id,
        label: `  ${examcommitee.exam_system.year} year ${examcommitee.exam_year}   `  // Modify this based on your moderation report model
      }));
      setExamCommitee(options);
    })
    .catch(error => {
      console.error('Error fetching exam commitee info:', error);
    });


    // lab tuturial
axios.get("http://127.0.0.1:8000/core/lab-tutorial-list-detail/").then((response) => {
 
const options = response.data.map(labtutorial => ({
  value: labtutorial.id,
  label: `Lab tutorial of ${labtutorial.sem.exam_system.year} year ${labtutorial.sem.semester} sem  ${labtutorial.exam_year}`  // Modify this based on your moderation report model
    }));
    setLabTutorial(options);
   })
   .catch(error => {
  console.error('Error fetching lab tutorial info:', error);
    }   );

  
  
    }, []);

   
    
      const handleSemesterChange = (selectedOption) => {
        setSelectedSemester(selectedOption);
      };
    
      const handleModerationReportChange = (selectedOption) => {
        setSelectedModerationReport(selectedOption);
      };
      const handleQuestionNumChange = (event) => {
        setSelectedQuestionNum(event.target.value);
      };
      const handaleStencillChange=(selectedOption)=>
{
    setStencil(selectedOption)
}  

const handleLabExamInvigilatorChange=(selectedOption)=>
{
  setSelectedLabExamInvigilator(selectedOption)
}  
const handleExamCommiteeChange=(selectedOption)=>
{
  setSelectedExamCommitee(selectedOption)
}  


const handleExamineeNumberChange=(e)=>
{
  setSelectedExamineeNum(e.target.value);
}  
const handleLabTutorialChange=(selectedOption)=>
{
  setSelectedLabTutorial(selectedOption)
}  


const handleExamyearChange=(e)=>
{
  setSelectedExamYear(e.target.value);
}



// for tabulator

const handaleTabulatorChange=(selectedOption)=>
{
    setTabolator(selectedOption)
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
    tabulators:setselectedTabulator,
    lab_exam_invigilation_schedule:selectedLabExamInvigilator,
    exam_committee:selectedExamCommittee,
  
    course_lab_tutorial:selectedLabTutorial,
    
  };
  console.log(data)
  
  axios.post("http://127.0.0.1:8000/core/exam-responsibility-list/", data).then((response) => {
   
    });
  };



    return (
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
        <div>
          <label htmlFor="semester">Semester:</label>
          <Select
            id="semester"
            name="semester"
            options={semesterOptions}
            value={selectedSemester}
            onChange={handleSemesterChange}
            placeholder="Select Semester"
          />
        </div>
  
        <div>
          <label htmlFor="moderationReport">Moderation Report:</label>
          <Select
            id="moderationReport"
            name="moderationReport"
            options={moderationReportOptions}
            value={selectedModerationReport}
            onChange={handleModerationReportChange}
            placeholder="Select Moderation Report"
          />
        </div>
  
        {/* Add other dropdown/select components for foreign key fields */}

<div>
    <label htmlFor="question_num">Question Number</label>
    <input type="text" 
  
    id="question_num"
    name="question_num"
    value={questionNum}
    onChange={handleQuestionNumChange}
    placeholder="Enter question Number"
  />
</div>
{/* for stencill */}

<div>
          <label htmlFor="stencill">Stencil:</label>
          <Select
            id="stencill"
            name="stencill"
            options={selectedStencil}
            value={stencil}
            onChange={handaleStencillChange}
            placeholder="Select Stencil"
          />
        </div>
        {/* tabulator */}
        <div>
          <label htmlFor="tabulator">Tabulator</label>
          <Select
            id="tabulator"
            name="tabulator"
            options={setselectedTabulator}
            value={tabolator}
            onChange={handaleTabulatorChange}
            placeholder="Select Tabulator Infromation"
          />
        </div>
{/* lab exam inivigilator */}
        <div>
          <label htmlFor="lab_exam_invigilator">Lab Exam Invigilator</label>
          <Select
            id="lab_exam_invigilatorr"
            name="lab_exam_invigilator"
            options={labExamInvigilators}
            value={selectedLabExamInvigilator}
            onChange={handleLabExamInvigilatorChange}
            placeholder="Select Lab Exam invigilator"
          />
        </div>

{/* exam commitee */}
<div>
          <label htmlFor="exam_commitee"> Exam Commitee</label>
          <Select
            id="exam_commitee"
            name="exam_commitee"
            options={examCommitee}
            value={selectedExamCommittee}
            onChange={handleExamCommiteeChange}
            placeholder="Select  Exam Commitee"
          />
        </div>




{/* for examinee no */}

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
{/* for lab tutorial */}

<div>
          <label htmlFor="lab_tutorial"> Lab tutorial</label>
          <Select
            id="lab_tutorial"
            name="lab_tutorial"
            options={labTutorials}
            value={selectedLabTutorial}
            onChange={handleLabTutorialChange}
            placeholder="Select Lab tutorial "
          />
        </div>

  
        <button  type="submit">Submit</button>
      </form>
    );
  };
  export default Examresponse;
  