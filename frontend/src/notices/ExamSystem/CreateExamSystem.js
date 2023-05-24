import React, { useState,useEffect } from "react";
import axios from "axios";
function CreateExamSystem() {
    const [selectedyear, setSelectedYear] = useState("");
    const[selectedyearBangla,setSelectedyearBangla]= useState("");
    const[selectedDepartment,setSelectedDepartment] = useState([]);
    
    const [submittedData, setSubmittedData] = useState(null);
    const [formData, setFormData] = useState({
    
     
      year:"",
      year_in_bengali:"",
      department:"",
      


    });
    console.log(formData)

    
      const [departmentOptions, setDepartmentOptions] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
          try {
            const response = await fetch('http://localhost:8000/core/deptlist/');
            const data = await response.json();
            setDepartmentOptions(data);
          } catch (error) {
            console.error('Error fetching departments:', error);
          }
        };
      
        fetchDepartments();
      }, []);
      
    // function handleInputChange(event) {
    //     const { name, value } = event.target;
    //     setFormData({ ...formData, [name]: value });
    //   }
      function handleSubmit(event) {
        event.preventDefault();
        axios
          .post("http://localhost:8000/core/examsystemlist/", formData,
          
            
        )
      
          .then((response) => {
            console.log(response.data);
            setSubmittedData(response.data);
      
            setFormData({
               
                year:"",
                year_in_bengali:"",
                department:"",
                
      
              });
          
            // TODO: Handle successful form submission
          })
          .catch((error) => {
            console.log(error.response.data);
           
            // TODO: Handle form submission error
          });
      }


    //   const handleYearChange = (e) => {
    //     setSelectedYear(e.target.value);
    //   };
    //   const handleYearBanglaChange= (e) => {
    //     setSelectedyearBangla(e.target.value);
    //   };
    


      const handleYearChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedYear(selectedValue);
        setFormData((prevFormData) => ({
          ...prevFormData,
          year: selectedValue,
        }));
      };
      
      const handleYearBanglaChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedyearBangla(selectedValue);
        setFormData((prevFormData) => ({
          ...prevFormData,
          year_in_bengali: selectedValue,
        }));
      };

      
      const handleInputChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedDepartment(selectedValue);
        setFormData((prevFormData) => ({
          ...prevFormData,
          department: selectedValue,
        }));
      };
      
      

      return (
        <div>
          <h1>Create Exam system</h1>
        <form onSubmit={handleSubmit}>
          
        



          
    
          {/* <label htmlFor="year">Year</label>
          <input
            type="text"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            required
          /> */}



<label htmlFor="year">year:</label>
        <select id="year" value={selectedyear} onChange={handleYearChange}>
          <option value="">Select a year</option>
          <option value="1st">1st </option>
          <option value="2nd">2nd </option>
          <option value="3rd">3rd </option>
          <option value="4th">4th </option>
        </select>
        <br />

        {/* for bangla */}


        <label htmlFor="year_in_bengali">year in Bengali:</label>
        <select id="year_in_bengali" value={selectedyearBangla} onChange={handleYearBanglaChange }>
          <option value="">Select a year in bengali </option>
          <option value="১ম">১ম  </option>
          <option value="২য়">২য় </option>
          <option value="৩য়">৩য় </option>
          <option value="৪র্থ">৪র্থ  </option>
        </select>

<br />
<label htmlFor="department">Department</label>
<select
  id="department"
  name="department"
  value={selectedDepartment}
  onChange={handleInputChange}
  required
>
  <option value="">Select Department</option>
  {departmentOptions.map((option) => (
    <option key={option.shortcode} value={option.shortcode}>
      {option.name}
    </option>
  ))}
</select>
    
    <br />
          <button type="submit">Submit</button>
        </form>
        </div>
      );
}
      export default CreateExamSystem;                  