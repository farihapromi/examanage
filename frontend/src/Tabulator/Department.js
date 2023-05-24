import { useState, useEffect } from 'react';

function Department() {
  const [department, setDepartment] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/core/semester-detail-list/')
      .then(response => response.json())
      .then(data => {
        // Assuming the API response is an array of objects with a 'department' field
        // Update the below code if the API response structure is different
        const departmentData = data.map(item => item.exam_system.department);
        setDepartment(departmentData);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <>{department}</> // Render the fetched department data
  );
}
export default Department;
