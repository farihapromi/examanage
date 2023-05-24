import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import html2pdf from 'html2pdf.js';
 import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Carosel from './Carosel';
import { useState } from 'react';



function Home() {
  const downloadPdf = () => {
    const element = document.getElementById('pdf-content');
    html2pdf()
      .from(element)
      .save('dashboard.pdf');
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <>
     <div id="pdf-content">

{/*  */}
<div>
  
</div>

{/*  */}



      {/* <section className='bg-color'>
        <div className="container">
          <div className="row">
            <div className="col"> */}
              <div className='nav-container'>

         
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
         
            <Link to="exam-committee-form">Exam Committee</Link></li>
          
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
      </div>
      {/* </div>
          </div>
      </section>
      </div> */}
     <br />
     <h1 style={{textAlign:'center'}}>Welcome to Exam Bill Management System</h1>
   
        {/* End of Slider */}
        
<Carosel/>
     
        {/* Your content to be included in the PDF */}
       



        {/* slider end */}

         {/* Footer section */}
         <footer className="footer">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} Your Company Name</p>
            <ul className="footer-links">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Developed By</Link>
              </li>
              <li>
                <Link to="/privacy">Supervised By</Link>
              </li>
              {/* Add more footer links as needed */}
            </ul>
          </div>
        </footer>
       
      

      {/* <button onClick={downloadPdf}>Download PDF</button> */}
    </>
  );
}

export default Home;
