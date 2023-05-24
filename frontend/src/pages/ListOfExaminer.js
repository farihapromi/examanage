import React, { useState ,useEffect,useRef} from 'react'
import axios from 'axios';

function ListOfExaminer() {
    const[coursecodes,setCourseCode]=useState([]);
    const[selectedCourseCode,setSelectedCourseCode]=useState('');

    const[fullMarks,setFullMarks]=useState([]);
    const[selectedFullMarks,setSelectedFullMarks]=useState('');
    const[time,setTime]=useState([]);
    const[selectedTime,setSelectedTime]=useState('');

    const[order,setOrder]=useState([]);
    const[selectedOrder,setSelectedOrder]=useState('');

    const[examiners,setExaminer]=useState([]);

    const[selectedExaminer,setSelectedExaminer]=useState('');



    const [examSchedules, setExamSchedules] = useState([]);
    const [selectedExamScheduleId, setSelectedExamScheduleId] = useState(null);
    const [courseSchedules, setCourseSchedules] = useState([]);
    const[invigilatorschedule,setInvigilatorSchedule]=useState([]);
    const [invigilatorNames, setInvigilatorNames] = useState({});
    const [pdfCreated, setPdfCreated] = useState(false);
    const componentRef = useRef(null);
    const [selectedExamSchedule, setSelectedExamSchedule] = useState(null);
  
  

    useEffect(() => {
        fetch('http://127.0.0.1:8000/core/examiner-detail-list/')
            .then(response => response.json())
            .then(data => setExamSchedules(data))
            .catch(error => console.error(error));
    }, []);


    // useEffect(() => {
    //     // Fetch committee members from the API
    //     axios.get("http://127.0.0.1:8000/core/courselist/").then((response) => {
    //         setCourseCode(response.data);
    //     });
    //   }, []);
      const handaleSelectCourseCodeChange=(e)=>{
        setSelectedCourseCode(e.target.value);
      }
    
      
      const handleSelectExamSchedule = (event) => {
        const examScheduleId =  parseInt(event.target.value);
        setSelectedExamScheduleId(examScheduleId);
        fetch(`http://127.0.0.1:8000/core/examiner-detail-list/${examScheduleId}/course-examiner-detail/`)

            .then(response => response.json())
            .then(data => setCourseSchedules(data))
            .catch(error => console.error(error));
    };

// examiner
useEffect(() => {
  fetch('http://127.0.0.1:8000/core/examiner')
      .then(response => response.json())
      .then(data => setExaminer(data))
      .catch(error => console.error(error));
}, []);




  return (
    <div>

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
                            
                            <th>Course Code</th>
                            <th>Full Marks</th>
                            <th>Time</th>
                            <th>Order</th>
                            <th>Invigilator</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {courseSchedules.map(courseSchedule => {
                          
                            return(
                              
                            
                            <tr key={courseSchedule.id}>
                                <td>{courseSchedule.course.course_code}</td>
                                  <td>{courseSchedule.full_marks}</td>
                                  <td>{courseSchedule.duration}</td>  
                      
                                  {/* <td>{courseSchedule.examiners.first_name} {courseSchedule.examiners.last_name}</td> */}
                                  


                             
                                <td>
                             
                                </td>
                              
                                
                            </tr>
                        )})}


{/* for examiner */}



                      
                    </tbody>
                </table>
                


    </div>
  )
}

export default ListOfExaminer