import React, { useState, useEffect ,useRef} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import './style.css'
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';
import NavBar from '../components/NavBar';
import img2 from './img2.png'




function InvigilationSchedule() {
   
  

  
        const [examSchedules, setExamSchedules] = useState([]);
        const [selectedExamScheduleId, setSelectedExamScheduleId] = useState(null);
        const [courseSchedules, setCourseSchedules] = useState([]);
        const [invigilatorschedule,setInvigilatorSchedule]=useState([]);
        const [invigilatorNames, setInvigilatorNames] = useState({});
        const [pdfCreated, setPdfCreated] = useState(false);
        const componentRef = useRef(null);
        const [selectedExamSchedule, setSelectedExamSchedule] = useState(null);
      
      
    
        useEffect(() => {
            fetch('http://127.0.0.1:8000/core/examscheduledetail/')
                .then(response => response.json())
                .then(data => setExamSchedules(data))
                .catch(error => console.error(error));
        }, []);

        // useEffect(() => {
        //     fetch('http://127.0.0.1:8000/core/invigilationschedule/')
        //         .then(response => response.json())
        //         .then(data => {
        //             const invigilatorNamesArr = data.map(invigilator => ({
        //                 id: invigilator.id,
        //                 name: `${invigilator.first_name} ${invigilator.last_name}`
        //             }));
                  
        //             setInvigilatorNames(invigilatorNamesArr);
        //         })
        //         .catch(error => console.error(error));
        // }, []);

        // useEffect(() => {
        //     fetch('http://127.0.0.1:8000/core/invigilationschedule/1/')
        //       .then(response => response.json())
        //       .then(data => {
        //         const invigilatorNamesArr = data.map(invigilator => ({
        //           id: invigilator.id,
        //           name: `${invigilator.first_name} ${invigilator.last_name}`
        //         }));
        //         setInvigilatorNames(invigilatorNamesArr);
        //       })
        //       .catch(error => console.error(error));
        //   }, []);
             
        
    


        
    
        const handleSelectExamSchedule = (event) => {
            const examScheduleId =  parseInt(event.target.value);
            setSelectedExamScheduleId(examScheduleId);
            fetch(`http://127.0.0.1:8000/core/examscheduledetail/${examScheduleId}/coursescheduledetail/?format=json&expand=invigilator`)
                .then(response => response.json())
                .then(data => setCourseSchedules(data))
                .catch(error => console.error(error));
        };


        // const handleSelectExamSchedule = (event) => {
        //     const examScheduleId = event.target.value;
        //     setSelectedExamScheduleId(examScheduleId);
        
        //     // Find the selected exam schedule from the examSchedules array
        //     const selectedSchedule = examSchedules.find(schedule => schedule.id === examScheduleId);
        //     setSelectedExamSchedule(selectedSchedule);
        
        //     fetch(`http://127.0.0.1:8000/core/examscheduledetail/${examScheduleId}/coursescheduledetail/?format=json&expand=invigilator`)
        //       .then(response => response.json())
        //       .then(data => setCourseSchedules(data))
        //       .catch(error => console.error(error));
        //   };

        //   const getSelectedExamSchedule = () => {
        //     const selectedExamSchedule = examSchedules.find(examSchedule => examSchedule.id === selectedExamScheduleId);
        //     if (selectedExamSchedule) {
        //       const { sem, exam_year } = selectedExamSchedule;
        //       const { exam_system, semester } = sem;
        //       return `${sem.exam_year} year ${sem.semester} semester (${exam_year})`;
        //     }
        //     return 'No exam schedule selected';
        //   };
          

//pdf print
const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      setPdfCreated(true);
    },
  });

  const handleCreatePDF = () => {
    handlePrint();
  };
  const selectedexamSchedule = examSchedules.find(examSchedule => examSchedule.id === selectedExamScheduleId);

console.log('Selected Exam Schedule Year:', selectedExamSchedule?.sem);
console.log('Selected Exam Schedule Semester:', selectedExamSchedule?.sem?.semester);
console.log('Selected Exam Schedule Exam Year:', selectedExamSchedule?.exam_year);


  
       
    
        return (
            <div>

                {/* start */}
<NavBar/>
                {/* end */}
                <br />
                <br />
              
                <select value={selectedExamScheduleId} onChange={handleSelectExamSchedule}>
                    <option value="">Select an exam schedule</option>
                    {examSchedules.map(examSchedule => (
                        
                        <option key={examSchedule.id} value={examSchedule.id}>
                           {examSchedule.sem.exam_system.year} year {examSchedule.sem.semester} semester {examSchedule.exam_year}
                        </option>
                    ))}
                </select>
                
                



                {!pdfCreated && (
        <button onClick={handleCreatePDF}>Create PDF</button>
      )}

      {pdfCreated && (
        <p>PDF has been created. You can download it from <a href="pdf_document.pdf">here</a>.</p>
      )}

      <div id="pdf-content" ref={componentRef}>
        <div>
          <p>
            <h2 className="dept">Department of Computer Science and Engineering</h2>
            <div className="img">
          <img src={img2} className="img-left" alt="" />
        </div>
            <br />
            
          

            <p className="text-center">
          JAHANGIRNAGAR UNIVERSITY
          <br />
          Savar,Dhaka
          <br />
          Invigilation Schedule
          <br />
          <p>For</p>
        </p>
           



            <p style={{ textAlign: 'center', textDecoration: 'underline' }}>
 {selectedExamScheduleId && 
  examSchedules.find(examSchedule => examSchedule.id === selectedExamScheduleId)?.sem?.exam_system?.year} year {selectedExamScheduleId && examSchedules.find(examSchedule => examSchedule.id === selectedExamScheduleId)?.sem?.semester} semester BS.c(Hons) Final Examination, {selectedExamScheduleId && examSchedules.find(examSchedule => examSchedule.id === selectedExamScheduleId)?.exam_year}
</p>


         
            <br />
            </p>

        </div>

              
                <table className='table-container'>
                    <thead>
                        <tr>
                            <th>Exam Date</th>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Invigilator</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseSchedules.map(courseSchedule => {
                            console.log(courseSchedule.invigilator); 
                            return(
                            
                            <tr key={courseSchedule.id}>
                                <td>{new Date(courseSchedule.exam_date).toLocaleDateString('en-GB')}</td>
                                <td>{courseSchedule.course_code.course_code}</td>
                                <td>{courseSchedule.course_code.course_name}</td>
                                <td>
                             {courseSchedule.invigilator.map(invigilator => (
                                        <span key={invigilator.id}>
                                            {invigilator.first_name} {invigilator.last_name}
                                            <br />
                                        </span>
                                    ))}
                                </td>
                              
                                {/* <td>{courseSchedule.invigilator.name}</td> */}
                                <td>{courseSchedule.time}</td>
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
            </div>
        );
    }
    
    
    
    
export default InvigilationSchedule;
