import React, { useState, useEffect } from "react";
import axios from "axios";

const  FinalExamBill = () => {
  const [selectedStaffMemberId, setSelectedStaffMemberId] = useState("");
  const [examResponsibilities, setExamResponsibilities] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);

  // Fetch exam responsibilities and staff members from the API
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/core/exam-bill-detail/").then((response) => {
      setExamResponsibilities(response.data);
      setStaffMembers(response.data);
    });
  }, []);

  // Event handler for capturing the selected staff member
  const handleStaffMemberSelection = (event) => {
    const { value } = event.target;
    setSelectedStaffMemberId(value);
  };

  // Function to check if the selected staff member is present in the moderation report
  const isStaffMemberInModerationReport = () => {
    return examResponsibilities.some((responsibility) => {
      const { moderation_report } = responsibility;
      return moderation_report.present_members === selectedStaffMemberId;
    });
  };

  // Perform the check when a staff member is selected
  useEffect(() => {
    if (selectedStaffMemberId && isStaffMemberInModerationReport()) {
      // The selected staff member is present in the moderation report
      // Perform the desired action here
      console.log("Selected staff member is present in the moderation report.");
    } else {
      // The selected staff member is not present in the moderation report or no staff member is selected
      // Perform the desired action here
      console.log("Selected staff member is not present in the moderation report.");
    }
  }, [selectedStaffMemberId]);

  return (
    <div>
      <label htmlFor="">Select Staff Member</label>
      <select value={selectedStaffMemberId} onChange={handleStaffMemberSelection}>
        <option value="">Select a staff member</option>
        {staffMembers.map((staffMember) => (
          <option key={staffMember.id} value={staffMember.id}>
            {staffMember.examiner.first_name} {staffMember.examiner.last_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FinalExamBill;
