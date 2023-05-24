import React, { useState ,useEffect} from 'react'
import axios from 'axios';

function ThirdExaminer() {
 const[notices,setNotice]=useState([]);
 const[selectedNotice,setSelectedNotice]=useState('');
 const[staffs,setStaff]=useState([]);
 const[selectedStaff,setSelectedStaff]=useState('');
 const[courses,setCourse]=useState([]);
 const[selectedCourse,setSelectedCourse]=useState([]);
 const[examineeRole,setExamineeRole]=useState([]);
 const[selectedExamineeRole,setSelectedExamineeRole]=useState([]);
 const [formData, setFormData] = useState({
    

    //  date:"",
    notice:"",
    staff:"",
    course:"",
    examinee_roll:"",
    
    //  time:""
   
    });


 useEffect(() => {
    // Fetch notice
    axios.get("http://127.0.0.1:8000/core/noticelist/").then((response) => {
        setNotice(response.data);
    });
}, []);

    useEffect(() => {
        // Fetch notice
        axios.get("http://127.0.0.1:8000/core/staff-list/").then((response) => {
            setStaff(response.data);
        });
     }, []);
        useEffect(() => {
            // Fetch notice
            axios.get("http://127.0.0.1:8000/core/courselist/").then((response) => {
                setCourse(response.data);
            });
        }, []);
        

const handleNoticeChange=(e)=>{
    setSelectedNotice(e.target.value);
}
    

const handleStaffChange=(e)=>{
    setSelectedStaff(e.target.value);
}
   

const handleCourseChange=(e)=>{
    setSelectedCourse(e.target.value);
}
   

const handleExamineerChange=(e)=>{
    setSelectedExamineeRole(e.target.value);
}


const handleSubmit = () => {
    // Send selected member IDs to the API for saving in the Tabulator model's tabulator field
    const data = {
    
     
  
     
      notice:selectedNotice,
      staff:selectedStaff,
      course:selectedCourse,
      examinee_roll:selectedExamineeRole,
      
      
    };
    console.log(data)
    axios.post("http://127.0.0.1:8000/core/third-examiner/", data).then((response) => {
     
      });
    }


   

  return (
    <div>
<h1>Third examiner</h1>
<form action="">

{/* for notice */}

<label htmlFor="notice">Exam System:</label>
        <select
          id="notice"
          value={selectedNotice}
          onChange={handleNoticeChange}
        >
          <option value="">Select Notice</option>
          {notices.map((notice) => (
            <option key={notice.id} value={notice.id}>
             {notice.notice.examiner}
            </option>
          ))}
        </select>

        {/* staff */}
        <label htmlFor="staff">Staff</label>
        <select
          id="staff"
          value={selectedStaff}
          onChange={handleStaffChange}
        >
          <option value="">Select staff</option>
          {staffs.map((staff) => (
            <option key={staff.id} value={staff.id}>
          {staff.first_name}
            </option>
          ))}
        </select>
        
        {/* course */}
        <label htmlFor="course">course</label>
        <select
          id="course"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          <option value="">Select course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
           {course.course_name} {course.course_code}
            </option>
          ))}
        </select>
{/* examinee role */}


<label htmlFor="examineeRole">Examinee Roll</label>
          <input
            type="number"
            id="examineeRole"
            name="examinee-role"
            value={examineeRole}
            onChange={handleExamineerChange}
            required
          />

</form>

    </div>
  )
}

export default ThirdExaminer;