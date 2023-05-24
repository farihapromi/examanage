import React, { useState } from "react";
import axios from "axios";
function DepartmentForm() {
    
    const [formData, setFormData] = useState({
      name: "",
      shortcode: "",
      shortcode_bangla: "",
    });
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      }
      function handleSubmit(event) {
        event.preventDefault();
        axios
          .post("http://localhost:8000/teachers/deptlist/", formData,
          )
          .then((response) => {
            console.log(response.data);
            // TODO: Handle successful form submission
          })
          .catch((error) => {
            console.log(error);
            // TODO: Handle form submission error
          });
      }
      return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
    
          <label htmlFor="shortcode">Shortcode:</label>
          <input
            type="text"
            id="shortcode"
            name="shortcode"
            value={formData.shortcode}
            onChange={handleInputChange}
            required
          />
    
          <label htmlFor="shortcode_bangla">Shortcode Bangla:</label>
          <input
            type="text"
            id="shortcode_bangla"
            name="shortcode_bangla"
            value={formData.shortcode_bangla}
            onChange={handleInputChange}
            required
          />
    
          <button type="submit">Submit</button>
        </form>
      );
}
      export default DepartmentForm;                  