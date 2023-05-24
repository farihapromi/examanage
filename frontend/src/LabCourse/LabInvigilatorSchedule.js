import React from 'react'
import { useEffect,useState ,useRef} from 'react';

function LabInvigilatorSchedule() {


    const [examSchedules, setExamSchedules] = useState([]);
    const [selectedExamScheduleId, setSelectedExamScheduleId] = useState(null);
    const [courseSchedules, setCourseSchedules] = useState([]);
    const[invigilatorschedule,setInvigilatorSchedule]=useState([]);
    const [invigilatorNames, setInvigilatorNames] = useState({});
    const [pdfCreated, setPdfCreated] = useState(false);
    const componentRef = useRef(null);
    const [selectedExamSchedule, setSelectedExamSchedule] = useState(null);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/core/lab-exam-schedule-detail/')
            .then(response => response.json())
            .then(data => setExamSchedules(data))
            .catch(error => console.error(error));
    }, []);
           
    
    const handleSelectExamSchedule = (event) => {
        const examScheduleId =  parseInt(event.target.value);
        setSelectedExamScheduleId(examScheduleId);
        fetch(`http://127.0.0.1:8000/core/lab-exam-schedule-detail/${examScheduleId}/lab-course-schedule-detail/?format=json&expand=invigilator`)
            .then(response => response.json())
            .then(data => setCourseSchedules(data))
            .catch(error => console.error(error));
    };




  return (
    <div>

<div>
            <h2 className="dept">Department of Computer Science and Engineering</h2>
            <br />
            <h2 className="dept-name">Jahangirnagar University</h2>
            <br />
            <p className="address">Savar,Dhaka</p>
            <h2 className='schedule'>Invigilation Schedule</h2>
            <p className="para-for">For</p>
            <p style={{ textAlign: 'center', textDecoration: 'underline' }}>
 {selectedExamScheduleId && 
  examSchedules.find(examSchedule => examSchedule.id === selectedExamScheduleId)?.sem?.exam_system?.year} year {selectedExamScheduleId && examSchedules.find(examSchedule => examSchedule.id === selectedExamScheduleId)?.sem?.semester} semester BS.c(Hons) Final Examination, {selectedExamScheduleId && examSchedules.find(examSchedule => examSchedule.id === selectedExamScheduleId)?.exam_year}
</p>


         
            <br />

        </div>
          <select value={selectedExamScheduleId} onChange={handleSelectExamSchedule}>
                    <option value="">Select an exam schedule</option>
                    {examSchedules.map(examSchedule => (
                        
                        <option key={examSchedule.id} value={examSchedule.id}>
                           {examSchedule.sem.exam_system.year} year {examSchedule.sem.semester} semester {examSchedule.exam_year}
                        </option>
                    ))}
                </select>
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
  )
}

export default LabInvigilatorSchedule;