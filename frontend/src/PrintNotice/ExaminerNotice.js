import React, { useState ,useEffect,useRef} from 'react'
import axios from 'axios';
import img1 from './img1.png'



import { useReactToPrint } from "react-to-print";
import NavBar from '../components/NavBar';


function ExaminerNotice() {
  const [examSchedules, setExamSchedules] = useState([]);
  const [selectedExamScheduleId, setSelectedExamScheduleId] = useState('');
 
  const [selectedExamSchedule, setSelectedExamSchedule] = useState();
  const currentDateRef = useRef(null);

//   for pdf created
const [pdfCreated, setPdfCreated] = useState(false);
const componentRef = useRef(null);


  useEffect(() => {
    fetch('http://127.0.0.1:8000/core/examscheduledetail/')
        .then(response => response.json())
       
        .then(data => setExamSchedules(data))
        .catch(error => console.error(error));
}, []);

       



  const handleSelectExamSchedule = event => {
    const selectedId = parseInt(event.target.value);
    setSelectedExamScheduleId(selectedId);
  
    const selectedSchedule = examSchedules.find(
      examSchedule => examSchedule.id === selectedId
    );
    setSelectedExamSchedule(selectedSchedule);
  };

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


  
    
    

        {selectedExamSchedule && (
  <div key={selectedExamSchedule.id}>
    <h2>
      বিষয়ঃ {convertToBengaliNumerals(selectedExamSchedule.sem.exam_system.year)} পর্ব {convertToBengaliNumerals(selectedExamSchedule.sem.semester)} সেমিস্টার
      স্নাতক(সম্মান) { dateToBengaliNumerals(selectedExamSchedule.exam_year)} প্রশ্নকর্তা ও পরীক্ষকের তালিকা
    </h2>
    {/* <p>
      Selected Exam Schedule: {selectedExamSchedule.sem.exam_system.year} year {selectedExamSchedule.sem.semester} semester {selectedExamSchedule.exam_year}
    </p> */}
    {/* Add other properties of selectedExamSchedule as needed */}
    <p>
            জনাব,</p>
           <p>  কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং বিভাগের {convertToBengaliNumerals(selectedExamSchedule.sem.exam_system.year)} পর্ব &nbsp;
            {convertToBengaliNumerals(selectedExamSchedule.sem.semester)} সেমিস্টার স্নাতক(সম্মান)
             {dateToBengaliNumerals(selectedExamSchedule.exam_year)} ইং সনের
            পরীক্ষার প্রশ্নকর্তা ও পরীক্ষকের তালিকা এতদসংগে সংযুক্ত করে আপনার অবগতি ও প্রয়োজনীয় ব্যবস্থা
            গ্রহণের জন্য প্রেরণ করা হলো।
          </p>
          <p>ধন্যবাদান্তে,</p>
          <p>আপনার বিশ্বস্ত</p>
          <p></p>


  </div>
)}

        </div>
        </div>
             
  </div>
 

  )
}


export default ExaminerNotice;