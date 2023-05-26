import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReportFinal() {
  const [examResponsibility, setExamResponsibilities] = useState([]);
  const [selectedExamResponse, setSelectedExamResponse] = useState([]);
  const [selectedExamResponsibilityDetails, setSelectedExamResponsibilityDetails] = useState({});

  const [invigilators, setInvigilators] = useState([]);
  const[invigilationSchedules, setInvigilationSchedule]= useState([]);
  const [courseCode, setCourseCode] = useState('');

  useEffect(() => {
    // Fetch the list of exam responsibilities from the server
    axios.get('http://127.0.0.1:8000/core/exam-responsibility-detail/')
      .then((response) => {
        setExamResponsibilities(response.data);
       



        
        
      });
  }, []);


//lab_inviiglatpr
  // useEffect(() => {
  //   // Fetch the list of exam responsibilities from the server
  //   axios.get('http://127.0.0.1:8000/core/lab-exam-schedule-detail/{selectedExamResponsibilityDetails.lab_exam_invigilation_schedule.id}/lab-course-schedule-detail/')
  //     .then((response) => {
  //       setInvigilationSchedule(response.data);
       
   
  //     });
  // }, []);



  const handleSelectExamResponse = (e) => {
    const selectedResponsibilityId = e.target.value;
    setSelectedExamResponse(selectedResponsibilityId);
  
    const selectedResponsibility = examResponsibility.find(
      (examresponse) => examresponse.id === Number(selectedResponsibilityId)
    );
  
    // Fetch the selected exam responsibility details from the server
    axios.get(`http://127.0.0.1:8000/core/exam-responsibility-detail/${selectedResponsibilityId}/`)
      .then((response) => {
        setSelectedExamResponsibilityDetails(response.data);
      });
      //lab-exam-inviiglatr

      // axios.get('http://127.0.0.1:8000/core/lab-exam-schedule-detail/${selectedResponsibilityId.lab_exam_invigilation_schedule.id}/lab-course-schedule-detail/')
      // .then((response) => {
      //   setInvigilationSchedule(response.data);
      // });
     
     
  };

 




  //lab_exam_invigilator

  
  // lab_exam_invigilator start
  // useEffect(() => {
  //   if (selectedExamResponse) {
  //     // Fetch the selected exam responsibility details from the server
  //     axios.get(`http://127.0.0.1:8000/core/exam-responsibility-detail/${selectedExamResponse}/`)
  //       .then((response) => {
  //         setSelectedExamResponsibilityDetails(response.data);
  //         const invigilatorsList = response.data.lab_course_schedule && response.data.lab_course_schedule.flatMap(courseSchedule =>
  //           courseSchedule.invigilator.map(invigilator => invigilator.first_name)
  //         );
  //         setInvigilators(invigilatorsList || []);
         
  //       });
  //   }
  // }, [selectedExamResponse]);

 //lab_exam_inbigolator  end


  function convertToBanglaNumber(number) {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

    const banglaNumber = number?.toString()?.split('')
    .map((digit) => banglaDigits[digit])
    .join('');

  return banglaNumber || '';
  }

  function convertToBanglaLetter(number) {
    const banglaDigits = ['০', '১ম', '২য়', '৩য়', '৪রথ', '৫ম', '৬ষ্ঠ', '৭ম', '৮ম', '৯ম'];

    const banglaNumber = number?.toString()?.split('')
    .map((digit) => banglaDigits[digit])
    .join('');

  return banglaNumber || '';
  }

  return (
    <div>
      <select value={selectedExamResponse} onChange={handleSelectExamResponse}>
        <option value="">Select an exam responsibility</option>
        {examResponsibility.map(examresponse => (
          <option key={examresponse.id} value={examresponse.id}>
            {examresponse.sem.exam_system.year}year {examresponse.sem.semester} semester {examresponse.exam_year}
          </option>
        ))}
      </select>

      <h1 style={{ textAlign: 'center' }}>পরীক্ষা নিয়ন্ত্রকের অফিস</h1>
      <h1 style={{ textAlign: 'center' }}>জাহাঙ্গীরনগর বিশ্ববিদ্যালয়</h1>
      <p style={{ textAlign: 'center' }}>সাভার,ঢাকা</p>
      <p style={{ textAlign: 'center', textDecoration: 'underline' }}>পরীক্ষা সংক্রান্ত বিভিন্ন দায়িত্ব পালনঃ </p>
      <p style={{ textAlign: 'center' }}>(পরীক্ষা নিয়ন্ত্রকের কাছে প্রেরিতব্য)</p>
    <p style={{ textAlign: 'center' }}>বিভাগের নামঃ  <span style={{ textAlign: 'center', textDecoration: 'underline' }}>কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং </span></p>


    


      {selectedExamResponsibilityDetails && selectedExamResponsibilityDetails.sem && selectedExamResponsibilityDetails.sem.exam_system && (
        <div>
       
     
        {convertToBanglaNumber(selectedExamResponsibilityDetails.exam_year)} সনের   {convertToBanglaLetter(selectedExamResponsibilityDetails.sem.exam_system.year)} পর্ব &nbsp;
        {convertToBanglaLetter(selectedExamResponsibilityDetails.sem.semester)} সেমিস্টার স্নাতক  সম্মান/স্নাতকোত্তর/এম ফিল/পি এইচ ডি/(নিয়মিত/অনিয়মিত/
        মান-উন্নয়ন) পরীক্ষা সংক্রান্ত বিভিন্ন কাজে নিম্নোক্ত শিক্ষকবৃন্দ নিয়োজিত ছিলেন ।
        {/* <p>Print Moderarion: {examresponse.moderation_report.notice_question_moderation}</p>
        <br /> */}

      
       
          {/* Add more fields here based on your requirements */}

          
<p style={{  fontWeight: 'bold'}} >১।   প্রশ্নপত্র পরিমার্জনায় (স্নাতক  সম্মান/স্নাতকোত্তর/এম ফিল/পি এইচ ডি/) (প্রশ্নপত্রে সংখ্যা  {selectedExamResponsibilityDetails.moderation_question_no} )</p>

<p>
  {selectedExamResponsibilityDetails.moderation_report.present_members.map((member, index) => (
    <span key={member.id}>
     {convertToBanglaNumber(index + 1)}. {member.first_name} {member.last_name}
      {index < selectedExamResponsibilityDetails.moderation_report.present_members.length - 1 ? <br /> : null}
    </span>
  ))}
</p>



<p style={{  fontWeight: 'bold'}}>
     ২। স্টেনসিল টাইপঃ &nbsp;
     {selectedExamResponsibilityDetails.staff_stencil.staff.first_name}  {selectedExamResponsibilityDetails.staff_stencil.staff.last_name}</p>
স্টেনসিল সংখ্যা {selectedExamResponsibilityDetails.staff_stencil.stencil_no} টি <br />

(একসেট প্রশ্ন সংযুক্ত করতে হবে)


<p style={{  fontWeight: 'bold'}}>  ৩।  টেবুলেটরদ্বয় ঃ</p>
<p>
  {selectedExamResponsibilityDetails.tabulators.tabulators.map((member, index) => (
    <span key={member.id}>
     {convertToBanglaNumber(index + 1)}. {member.first_name} {member.last_name}
      {index < selectedExamResponsibilityDetails.tabulators.tabulators.length - 1 ?  <br /> : null}
    </span>
  ))}
</p>



<p style={{  fontWeight: 'bold'}}>
 ৪।   স্নাতক  সম্মান/স্নাতকোত্তর ব্যবহারিক পরীক্ষায়  <span style={{  textDecoration: 'underline', fontWeight: 'bold' }}>(ব্যবহারিক পরীক্ষার সময়সূচী ও দায়িত্ব পালনসূচি  <br />
   এতদসংগে সংযুক্ত করতে হবে)</span>

   
     

</p>
<p> ৫। মৌখিক পরীক্ষায় (পরীক্ষার্থী সংখ্যা {selectedExamResponsibilityDetails.examinee_no_viva}    )</p>

<p>
{selectedExamResponsibilityDetails.exam_committee.exam_committee_member.map((member, index) => (
    <span key={member.id}>
     {convertToBanglaNumber(index + 1)}. {member.first_name} {member.last_name}
      {index < selectedExamResponsibilityDetails.exam_committee.exam_committee_member.length - 1 ? <br /> : null}
    </span>
  ))}
</p>
       
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

          <td>

            
            {/* {selectedExamResponsibilityDetails.course_lab_tutorial.lab_course_info} */}
            <p>Course Code: {courseCode}</p>
          </td>
        </tbody>
    </table> 
       
       
       
        </div>
      )}

    

    </div>
  );
}

export default ReportFinal;
