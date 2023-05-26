import React, { useState ,useEffect,useRef} from 'react'
import axios from 'axios';
import img1 from './img1.png'



import { useReactToPrint } from "react-to-print";
import NavBar from '../components/NavBar';


function AssignThirdExaminer() {
  const [examSchedules, setExamSchedules] = useState([]);

  const [committeeMembers, setCommitteeMembers] = useState([]);
  const[selectedCommiteeMembers,setSelectedCommiteeMember]= useState([]);

  const [selectedExamScheduleId, setSelectedExamScheduleId] = useState(null);

//   for course
const[selectedCourse,setSelectedCourse]=useState([]);
const[selectedExaminerRoll,setSelectedExaminerRoll]=useState([]);

 
  const [selectedExamSchedule, setSelectedExamSchedule] = useState();
  const currentDateRef = useRef(null);

  const[thirdExaminers,setThirdExaminer]=useState([]);

//   for pdf created
const [pdfCreated, setPdfCreated] = useState(false);
const componentRef = useRef(null);


//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/core/examscheduledetail/')
//         .then(response => response.json())
       
//         .then(data => setExamSchedules(data))
//         .catch(error => console.error(error));
// }, []);


useEffect(() => {
  // Fetch committee members from the API
  axios.get("http://127.0.0.1:8000/core/third-examiner-notice-detail-list/").then((response) => {
    setExamSchedules(response.data);
  });
}, []);





       
// useEffect(() => {
//     // Fetch committee members from the API
//     axios.get("http://127.0.0.1:8000/core/third-examiner-detail-list/").then((response) => {
//       setThirdExaminer(response.data);
//     });
//   }, []);






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


  // const handleSelectExamSchedule = event => {
  //   const selectedId = parseInt(event.target.value);
  //   setSelectedExamScheduleId(selectedId);
  
  //   const selectedSchedule = examSchedules.find(
  //     examSchedule => examSchedule.id === selectedId
  //   );
  //   setSelectedExamSchedule(selectedSchedule);
    
  // };


  
  const handleSelectExamSchedule = (event) => {
    const examScheduleId =  parseInt(event.target.value);
    setSelectedExamScheduleId(examScheduleId);
    fetch(`http://127.0.0.1:8000/core/third-examiner-notice-detail-list/${examScheduleId}/third-examiner-detail-list/`)
        .then(response => response.json())
        .then(data => setThirdExaminer(data))
        .catch(error => console.error(error));
};


// const handleSelectExamSchedule = (event) => {
//   const examScheduleId =  parseInt(event.target.value);
//   setSelectedExamScheduleId(examScheduleId);
//   fetch(`http://127.0.0.1:8000/core/examscheduledetail/${examScheduleId}/coursescheduledetail/?format=json&expand=invigilator`)
//       .then(response => response.json())
//       .then(data => setCourseSchedules(data))
//       .catch(error => console.error(error));
// };



  // const handleSelectExamSchedule = (event) => {
  //   const selectedScheduleId = event.target.value;
  //   setSelectedExamScheduleId(selectedScheduleId);
    
  //   const selectedSchedule = examSchedules.find(
  //     examSchedule => examSchedule.id === selectedScheduleId
  //   );

  //   // Fetch third examiners for the selected exam schedule
  //   axios.get(`http://127.0.0.1:8000/core/third-examiner-detail-list/?exam_schedule=${selectedScheduleId}`)
  //     .then((response) => {
  //       setThirdExaminer(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };




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

  const getCurrentDate = () => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };
  useEffect(() => {
    currentDateRef.current.textContent = getCurrentDate();
  }, []);


  //for converting Bangla

  const bengaliNumerals = ['০', '১ম', '২য়', '৩য়', '৪র্থ', '৫ম', '৬ষ্ঠ', '৭ম', '৮্ম', '৯ম'];

