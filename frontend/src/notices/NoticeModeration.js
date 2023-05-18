import React, { useState,useEffect} from 'react'
import axios from 'axios';







function NoticeModeration() {
    const[moderationreports,setModerationReport]=useState([]);
const[members,setMember]=useState([]);
const [selectedDate, setSelectedDate] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
const[day,setDay]=useState('');
const[time,setTime]=useState('');
const[sem,setSem]=useState('');
useEffect(() => {
    // Fetch notice question moderations from the API
    axios
      .get("http://localhost:8000/core/quesmodlist/")
      .then((response) => {
        setModerationReport(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    // Fetch notice question moderations from the API
    axios
      .get("http://127.0.0.1:8000/core/moderation-reports/")
      .then((response) => {
        setMember(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleDayChange = (event) => {
    setDay(event.target.value);
  };


  const handleMemberChange = (event) => {
    setSelectedMember(event.target.value);
  };



  return (
    <div>
        
        <div>
        <label htmlFor="date">Exam Date:</label>
        <select id="date" value={selectedDate} onChange={handleDateChange}>
          <option value="">Select Exam Date</option>
          {moderationreports.map((report) => (
            <option key={report.id} value={report.date}>
              {report.date} 
            </option>

          ))}
        </select>
        <label htmlFor="day">Exam Date:</label>
        <select id="date" value={day} onChange={handleDayChange}>
          <option value="">Select Exam Day</option>
          {moderationreports.map((report) => (
            <option key={report.id} value={report.day}>
              {report.day} 
            </option>

          ))}
        </select>
        

      </div>

    
 
কম্পিউটার সায়েন্স এন্ড বিভাগের {} পর্ব { } সেমিস্টারের {}ইং সালের {} দিন {} তারিখ
{} সময় প্রশ্নপত্রপরিমারজনায় নিম্নিক্ত ব্যক্তিগন উপস্থিত ছিল   
{}            
     </div>
    
  )
}

export default NoticeModeration