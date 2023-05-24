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
import Table from './Tabulator/Table';
import ExamBill from './Tabulator/ExamBill';

import SelectData from './Tabulator/SelectData';
import CreateDepartment from './notices/ExamSystem/CreateDepartment';
import CreateExamSystem from './notices/ExamSystem/CreateExamSystem';
import MyDept from './Tabulator/MyDept';
import CreateLabCourse from './LabCourse/CreateLabCourse';
import TheoryCourse from './LabCourse/TheoryCourse';

//for examiner
import CreateExaminer from './Examiner/CreateExaminer';
import ExaminerList from './Examiner/ExaminerList';
import CreateInvigilator from './Examiner/CreateInvigilator';
import LabExamInvigilator from './LabCourse/LabExamInvigilator';
import CreateExamSchedule from './notices/ExamSystem/CreateExamSchedule';
import LabCourse from './LabCourse/LabCourseSchedule';
import ExamresponsibilityForm from './Tabulator/ExamresponsibiltyForm';
import InvigilatorLabExam from './LabCourse/InvigilatorLabExam';
import CreateNotice from './notices/CreateNotice';
import CreateSemester from './notices/ExamSystem/CreateSemester';
import ThirdExaminerNotice from './notices/ThirdExaminerNotice';
import ThirdExaminer from './Examiner/ThirdExaminer';
import ExaminerNotice from './PrintNotice/ExaminerNotice';
import FinalNotice from './PrintNotice/FinalNotice';
import PresentedMemberQuestionMod from './PrintNotice/PresentedMemberQuestionMod';
import Carosel from './components/Carosel';
import MyHome from './pages/MyHome';
//exam commitee creation notice
import ReportExamCommittee from './pages/ReportExamCommittee';
import Data from './Tabulator/Data';
import ListOfExaminer from './pages/ListOfExaminer';
import CourseExaminer from './notices/CourseExaminer';
//lab invigilator schedule
import LabInvigilatorSchedule from './LabCourse/LabInvigilatorSchedule';
import CreateLabInvigilator from './Examiner/CreateLabInvigilator';
import ExaminerTable from './PrintNotice/ExaminerTable';
import ResposiblityForm from './pages/ResposiblityForm';
import Summaryreport from './PrintNotice/Summaryreport';





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
        <Route path="/moderation-report" element={<FinalModeration/>} />
        <Route path="/notice-mod" element={<NoticeModeration/>} />
        <Route path="/course-schedule" element={<ExamSystem/>} />
        <Route path="/committee-member" element={<CommiteeMember/>} />
        <Route path="/exam-response" element={<Examresponse/>} />
        <Route path="/get-tabulator" element={<GetTabulator/>} />
        <Route path="/table" element={<Table/>} />
        <Route path="/exam-bill" element={<ExamBill/>} />
         <Route path="/select-data" element={<SelectData/>} />
         <Route path="/create-department" element={<CreateDepartment/>} />
         <Route path="/create-exam-system" element={<CreateExamSystem/>} />
         <Route path="/my-dept" element={<MyDept/>} />
         <Route path="/lab-course" element={<CreateLabCourse/>} />
         <Route path="/theory-course" element={<TheoryCourse/>} />
         <Route path="/create-examiner" element={<CreateExaminer/>} />
         <Route path="/examiner-list" element={<ExaminerList/>} />
         <Route path="/create-invigilator-schedule" element={<CreateInvigilator/>} />
         <Route path="/lab-exam-invigilator" element={<LabExamInvigilator/>} />
         <Route path="/create-exam-schedule" element={<CreateExamSchedule/>} />
         <Route path="/lab-course-schedule" element={<LabCourse/>} />
         <Route path="/exam-responsibilty" element={<ExamresponsibilityForm/>} />
         <Route path="/invigilator-lab-exam" element={<InvigilatorLabExam/>} />
         <Route path="/create-notice" element={<CreateNotice/>} />
         <Route path="/create-semester" element={<CreateSemester/>} />
         <Route path="/third-examiner-notice" element={<ThirdExaminerNotice/>} />
         <Route path="/third-examiner" element={<ThirdExaminer/>} />
         <Route path="/examiner-notice" element={<ExaminerNotice/>} />
         <Route path="/notice-present-member" element={<PresentedMemberQuestionMod/>} />
         <Route path="/carosel" element={<Carosel/>} />
         <Route path="/report-exam-committee" element={<ReportExamCommittee/>} />
         <Route path="/list-examiner" element={<ListOfExaminer/>} />
       
         <Route path="/course-examiner" element={<CourseExaminer/>} />
         <Route path="/lab-invigilator-schedule" element={<LabInvigilatorSchedule/>} />
         <Route path="/create-lab-invigilator" element={<CreateLabInvigilator/>} />
         <Route path="/examiner-table" element={<ExaminerTable/>} />
         <Route path="/reponsibility-form" element={<ResposiblityForm/>} />

         <Route path="/summary-form" element={<Summaryreport/>} />




         
        
        
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
