
import React, { useState ,useEffect,useRef} from 'react'
import axios from 'axios';

function FormForThiredExaminer() {

    const [examSchedules, setExamSchedules] = useState([]);
    const [selectedExamScheduleId, setSelectedExamScheduleId] = useState('');
    const [committeeMembers, setCommitteeMembers] = useState([]);
    const[selectedCommiteeMembers,setSelectedCommiteeMember]= useState('');
  
  //   for course
  const[courses,setCourses]=useState([]);
  const[selectedCourse,setSelectedCourse]=useState('');
  const[selectedExaminerRoll,setSelectedExaminerRoll]=useState('');
  //for notice
  const[notices,setNotice]=useState([]);
  const[selectedNotice,setSelectedNotice]=useState('');
   
    const [selectedExamSchedule, setSelectedExamSchedule] = useState();
    const currentDateRef = useRef(null);
  
  //   for pdf created
  const [pdfCreated, setPdfCreated] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    // Fetch committee members from the API
    axios.get("http://127.0.0.1:8000/core/staff-list/").then((response) => {
      setCommitteeMembers(response.data);
    });
  }, []);
  useEffect(() => {
    // Fetch committee members from the API
    axios.get("http://127.0.0.1:8000/core/courselist/").then((response) => {
        setCourses(response.data);
    });
  }, []);


  useEffect(() => {
    // Fetch committee members from the API
    axios.get("http://127.0.0.1:8000/core/third-examiner-notice-detail-list/").then((response) => {
        setNotice(response.data);
    });
  }, []);





  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create the exam committee using the selected values
    

    const data = {
        
      notice:selectedNotice,
      staff:selectedCommiteeMembers,
      course:selectedCourse,
      examinee_roll:selectedExaminerRoll,
     
    
    };
    console.log(data)

    axios.post("http://127.0.0.1:8000/core/third-examiner-list/", data).then((response) => {
      // Handle the response as needed
      //navigate .push("/CommiteeMember");
    });
  };



const handleNoticeChange=(e)=>{
    setSelectedNotice(e.target.value);
}

const handleExaminerChange=(e)=>{
    setSelectedCommiteeMember(e.target.value);
}


//course handle
const handleCourseChange=(e)=>{
    setSelectedCourse(e.target.value);
}

//examiner change
const handleExamineeRollChange=(e)=>{
    setSelectedExaminerRoll(e.target.value);
}

  
  return (
    <div>

   <form action="" >
    <label htmlFor="">Notice</label>
<select value={selectedNotice} onChange={handleNoticeChange}>
                    <option value="">Select Notice</option>
                    {notices.map(notice => (
                        
                        <option key={notice.id} value={notice.id}>
                          Third Examiner notice {notice.sem.exam_system.year} year {notice.sem.semester} semester {notice.exam_year}
                        
                        </option>
                    ))}
                </select>
                <br />
                <label htmlFor="">Examiner</label>
              
                <select value={selectedCommiteeMembers} onChange={handleExaminerChange}>
                    <option value="">Select an examiner</option>
                    {committeeMembers.map(committeeMember => (
                        
                        <option key={committeeMember.id} value={committeeMember.id}>
                          {committeeMember.first_name} {committeeMember.last_name}
                        </option>
                    ))}
                </select>
                <br />

           
              
          
  &nbsp;
  
            


            <select value={selectedCourse} onChange={handleCourseChange}>
                    <option value="">Select course</option>
                    {courses.map(course => (
                        
                        <option key={course.id} value={course.id}>
                            {course.course_code} {course.course_name}
                       
                        </option>
                    ))}
                </select>
                <br />
  
  {/* examiner roll change */}
        
              <label htmlFor="examinee_roll">Examinee roll:</label>
          <input
            type="text"
            id="examinee_roll"
            name="examinee_roll"
            value={selectedExaminerRoll}
            onChange={handleExamineeRollChange}
          />
  
      <button type="submit" onClick={handleSubmit}>Submit</button>  
  </form>

    </div>
  )
}

export default FormForThiredExaminer