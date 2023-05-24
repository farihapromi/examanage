import React, { useState,useEffect } from "react";
import axios from "axios";
function CreateSemester() {
    const [selectedsemester, setSelectedSemester] = useState("");
    const[selectedSemesterBangla,setSelectedSemesterBangla]= useState("");
    
    const[selectedExamSystem,setSelectedExamSystem]=useState("");
    const[examsystems,setExamSystem]=useState([]);
    
    const [submittedData, setSubmittedData] = useState(null);
    const [formData, setFormData] = useState({
    
     
        exam_system:"",
        semester:"",
        semester_in_bengali:"",
        

    });
    console.log(formData)

    useEffect(() => {
        // Fetch exam systems and committee members from the API
        axios.get("http://127.0.0.1:8000/core/examsystemlist/").then((response) => {
            setExamSystem(response.data);
        });
    
        
      }, []);
  
      
    // function handleInputChange(event) {
    //     const { name, value } = event.target;
    //     setFormData({ ...formData, [name]: value });
    //   }
      function handleSubmit(event) {
        event.preventDefault();
        axios
          .post("http://localhost:8000/core/semester/", formData,
          
            
        )
      
          .then((response) => {
            console.log(response.data);
            setSubmittedData(response.data);
      
            setFormData({
               
                // year:"",
                // year_in_bengali:"",
                // department:"",
                exam_system:"",
                semester:"",
                semester_in_bengali:"",
                
      
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
    
const handleExamsystemChange=(e)=>{
    setSelectedExamSystem(e.target.value);
}

      const handleSemesterChange = (e) => {
        setSelectedSemester(e.target.value);
      }
        
      
      const handleSemesterBanglaChange = (e) => {
        setSelectedSemesterBangla(e.target.value);
      };

     
      

      return (
        <div>
          <h1>Create semester system</h1>
        <form >
          
        
        <div>
        <label htmlFor="examSystem">Exam System:</label>
        <select
          id="examSystem"
          value={selectedExamSystem}
          onChange={handleExamsystemChange}
        >
          <option value="">Select an exam system</option>
          {examsystems.map((examSystem) => (
            <option key={examSystem.id} value={examSystem.id}>
             {examSystem.department.name}   {examSystem.year}
            </option>
          ))}
        </select>
      </div>


          
    


<label htmlFor="year">year:</label>
        <select id="year" value={selectedsemester} onChange={handleSemesterChange}>
          <option value="">Select a year</option>
          <option value="1st">1st </option>
          <option value="2nd">2nd </option>
         
        </select>
        <br />

        {/* for bangla */}


        <label htmlFor="year_in_semester">semester in semester:</label>
        <select id="year_in_semester" value={selectedSemesterBangla} onChange={ handleSemesterBanglaChange}>
          <option value="">Select a semester in bengali </option>
          <option value="১ম">১ম  </option>
          <option value="২য়">২য় </option>
          
        </select>

<br />

    
    <br />
          <button  onClick={handleSubmit} type="submit">Submit</button>
        </form>
        </div>
      );
}
      export default CreateSemester;                  