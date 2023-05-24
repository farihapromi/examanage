import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div>


         
<nav className='nav'>
        <a href="/" className='site-title'>Dashboard</a>
        <ul className='nav_menu'>
          <li className='nav_item'>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/invigilator">Invigilator</Link>
          </li>
          <li>
            <Link to="exam-committee-form">Exam Committee</Link>
          </li>
          <li>
            <Link to="/question-mod">Question moderation</Link>
          </li>
          <li>
            <Link to="/moderation-form">Moderation Form</Link>
          </li>
         
          <li>
            <Link to="/course-schedule">Course Schedules</Link>
          </li>
          {/* <li>
            <Link to="/committee-member">Committee Member</Link>
          </li> */}
          {/* <li>
            <Link to="/notice-mod">Notice Moderation</Link>
          </li> */}
         
          <li>
            <Link to="/moderation-report">Moderation Report</Link>

          </li>
          <li >
          
            <Link to="/examiner-notice">Notice examiner</Link>
           

          </li>
          


        </ul>
      </nav>

    </div>
  )
}

export default NavBar