// Function to convert a number to Bengali numerals
const convertToBengaliNumerals = number => {
  const digits = number.toString().split('');
  const bengaliDigits = digits.map(digit => bengaliNumerals[digit]);
  return bengaliDigits.join('');
};
//for date
const dateNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const dateToBengaliNumerals = number => {
    const digits = number.toString().split('');
    const bengaliDigits = digits.map(digit => dateNumerals [digit]);
    return bengaliDigits.join('');
  };
  

  return (
  
        <div>
          <NavBar/>
          <br />
            
            <select value={selectedExamScheduleId} onChange={handleSelectExamSchedule}>
                    <option value="">Select an Third examiner Notice</option>
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
    <div className="Title">
    <img src={img1}alt="Logo" style={{ width: '70px', marginRight: '10px', float: 'left' }}/>
   
      <h1 className='dept fw-bold'> Department of Computer Science and Engineering</h1>
     <p className=' text-center '>JAHANGIRNAGAR UNIVERSITY<br></br>
                Savar,Dhaka,1342,Bangladesh<br></br>
                Phone"+880-2-7791045-52,Ext.1422,Fax:+880-2-7791052<br></br>
               Email:office.cse@juniv.edu,web:http://www.juniv.edu/cse</p>
               <hr></hr>


            
            
 </div>
 <div >
 <div className='body'>
 <p className='left' style={{ textAlign: 'left', margin: 0 }}>স্বারক নং- জাবি/সিএসই /১১/২০২৩-২০২৪</p>
 <p className="right" style={{ textAlign: 'right', margin: 0 }}>
    তারিখঃ <span ref={currentDateRef}></span>
  </p>
               </div>
                <br />
<div>
                <p  className='line'>বরাবর,</p>
             <p className='line'>পরীক্ষা নিয়ন্ত্রক</p> 
             <p className='line'>পরীক্ষা নিয়ন্ত্রকের অফিস</p>
             <p className='line'>জাহাঙ্গীরনগর বিশ্ববিদ্যালয়</p>
             <p className='line'>সাভার,ঢাকা</p></div>
             <br />


  
    
             {selectedExamScheduleId && (
              <div key={selectedExamSchedule}>
              <p> <b>
                বিষয়ঃ৩য় পরীক্ষক নিয়োগ প্রসংগে।
                </b></p>
              <p>
              জনাব,</p>
         
              

            <p >
            কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং বিভাগের  &nbsp; 
            
 {selectedExamScheduleId && 
 convertToBengaliNumerals(examSchedules.find(examSchedule => examSchedule.id === selectedExamScheduleId)?.sem?.exam_system?.year)} 
  &nbsp;পর্ব &nbsp;
      {selectedExamScheduleId &&
        convertToBengaliNumerals(examSchedules.find(examSchedule => examSchedule.id === selectedExamScheduleId)?.sem?.semester)} 
     &nbsp; সেমিস্টার স্নাতক(সম্মান) পরীক্ষা, 
      {selectedExamScheduleId &&
      dateToBengaliNumerals(examSchedules.find(examSchedule => examSchedule.id === selectedExamScheduleId)?.exam_year)}
ইং সনের
           নিম্নলিখিত কোর্সের ১ম ও ২য় পরীক্ষকের নাম্বারের ব্যবধান ২০% এর বেশি হওয়ায়  নিম্নবর্ণিত রোল নং
           এর খাতা গুলো  দেখার জন্যে বর্ণিত ৩য় পরীক্ষকের নাম সুপারিশ করছি।
           <br /><br />
           
           এ ব্যপারে আপনার প্রয়োজনীয় ব্যবস্থা গ্রহণের অনুরোধ করা হলো।
</p>

             



              
        <table>
          <thead>
            <tr>
            <th>৩য় পরীক্ষক</th> &nbsp; &nbsp;
            <th> কোর্স নং</th> &nbsp;  &nbsp; 
            <th> পরীক্ষার রোল নং</th>
            </tr>
          </thead>
          <tbody>
            {thirdExaminers.map((thirdExaminer) => (
              <tr key={thirdExaminer.id}>
                <td>{thirdExaminer.staff.first_name} {thirdExaminer.staff.last_name}</td> &nbsp; &nbsp;
                <td>{thirdExaminer.course.course_code}</td> &nbsp; &nbsp;
                <td>{thirdExaminer.examinee_roll}</td> &nbsp; &nbsp;
              </tr>
            ))}
          </tbody>
        </table>
        <br />
    
          
          <p>ধন্যবাদান্তে,</p>
          <p>আপনার বিশ্বস্ত</p>
          <p>
         
          <p>(প্রফেসর ড ঃ আবু সাঈদ  মোঃ মোস্তাফিজুর রহমান)</p>
          <p>সভাপতি <br />

          ১ম পর্ব ১ম ও ২য় সেমিস্টার স্নাতক(সম্মান) পরীক্ষা কমিটি,২০২৩ <br />

          সিএসই বিভাগ,জাবিঃ
          </p>
          </p>


  </div>
      )}

      

        </div>
        </div>
             
  </div>
 

  )
}


export default AssignThirdExaminer;