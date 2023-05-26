import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';

function Summaryreport() {
    const[examresponsibility, setExamResponsibilities]=useState([]);
    const[selectedExamResponse,setSelectedExamResponse]=useState([]);
    
    const [examSchedules, setExamSchedules] = useState([]);
    const [selectedExamScheduleId, setSelectedExamScheduleId] = useState(null);
    

    
    useEffect(() => {
        // Fetch the list of exam responsibilities from the server
        axios.get("http://127.0.0.1:8000/core/exam-responsibility-detail/")
          .then((response) => {
            setExamResponsibilities(response.data);
          });
      }, []);


      //for selectinfpartciual id wise exam reponse
      useEffect(() => {
        fetch('http://127.0.0.1:8000/core/exam-responsibility-detail/')
            .then(response => response.json())
            .then(data => setExamSchedules(data))
            .catch(error => console.error(error));
    }, []);


    
 

      function convertToBanglaNumber(number) {
        const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    
        const banglaNumber = number
          .toString()
          .split('')
          .map((digit) => banglaDigits[digit])
          .join('');
    
        return banglaNumber;
      }
      function convertToBanglaLetter(number) {
        const banglaDigits = ['০', '১ম', '২য়', '৩য়', '৪', '৫ম', '৬', '৭ম', '৮ম', '৯ম'];
    
        const banglaNumber = number
          .toString()
          .split('')
          .map((digit) => banglaDigits[digit])
          .join('');
    
        return banglaNumber;
      }

const  handleSelectExamResponse=(e)=>{
  setSelectedExamResponse(e.target.value);
}


  return (
    <div>


      {/* for seelcting exam schdule */}



      <select value={selectedExamResponse} onChange={ handleSelectExamResponse}>
                    <option value="">Select an exam responsibility</option>
                    {examresponsibility.map(examresponse => (
                        
                        <option key={examresponse.id} value={examresponse.id}>
                       {examresponse.sem.exam_system.year}year   {examresponse.sem.semester} semester
                       {examresponse.exam_year} 
                        </option>
                    ))}
                </select>
                {/* end */}

        <h1 style={{ textAlign: 'center' }}>পরীক্ষা নিয়ন্ত্রকের অফিস</h1>
        <h1 style={{ textAlign: 'center' }}>জাহাঙ্গীরনগর বিশ্ববিদ্যালয়</h1>
        <p style={{ textAlign: 'center' }}>সাভার,ঢাকা</p>
        <p style={{ textAlign: 'center', textDecoration: 'underline' }}>পরীক্ষা সংক্রান্ত বিভিন্ন দায়িত্ব পালনের বিবরণী</p>
        <p style={{ textAlign: 'center' }}>(পরীক্ষা নিয়ন্ত্রকের কাছে প্রেরিতব্য)</p>
    <p style={{ textAlign: 'center' }}>বিভাগের নামঃ  <span style={{ textAlign: 'center', textDecoration: 'underline' }}>কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং </span></p>
    {examresponsibility.map((examresponse) => (
      <span key={examresponse.id}>
        {convertToBanglaNumber(examresponse.exam_year)} সনের   {convertToBanglaLetter(examresponse.sem.exam_system.year)} পর্ব &nbsp;
        {convertToBanglaLetter(examresponse.sem.semester)} সেমিস্টার স্নাতক  সম্মান/স্নাতকোত্তর/এম ফিল/পি এইচ ডি/(নিয়মিত/অনিয়মিত/
        মান-উন্নয়ন) পরীক্ষা সংক্রান্ত বিভিন্ন কাজে নিম্নোক্ত শিক্ষকবৃন্দ নিয়োজিত ছিলেন ।
        {/* <p>Print Moderarion: {examresponse.moderation_report.notice_question_moderation}</p>
        <br /> */}

        <br /><br />

<p style={{  fontWeight: 'bold'}} >১।   প্রশ্নপত্র পরিমার্জনায় (স্নাতক  সম্মান/স্নাতকোত্তর/এম ফিল/পি এইচ ডি/) (প্রশ্নপত্রে সংখ্যা  {examresponse.moderation_question_no} )</p>

<p>
  {examresponse.moderation_report.present_members.map((member, index) => (
    <span key={member.id}>
     {convertToBanglaNumber(index + 1)}. {member.first_name} {member.last_name}
      {index < examresponse.moderation_report.present_members.length - 1 ? <br /> : null}
    </span>
  ))}
</p>

<p style={{  fontWeight: 'bold'}}>
     ২। স্টেনসিল টাইপঃ &nbsp;
     {examresponse.staff_stencil.staff.first_name}  {examresponse.staff_stencil.staff.last_name}</p>
স্টেনসিল সংখ্যা {examresponse.staff_stencil.stencil_no} টি <br />

(একসেট প্রশ্ন সংযুক্ত করতে হবে)


<p style={{  fontWeight: 'bold'}}>  ৩।  টেবুলেটরদ্বয় ঃ</p>

<p>
  {examresponse.tabulators.tabulators.map((member, index) => (
    <span key={member.id}>
     {convertToBanglaNumber(index + 1)}. {member.first_name} {member.last_name}
      {index < examresponse.tabulators.tabulators.length - 1 ?  <br /> : null}
    </span>
  ))}
</p>
    


<p style={{  fontWeight: 'bold'}}>
 ৪।   স্নাতক  সম্মান/স্নাতকোত্তর ব্যবহারিক পরীক্ষায়  <span style={{  textDecoration: 'underline', fontWeight: 'bold' }}>(ব্যবহারিক পরীক্ষার সময়সূচী ও দায়িত্ব পালনসূচি  <br />
   এতদসংগে সংযুক্ত করতে হবে)</span>

</p>

<p> ৫। মৌখিক পরীক্ষায় (পরীক্ষার্থী সংখ্যা {examresponse.examinee_no_viva}    )</p>

<p>
{examresponse.moderation_report.present_members.map((member, index) => (
    <span key={member.id}>
     {convertToBanglaNumber(index + 1)}. {member.first_name} {member.last_name}
      {index < examresponse.moderation_report.present_members.length - 1 ? <br /> : null}
    </span>
  ))}
</p>

<div>
 <p style={{  textDecoration: 'underline' , fontWeight: 'bold'}} >     ৬।ব্যবহারিক  কোর্সের অনুশীলনি পরীক্ষা ( ১টি ইউনিটে ৩টি,১/২ ইউনিটে
    ২ টি পরীক্ষার বিল হবে)</p>
    <table>
        <tbody>
          <tr>
            <th> কোর্স নং</th> &nbsp;
            <th> ইউনিট</th>&nbsp;
            <th> শিক্ষকের নাম</th>&nbsp;
            <th> ছাত্র সংখ্যা</th>&nbsp;
          </tr>
        </tbody>
    </table>



</div>



      </span>
    ))}
    <div></div>
  </div>
    
  )
}

export default Summaryreport