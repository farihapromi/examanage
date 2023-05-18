import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import html2pdf from 'html2pdf.js';

function Home() {
  const downloadPdf = () => {
    const element = document.getElementById('pdf-content');
    html2pdf()
      .from(element)
      .save('dashboard.pdf');
  };

  return (
    <>
     <div id="pdf-content">
      <nav className='nav'>
        <a href="/" className='site-title'>Dashboard</a>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/invigilator">Invigilator</Link>
          </li>
          <li>
            <Link to="exam-committee-form">Exam Committee form</Link>
          </li>
          <li>
            <Link to="/question-mod">Question moderation</Link>
          </li>
          <li>
            <Link to="/moderation-notice">Moderation Notice</Link>
          </li>
          <li>
            <Link to="/exam-system">Exam System</Link>
          </li>
          <li>
            <Link to="/committee-member">Committee Member</Link>
          </li>
          {/* <li>
            <Link to="/notice-mod">Notice Moderation</Link>
          </li> */}
          <li>
            <Link to="/moderation-form">Moderation Form</Link>
          </li>
        </ul>
      </nav>

     
        {/* Your content to be included in the PDF */}
        <h1>Welcome to Dashboard</h1>
        <p>This is the content of the dashboard.</p>
      </div>

      <button onClick={downloadPdf}>Download PDF</button>
    </>
  );
}

export default Home;
