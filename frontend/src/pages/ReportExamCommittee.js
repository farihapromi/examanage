import React from 'react'
import  { useState ,useEffect,useRef} from 'react'

function ReportExamCommittee() {
    const currentDateRef = useRef(null);
    const[examCommiteeMembers,setExamCommiteeMember]=useState([]);
    const[selectExamCommiteeMember,setSelectedExamCommiteeMember]=useState('');

    useEffect(() => {
        fetch('http://localhost:8000/core/committee-members-detail/')
            .then(response => response.json())
           
            .then(data => setExamCommiteeMember(data))
            .catch(error => console.error(error));
    }, []);
    
           

    const handleExamCommitteeChange = (e) => {
        setSelectedExamCommiteeMember(e.target.value);
      };
    




    const getCurrentDate = () => {
        const date = new Date();
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
      };
      useEffect(() => {
        currentDateRef.current.textContent = getCurrentDate();
      }, []);
    


  return (
    <div>

{/* fetch members name */}
<div>
        <label htmlFor="examcommiteeMember">Exam System:</label>
        <select
          id="examSCommiteeMember"
          value={selectExamCommiteeMember}
          onChange={handleExamCommitteeChange}
        >
          <option value="">Select Exam Commitee</option>
          {examCommiteeMembers.map((examCommiteeMember) => (
            <option key={examCommiteeMember.id} value={examCommiteeMember.id}>
             {examCommiteeMember.committee_members.first_name}
            </option>
          ))}
        </select>
      </div>






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

             <p style={{  textDecoration: 'underline' }}>বিষয়ঃ পরীক্ষা কমিটি গঠন প্রসংগে</p>
             <p>

               জনাব, 
               অদ্য <span ref={currentDateRef}></span>  খ্রিঃ তারিখে অনুষ্ঠিত বিভাগীয় একাডেমিক কমিটির জরুরী সভার সিদ্ধান্তক্রমে(কপি সংযুক্ত)
               নিম্নলিখিত শিক্ষকগণকে <br />
               অন্তর্ভুক্ত করে কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং বিভাগের ২০১৯-২০২০ শিক্ষাবর্ষে {} পর্ব
               ১ম ও ২য়  সেমিস্টার স্নাতক(সম্মান) শ্রেণীর <br />
               পরীক্ষা কমিটির পরীক্ষা কার্যক্রম সম্পাদনের জন্যে পরীক্ষা কমিটি গঠন করার 
               অনুরোধ করা হলো।
               <br />
               <br />
               <br />

               সভাপতিঃ {}
               <br />
               <br />
               <br />
               সদস্যবৃন্দ :{}
               <br />
               <br />



               বহিঃস্থ সদস্যঃ{}
    
             </p>
             <p>
এ ব্যাপারে আপনার অবগতি ও প্রয়োজনীয় ব্যবস্থা গ্রহণের অনুরোধ করছি।

ধন্যবাদান্তে,
আপনার বিশ্বাসভাজন,
{}department chairman

             </p>


    </div>
  )
}

export default ReportExamCommittee
