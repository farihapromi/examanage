import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import MyLogin from './components/MyLogin';
import LoginForm from './components/LoginForm';
import ExamSchedule from './components/ExamSchedule';
import ExamScheduleDropdown from './pages/ExamScheduleDropdwon';
import InvigilationSchedule from './pages/InvigilationSchedule';
import MyInvigilator from './pages/MyInvigilator';
import ExamCommitteeForm from './pages/ExamCommiteeForm';
import ExamSystem from './components/ExamSystem';
import CommiteeMember from './pages/CommiteeMember';
import QuestionMod from './pages/QuestionMod';
import ModerationForm from './pages/ModerationForm';


function App() {
  return (
    <>
    {/* <Login/> */}
    {/* <Registration/> */}
  {/* <MyLogin/> */}
  {/* <LoginForm/> */}
  {/* <ExamSchedule/> */}
  {/* <ExamScheduleDropdown/> */}
  {/* <InvigilationSchedule/> */}
  {/* <ExamCommitteeForm/> */}
  {/* <CommiteeMember/> */}
  {/* <MyInvigilator/> */}
  {/* <ExamSystem/> */}
  {/* <QuestionMod/> */}
  {/* this is fro moderation report form */}
  <ModerationForm/>
    </>


/* <Router>
  <Routes>

  <Route exact path="/" component={ExamCommitteeForm} />
  <Route path="/CommiteeMember" component={CommiteeMember} />
  </Routes>
</Router> */

   
  );
}

export default App;
