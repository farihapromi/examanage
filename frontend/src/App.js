import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import MyLogin from './components/MyLogin';
import LoginForm from './components/LoginForm';

import ExamScheduleDropdown from './pages/ExamScheduleDropdwon';
import InvigilationSchedule from './pages/InvigilationSchedule';
import MyInvigilator from './pages/MyInvigilator';
import ExamCommitteeForm from './pages/ExamCommiteeForm';
import ExamSystem from './components/ExamSystem';
import CommiteeMember from './pages/CommiteeMember';
import QuestionMod from './pages/QuestionMod';
import ModerationForm from './pages/ModerationForm';

import NoticeModeration from './notices/NoticeModeration';
 import New from './notices/New';
// import Final from './notices/Final';
// import MyFinal from './notices/FinalModeration';
import {useRef}from 'react'
import { useReactToPrint } from "react-to-print";
import FinalModeration from './notices/FinalModeration';
import Home from './components/Home';

import Examresponse from './pages/Examresponse';
import GetTabulator from './Tabulator/GetTabulator';



function App() {
  const componentRef=useRef();
  const handlePrint=useReactToPrint({
    content:()=>componentRef.current,
});
  return (
    <div>
    <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
       
       
       
        <Route path="/invigilator" element={<InvigilationSchedule/>} /> 
        <Route path="/examSchedule" element={<ExamScheduleDropdown/>} />
        <Route path="/exam-committee-form" element={<ExamCommitteeForm/>} />
        <Route path="/question-mod" element={<QuestionMod/>} />
        <Route path="/moderation-form" element={<ModerationForm/>} />
        <Route path="/moderation-notice" element={<FinalModeration/>} />
        <Route path="/notice-mod" element={<NoticeModeration/>} />
        <Route path="/exam-system" element={<ExamSystem/>} />
        <Route path="/committee-member" element={<CommiteeMember/>} />
        <Route path="/exam-response" element={<Examresponse/>} />
        <Route path="/get-tabulator" element={<GetTabulator/>} />
        
        
        
        
      </Routes>
    </div>
  </Router>
   {/* <button onClick={handlePrint}>Print</button>
<div ref={componentRef}>
<FinalModeration/>
  </div>
  */}

  </div>


 

/* <Router>
  <Routes>

  <Route exact path="/" component={ExamCommitteeForm} />
  <Route path="/CommiteeMember" component={CommiteeMember} />
  </Routes>
</Router> */

   
  );
}

export default App;
