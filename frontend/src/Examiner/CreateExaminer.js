import React, { useState ,useEffect} from 'react'
import axios from 'axios';

function CreateExaminer() {
    const[courseExaminers,setCourseExaminer] =useState([]);
    const[orders,setOrder]=useState([]);
    const[examiners,setExaminer]=useState([]);


    const[selectedCourseExaminer,setSelectedCourseExaminer]=useState([]);
    const[selectedOrder,setSelectedorder]=useState([]);
    const[selectedExaminer,setSelectedExaminer]=useState([]);
    const [submittedData, setSubmittedData] = useState(null);

    // for course examiner

    useEffect(() => {
        // Fetch course from the API
        axios
          .get('http://127.0.0.1:8000/core/course-examiner-detail/')
          .then((response) => {
            setCourseExaminer(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

      //for examiner

      useEffect(() => {
        // Fetch semester from the API
        axios
          .get('http://127.0.0.1:8000/core/staff-list/')
          .then((response) => {
            setExaminer(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
//handling selected value

const handleCourseExaminerChange = (e) => {
    setSelectedCourseExaminer(e.target.value);
  };



  const handleExaminerChange = (e) => {
    setSelectedExaminer(e.target.value);
  };

  const handleOrderChange =(e)=>{
    setSelectedorder(e.target.value);
  }


  //after submitting to post
  
  const handleSubmit = () => {
    // Send selected member IDs to the API for saving in the Tabulator model's tabulator field
    const data = {
    
      course_examiner:selectedCourseExaminer,
      order:selectedOrder,
      examiner:selectedExaminer,
      
      
    };
    console.log(data)
    axios.post("http://127.0.0.1:8000/core/examiner/", data).then((response) => {
        // Handle the response as needed
        //navigate .push("/CommiteeMember");
      });
    }


    
    


  return (
    <div>
<h1>Create examiner</h1>
<form action="">
{/* for courseexaminer */}
<div >
        <label htmlFor="courseExaminer" className='class-label'>Select a course examiner</label>&nbsp;
        <select id="courseExaminer" value={selectedCourseExaminer} onChange={handleCourseExaminerChange}>
          <option value="">Select a course examiner</option>
          {courseExaminers.map((courseExaminer) => (
            <option key={courseExaminer.id} value={courseExaminer.id}>
           {courseExaminer.course.course_code}
            </option>
          ))}
        </select>
      </div>

{/* for order */}

<div>
      <label htmlFor="order">Order</label>
      <input
        type="text"
        id="order"
        value={selectedOrder}
        onChange={handleOrderChange}
      />
    </div>

      {/* examiner */}
      <div >
        <label htmlFor="courseExaminer" className='class-label'>Select examiner</label>&nbsp;
        <select id="courseExaminer" value={selectedExaminer} onChange={handleExaminerChange}>
          <option value="">Select a examiner</option>
          {examiners.map((examiner) => (
            <option key={examiner.id} value={examiner.id}>
           {examiner.first_name}    {examiner.last_name}
            </option>
          ))}
        </select>
      </div>










</form>

<button onClick={handleSubmit}>Submit </button>

{/* viewing submited data */}
{submittedData && (
        <div style={{ textAlign: 'center' }}>
          <h2>Selected Data</h2>
          <p>
           Course code {submittedData.courseExaminer.course_examiner.course.course_code} 
          </p>
          <p>
            Committee Member: {submittedData.examiner.examiner.first_name}{' '}
            {submittedData.examiner.last_name}
          </p>
          <p>Orders {submittedData.orders}</p>
        </div>
      )}

    </div>
  )
}

export default CreateExaminer