import React, { useState,useEffect } from "react";
import axios from "axios";
function ExamSystem() {
    const username = 'promi';
    const password = '123';
    const[courseschedules,setCourseSchedules]=useState([]);
    const[examschedules,setExamSchedules]=useState([]);
    const[examdates,setExamDates]=useState([]);;
    // const[date,setDate]=useState([]);
    const[coursecodes,setCourseCodes]=useState([]);
    // const[coursenames,setCourseNames]=useState([]);
    const[time,setTime]=useState([]);
   
    // const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
    

    //  date:"",
  
       exam_schedule:"",     
     exam_date:"",
     course_code:"",
      time:"",
    
    //  time:""
   
    });
    console.log(formData)


    //for schedule from sem  ,exam schedule theme sem pabo
    const[schedulesem,setScheduleSem]=useState({
      sem:"",
    });
    console.log(schedulesem)

   
  

    useEffect(() => {
      // Fetch the list of courses from your backend API
      axios.get("http://127.0.0.1:8000/core/examscheduledetail/").then(response => {
        setExamSchedules(response.data);
      });
    }, []);


  

    useEffect(() => {
        // Fetch the list of courses from your backend API
        axios.get("http://127.0.0.1:8000/core/courselist/",).then(response => {
          setCourseCodes(response.data);
        });
      }, []);

     


    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        //for sem schedule
        setScheduleSem({ ...schedulesem, [name]: value });
      }
      function handleSubmit(event) {
        event.preventDefault();
        axios
          .post("http://localhost:8000/core/courseschedule/", formData,
         )
          
          .then((response) => {
            console.log(response.data);
            setFormData({
            exam_schedule:"",
     
            exam_date:"",
            course_code:"",
             time:"",
    
            });
            // TODO: Handle successful form submission
          })
          // .catch((error) => {
          //   console.log(error);
          //   // TODO: Handle form submission error
          // });



          .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
      }
      
      return (
        <form onSubmit={handleSubmit}>
         
         {/* <label htmlFor="">Exam Date<input type="date" id="today" /></label>  */}
         <label htmlFor="exam_date">Exam Date</label>
<input
  type="date"
  id="exam_date"
  name="exam_date"
  // value={formData.exam_date ? new Date(formData.exam_date).toISOString().slice(0,10) : ""}
  value={formData.exam_date ? new Date(formData.exam_date.replace(/-/g, '/')).toISOString().slice(0,10) : ""}

  onChange={handleInputChange}
/>

        
         

        
{/* Schedule list */}
          <label htmlFor="exam_schedule">Schedule</label>
          <select
            type="text"
            id=" exam_schedule"
            name="exam_schedule"
            value={formData.exam_schedule}
            
            onChange={handleInputChange}
            required
          >
          {/* schedule.schedule.sem.exam_system.year+' '+ schedule.schedule.sem.semester+' '+  */}
     <option value="">Select a exam Schedule</option>
        {examschedules.map(examschedule => (
          <option key={examschedule.id} value={examschedule.id}>
          {/* {examschedule.schedule.sem.semester} */}
          {examschedule.sem.exam_system.year +' year '}
          {examschedule.sem.semester+' semester'} 
          {examschedule.exam_year} 
          {/* ({examschedule.schedule.sem.exam_system.year}) */}
  
  
          </option>
        ))}
      </select>



      {/*  */}


{/* course code  */}
          <label htmlFor="course code">Course Code</label>
          <select
            type="text"
            id="course_code"
            name="course_code"
            value={formData.course_code}
            
            onChange={handleInputChange}
            required
          >
            
     <option value="">Select a course code</option>
        {coursecodes.map(coursecode => (
          <option key={coursecode.id} value={ coursecode.id}>
          {coursecode.course_code}
          </option>
        ))}
      </select>
<br />

      {/* course name */}

  

      <label htmlFor="Time"> Time <input type="text" name="time" 
      id="time" value={formData.time} 
      onChange={handleInputChange}/>
      
    
      </label>


    
          
    
          <button type="submit">Submit</button>
        </form>
      );
}
      export default ExamSystem;                  