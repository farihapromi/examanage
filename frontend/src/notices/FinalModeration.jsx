import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import img2 from './img2.png';
import './notice.css';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';
import {Link} from 'react-router-dom';
import NavBar from '../components/NavBar';

function New() {
  const [moderations, setModerations] = useState([]);
  const [selectedModeration, setSelectedModeration] = useState('');
  const [moderationReport, setModerationReport] = useState(null);
  const [selectedModerationInfo, setSelectedModerationInfo] = useState('');
  const [pdfCreated, setPdfCreated] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    // Fetch notice question moderations from the API
    axios
      .get('http://127.0.0.1:8000/core/ques-mod-list-detail/')
      .then((response) => {
        setModerations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const fetchModerationReport = (moderationId) => {
    axios
      .get(`http://127.0.0.1:8000/core/ques-mod-list-detail/${moderationId}/moderation-reports-detail/`)
      .then((response) => {
        setModerationReport(response.data[0]); // Access the first item in the response data array
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleModerationChange = (e) => {
    const selectedId = e.target.value;
    setSelectedModeration(selectedId);

    if (selectedId) {
      fetchModerationReport(selectedId);
    } else {
      setModerationReport(null);
    }
  };

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
{/* start */}
<NavBar/>
{/* end */}
<br />
<br />
      <div>
        <label htmlFor="moderation">Select a moderation:</label>
        <select id="moderation" value={selectedModeration} onChange={handleModerationChange}>
          <option value="">Select a moderation</option>
          {moderations.map((moderation) => (
            <option key={moderation.id} value={moderation.id}>
              {moderation.exam_year} - {moderation.sem.exam_system.year} year {moderation.sem.semester} sem
            </option>
          ))}
        </select>
      </div>
      {!pdfCreated && (
        <button onClick={handleCreatePDF}>Create PDF</button>
      )}

      {pdfCreated && (
        <p>PDF has been created. You can download it from <a href="pdf_document.pdf">here</a>.</p>
      )}

      <div id="pdf-content" ref={componentRef}>
        {/* Your content goes here */}
      

      <div className="Title">
        <div className="img">
          <img src={img2} className="img-left" alt="" />
        </div>
        <h1 className="dept "> Department of Computer Science and Engineering</h1>
        <p className="text-center">
          JAHANGIRNAGAR UNIVERSITY
          <br />
          Savar, Dhaka, 1342, Bangladesh
          <br />
          Phone: +880-2-7791045-52, Ext. 1422, Fax: +880-2-7791052
          <br />
          Email: office.cse@juniv.edu, web: http://www.juniv.edu/cse
        </p>
        <hr />
      </div>

     

      {moderationReport && moderationReport.notice_question_moderation && (
        <div>
          <p>
            কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং বিভাগের &nbsp;
            {moderationReport.notice_question_moderation.date} &nbsp; তারিখ রোজ{' '}
            {moderationReport.notice_question_moderation.day}&nbsp; সকাল{' '}
            {moderationReport.notice_question_moderation.time}
          </p>
          <p>প্রশ্নপত্র পরিমার্জনায় নিম্নোক্ত ব্যক্তিগন উপস্থিত ছিলেন - </p>
          <ul>
            {moderationReport.present_members.map((member) => (
              <li key={member.id}>
                {member.first_name} {member.last_name}
              </li>
            ))}
          </ul>
        </div>
      )}

     
    </div>
    </div>
  );
}

export default New;
