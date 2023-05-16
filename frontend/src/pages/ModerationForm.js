import React, { useState, useEffect } from "react";
import axios from "axios";

const ModerationForm= () => {
  const [moderations, setModerations] = useState([]);
  const [selectedModeration, setSelectedModeration] = useState("");
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    // Fetch notice question moderations from the API
    axios
      .get("http://127.0.0.1:8000/core/ques-mod-list-detail/")
      .then((response) => {
        setModerations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedModeration) {
      // Fetch committee members from the selected notice question moderation
      axios
        .get(
          `http://127.0.0.1:8000/core/fetch-committee-members/${selectedModeration}`
        )
        .then((response) => {
          setCommitteeMembers(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setCommitteeMembers([]);
    }
  }, [selectedModeration]);

  const handleModerationChange = (e) => {
    setSelectedModeration(e.target.value);
  };

  const handleMemberChange = (e, memberId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedMembers((prevSelectedMembers) => [
        ...prevSelectedMembers,
        memberId,
      ]);
    } else {
      setSelectedMembers((prevSelectedMembers) =>
        prevSelectedMembers.filter((id) => id !== memberId)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create the moderation report using the selected values

    const data = {
      notice_question_moderation: selectedModeration,
      present_members: selectedMembers,
    };

    axios
      .post("http://127.0.0.1:8000/core/moderation-reports/", data)
      .then((response) => {
        // Handle the response as needed
     
      })
    
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="moderation">Notice Question Moderation:</label>
        <select
          id="moderation"
          value={selectedModeration}
          onChange={handleModerationChange}
        >
          <option value="">Select a moderation</option>
          {moderations.map((moderation) => (
            <option key={moderation.id} value={moderation.id}>
              {moderation.sem.exam_system.year} year {moderation.sem.semester} sem {moderation.exam_year}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p>Committee Members:</p>
        {committeeMembers.map((member) => (
          <div key={member.id} value={member.id}>
            <input
              type="checkbox"
              id={`member-${member.id}`}
              checked={selectedMembers.includes(member.id)}
              onChange={(e) => handleMemberChange(e, member.id)}
            />
            <label htmlFor={`member-${member.id}`}>
              {member.first_name} {member.last_name}
            </label>
          </div>
        ))}
      </div>

      <button type="submit">Create Moderation Report</button>
    </form>
  );
};

export default ModerationForm;
