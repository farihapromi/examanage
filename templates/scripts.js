// Get the add department button element
const addDepartmentBtn = document.getElementById('add-department-btn');

// Get the department list element
const departmentList = document.getElementById('department-list');

// Add an event listener to the add department button
addDepartmentBtn.addEventListener('click', function(event) {
  event.preventDefault();

  // Create a new department element
  const newDepartment = document.createElement('div');
  newDepartment.className = 'department';
  newDepartment.innerHTML = '<p><a href="">My Department</a></p>';

  // Append the new department element to the department list
  departmentList.appendChild(newDepartment);
});
