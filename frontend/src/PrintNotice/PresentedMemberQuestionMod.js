import React from 'react'
import { useState ,useEffect,useRef} from 'react'
import axios from 'axios';
import img1 from './img1.png'
import { useReactToPrint } from "react-to-print";



function PresentedMemberQuestionMod() {
    const [examSchedules, setExamSchedules] = useState([]);
    const [selectedExamScheduleId, setSelectedExamScheduleId] = useState('');

    const[questionMods,setQuestionMod]=useState([]);
    const[selectedQuestionModId,setSelectedQuestionModId]=useState('');
    const[selectedQuestionMod,setSelectedQuestionMod]=useState();
   
    const [selectedExamSchedule, setSelectedExamSchedule] = useState();
    const currentDateRef = useRef(null);
  
  //   for pdf created
  const [pdfCreated, setPdfCreated] = useState(false);
  const componentRef = useRef(null);
  
  
    useEffect(() => {
      fetch('http://127.0.0.1:8000/core/ques-mod-list-detail/')
          .then(response => response.json())
         
          .then(data => setQuestionMod(data))
          .catch(error => console.error(error));
  }, []);
  
         
  
  
  
    const handleSelectQuestionMod = event => {
      const selectedId = parseInt(event.target.value);
      setSelectedQuestionModId(selectedId);
    
      const selectedQuestionMod = questionMods.find(
        questionMods =>questionMods.id === selectedId
      );
      setSelectedQuestionMod(selectedQuestionMod );
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
        if (currentDateRef.current) {
          currentDateRef.current.textContent = getCurrentDate();
        }
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
              
              <select value={selectedQuestionModId} onChange={handleSelectQuestionMod}>
                      <option value="">Select an exam schedule</option>
                      {questionMods.map(questionMod=> (
                          
                          <option key={questionMod.id} value={questionMod.id}>
                            {questionMod.sem.exam_system.year}Year
                            {questionMod.sem.semester} semester
                            {questionMod.exam_year}exam year
                            {questionMod.day}day
                            {questionMod.date}date
                            {questionMod.time}time
                           
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
   <p className='left' style={{ textAlign: 'left', margin: 0 }}>তারিখঃ২২\০৫\২০২২৩</p>
  
                 </div>
                  <br />
  <div>
                  <p  className='line'>বরাবর,</p>
               <p className='line'>পরীক্ষা নিয়ন্ত্রক</p> 
               <p className='line'>পরীক্ষা নিয়ন্ত্রকের অফিস</p>
               <p className='line'>জাহাঙ্গীরনগর বিশ্ববিদ্যালয়</p>
               <p className='line'>সাভার,ঢাকা</p></div>
  
  
    
      
      
  
          {selectedQuestionMod && (
    <div key={selectedQuestionMod.id}>
      <h2>
        বিষয়ঃ প্রশ্নপত্র পরিমার্জনায় উপস্থিতি প্রসংগে।
      </h2>
      {/* <p>
        Selected Exam Schedule: {selectedExamSchedule.sem.exam_system.year} year {selectedExamSchedule.sem.semester} semester {selectedExamSchedule.exam_year}
      </p> */}
      {/* Add other properties of selectedExamSchedule as needed */}
      <p>
              জনাব,</p>
             আগামী {selectedQuestionMod.date} ইং রোজ {selectedQuestionMod.day} 
              {selectedQuestionMod.date} সকাল {selectedQuestionMod.time} টায় 
              কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং বিভাগের {selectedQuestionMod.sem.exam_system.year}পর্ব 
              {selectedQuestionMod.sem.semester}  সেমিস্টার স্নাতক(সম্মান) {selectedQuestionMod.exam_year}ইং-এর প্রশ্নপত্র পরিমার্জনা করা হবে। উক্ত পরীক্ষা কমিটির একজন
             সম্মানিত বহিঃস্থ সদস্য হিসেবে আপনার উপস্থিতি কামনা করছি।
            <p> ধন্যবাদান্তে-</p>
            আপনার বিশ্বস্ত

          


            {/* memebr */}
          
  
  
    </div>
  )}


  
  
          </div>
          </div>
               
    </div>
   
  
    )
  }

export default PresentedMemberQuestionMod