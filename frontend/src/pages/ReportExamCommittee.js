import React, { useState, useEffect, useRef } from 'react';

import { useReactToPrint } from "react-to-print";

function ReportExamCommittee() {
  const currentDateRef = useRef(null);
  const [examCommiteeMembers, setExamCommiteeMembers] = useState([]);
  const [selectedExamCommitee, setSelectedExamCommitee] = useState('');
  const [examCommittees, setExamCommittees] = useState([]);
  const [pdfCreated, setPdfCreated] = useState(false);
const componentRef = useRef(null);


  // useEffect(() => {
  //   fetch('http://localhost:8000/core/committee-members-detail/')
  //     .then(response => response.json())
  //     .then(data => setExamCommiteeMembers(data))
  //     .catch(error => console.error(error));
  // }, []);

  useEffect(() => {
    fetch('http://localhost:8000/core/committee-detail/')
      .then(response => response.json())
      .then(data => setExamCommittees(data))
      .catch(error => console.error(error));
  }, []);

  // const handleExamCommitteeChange = (e) => {
  //   setSelectedExamCommitee(e.target.value);
  // };


   
  const handleExamCommitteeChange = (event) => {
    const examScheduleId =  parseInt(event.target.value);
    setSelectedExamCommitee(examScheduleId);
    fetch(`http://127.0.0.1:8000/core/committee-detail/${examScheduleId}/committee-members-detail/`)
        .then(response => response.json())
        .then(data =>setExamCommiteeMembers(data))
        .catch(error => console.error(error));
};

const getCurrentDate = () => {
  const date = new Date();
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  return formattedDate;
};

useEffect(() => {
  const currentDate = getCurrentDate();
  currentDateRef.current.textContent = currentDate;
}, []);



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


  return (
    <div>
      {/* Fetch committee name */}
      <div>
        <label htmlFor="examcommittee">Exam System:</label>
        <select
          id="examSCommiteeMember"
          value={selectedExamCommitee}
          onChange={handleExamCommitteeChange}
        >
          <option value="">Select Exam Commitee</option>
          {examCommittees.map((examCommittee) => (
            <option key={examCommittee.id} value={examCommittee.id}>
              {examCommittee.exam_system.year} year {examCommittee.exam_year}
            </option>
          ))}
        </select>
      </div>
     

      {/* pdf created */}
      
      {!pdfCreated && (
        <button onClick={handleCreatePDF}>Create PDF</button>
      )}

      {pdfCreated && (
        <p>PDF has been created. You can download it from <a href="pdf_document.pdf">here</a>.</p>
      )}
         <div id="pdf-content" ref={componentRef}>

      <div className="body">
        <p className="left" style={{ textAlign: 'left', margin: 0 }}>
          স্বারক নং- জাবি/সিএসই /১১/২০২৩-২০২৪
        </p>
        <p className="right" style={{ textAlign: 'right', margin: 0 }}>
        তারিখঃ <span ref={currentDateRef}>২৫/০৫/২০২৩</span>
        </p>
      </div>
      <br />

      <div>
        <p className="line">বরাবর,</p>
        <p className="line">পরীক্ষা নিয়ন্ত্রক</p>
        <p className="line">পরীক্ষা নিয়ন্ত্রকের অফিস</p>
        <p className="line">জাহাঙ্গীরনগর বিশ্ববিদ্যালয়</p>
        <p className="line">সাভার,ঢাকা</p>
      </div>
      <br />

      <p style={{ textDecoration: 'underline' }}>বিষয়ঃ পরীক্ষা কমিটি গঠন প্রসংগে</p>
      <p>
        জনাব, অদ্য <span ref={currentDateRef}></span> খ্রিঃ তারিখে অনুষ্ঠিত বিভাগীয় একাডেমিক কমিটির
        জরুরী সভার সিদ্ধান্তক্রমে(কপি সংযুক্ত) নিম্নলিখিত শিক্ষকগণকে <br />
        অন্তর্ভুক্ত করে কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং বিভাগের ২০১৯-২০২০ শিক্ষাবর্ষে 
        {selectedExamCommitee && examCommittees.find((examCommittee) => examCommittee.id === selectedExamCommitee)?.exam_system.year} পর্ব
        ১ম ও ২য় সেমিস্টার স্নাতক(সম্মান) শ্রেণীর <br />
        পরীক্ষা কমিটির পরীক্ষা কার্যক্রম সম্পাদনের জন্যে পরীক্ষা কমিটি গঠন করার অনুরোধ করা হলো।
        <br />
        
<br />
      
      
      
       সভাপতিঃ { selectedExamCommitee &&examCommiteeMembers
  .filter((examCommiteeMember) => examCommiteeMember.role === 'chairman')
  .map((examCommiteeMember) => (
    <option key={examCommiteeMember.id} value={examCommiteeMember.id}>
      {examCommiteeMember.committee_members.first_name} &nbsp;  
       {examCommiteeMember.committee_members.last_name}  &nbsp; ,<br /> 
       &nbsp;  {examCommiteeMember.committee_members.designation} &nbsp;  
    </option>
))}
          
  
        <br />
        সদস্যবৃন্দ :
        { selectedExamCommitee &&examCommiteeMembers
  .filter((examCommiteeMember) => examCommiteeMember.role === 'member')
  .map((examCommiteeMember) => (
    <option key={examCommiteeMember.id} value={examCommiteeMember.id}>
      {examCommiteeMember.committee_members.first_name} &nbsp;  
      {examCommiteeMember.committee_members.last_name} &nbsp;, <br />
      &nbsp;  {examCommiteeMember.committee_members.designation} &nbsp;   
    </option>
))}
        

        
         <br />
        <br />

        বহিঃস্থ সদস্যঃ
        { selectedExamCommitee &&examCommiteeMembers
  .filter((examCommiteeMember) => examCommiteeMember.role === 'external')
  .map((examCommiteeMember) => (
    <option key={examCommiteeMember.id} value={examCommiteeMember.id}>
      {examCommiteeMember.committee_members.first_name} &nbsp;  
      {examCommiteeMember.committee_members.last_name} &nbsp;,
      <br />
      &nbsp;  {examCommiteeMember.committee_members.designation} &nbsp;  
    </option>
))}
      </p>
      <p>
        এ ব্যাপারে আপনার অবগতি ও প্রয়োজনীয় ব্যবস্থা গ্রহণের অনুরোধ করছি।
        <br />
        <br />
        ধন্যবাদান্তে, 
        আপনার বিশ্বাসভাজন,
      
      </p>
      <p>(প্রফেসর ড ঃ আবু সাঈদ  মোঃ মোস্তাফিজুর রহমান)</p>
          <p>সভাপতি <br />

          ১ম পর্ব ১ম ও ২য় সেমিস্টার স্নাতক(সম্মান) পরীক্ষা কমিটি,২০২৩ <br />

          সিএসই বিভাগ,জাবিঃ
          </p>
         
    </div>
    </div>
  );
}
       
 export default ReportExamCommittee;