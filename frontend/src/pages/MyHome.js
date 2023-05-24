import React from 'react';
import { Link } from 'react-router-dom';
// import './Home.css';
import html2pdf from 'html2pdf.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
// import Carosel from './Carosel';

function MyHome() {
  const downloadPdf = () => {
    const element = document.getElementById('pdf-content');
    html2pdf()
      .from(element)
      .save('dashboard.pdf');
  };

  return (
    <>
      <div id="pdf-content">
        <section className="bg-color">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <a href="/" className="navbar-brand">
                    Dashboard
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link to="/" className="nav-link">
                          Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/invigilator" className="nav-link">
                          Invigilator
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="exam-committee-form" className="nav-link">
                          Exam Committee
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/question-mod" className="nav-link">
                          Question moderation
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/moderation-form" className="nav-link">
                          Moderation Form
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/course-schedule" className="nav-link">
                          Course Schedules
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/moderation-report" className="nav-link">
                          Moderation Report
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/examiner-notice" className="nav-link">
                          Notice examiner
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </section>

        <br />
        <h1 style={{ textAlign: 'center' }}>
          Welcome to Exam Bill Management System
        </h1>

        {/* End of Slider */}
        {/* <Carosel /> */}

        {/* Your content to be included in the PDF */}
      </div>

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
    </>
  );
}

export default MyHome;
