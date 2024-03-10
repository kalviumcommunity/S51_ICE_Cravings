import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const IceForm = () => {
  const [formData, setFormData] = useState({
    iceVariety: '',
    Price: '',
    Availability: '',
    Density: 0,
    Temperature: 0,
    Clarity: '',
    Hardness: 0,
    meltingTime: 0,
    Notes: ''
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1000/addice', formData);
      navigate("/")
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data. Please try again.');

    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Ice Variety:
        <input type="text" name="iceVariety" value={formData.iceVariety} onChange={handleChange} />
      </label>
      <label>
        Price:
        <input type="text" name="Price" value={formData.Price} onChange={handleChange} />
      </label>
      <label>
        Availability:
        <input type="text" name="Availability" value={formData.Availability} onChange={handleChange} />
      </label>
      <label>
        Density:
        <input type="number" name="Density" value={formData.Density} onChange={handleChange} />
      </label>
      <label>
        Temperature:
        <input type="number" name="Temperature" value={formData.Temperature} onChange={handleChange} />
      </label>
      <label>
        Clarity:
        <input type="text" name="Clarity" value={formData.Clarity} onChange={handleChange} />
      </label>
      <label>
        Hardness:
        <input type="number" name="Hardness" value={formData.Hardness} onChange={handleChange} />
      </label>
      <label>
        Melting Time:
        <input type="number" name="meltingTime" value={formData.meltingTime} onChange={handleChange} />
      </label>
      <label>
        Notes:
        <textarea name="Notes" value={formData.Notes} onChange={handleChange} />
      </label>
      <button type="submit" >Submit</button>
    </form>
  );
};

export default IceForm;