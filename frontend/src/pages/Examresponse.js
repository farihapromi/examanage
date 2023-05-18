import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
const Examresponse = () => {
    const [semesterOptions, setSemesterOptions] = useState([]);
    const [moderationReportOptions, setModerationReportOptions] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [selectedModerationReport, setSelectedModerationReport] = useState(null);
    const[questionNum,setQuestionNum]= useState(null);
    const[stencil,setStencil]=useState(null);
    const[selectedStencil,setSelectedStencill]= useState(null);
    // Add other state variables and their setters as needed
    //tabulator
    const[tabolator,setTabolator]=useState(null);
    const[setTabulator,setSelectedTabulator]=useState(null);
  
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
axios.get('http://localhost:8000/core/tabulator-detail/')  // Replace with your API endpoint for fetching moderation reports
.then(response => {
  const options = response.data.map(tabulator => ({
    value: tabulator.id,
    label: `${tabulator.exam_committee.exam_system.year} year ${tabulator.sem.semester} sem `  // Modify this based on your moderation report model
  }));
  setSelectedTabulator(options);
})
.catch(error => {
  console.error('Error fetching tabulator info:', error);
});



  
      // Add additional fetch requests for other foreign key fields
  
    }, []);

    
    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform form submission logic here
        // Access the selected values using selectedSemester, selectedModerationReport, etc.
        // You can make an HTTP request to your backend API to save the form data
      };
    
      const handleSemesterChange = (selectedOption) => {
        setSelectedSemester(selectedOption);
      };
    
      const handleModerationReportChange = (selectedOption) => {
        setSelectedModerationReport(selectedOption);
      };
      const handleQuestionNumChange = (event) => {
        setQuestionNum(event.target.value);
      };
      const handaleStencillChange=(selectedOption)=>
{
    setStencil(selectedOption)
}  


// for tabulator

const handaleTabulatorChange=(selectedOption)=>
{
    setTabolator(selectedOption)
}  
    return (
      <form onSubmit={handleSubmit}>
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
            options={setTabulator}
            value={tabolator}
            onChange={handaleTabulatorChange}
            placeholder="Select Tabulator Infromation"
          />
        </div>



  
        <button type="submit">Submit</button>
      </form>
    );
  };
  export default Examresponse;
  