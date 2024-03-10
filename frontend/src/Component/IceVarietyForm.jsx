import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const IceVarietyForm = () => {
  const { id } = useParams();
  const [iceData, setIceData] = useState({
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

  useEffect(() => {
    fetchData(id);
  }, [id]);
  const navigate  = useNavigate()
  const fetchData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:1000/getice/${id}`);
      console.log(response.data)
      setIceData(response.data);
      // setFormData(...data.filter(obj => obj._id == id))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIceData({ ...iceData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:1000/updateicecravings/${id}`, iceData);
      navigate("/home")
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Ice Variety:</label>
        <input type="text" name="iceVariety" value={iceData.iceVariety} onChange={handleChange} />
      </div>
      <div>
        <label>Price:</label>
        <input type="text" name="Price" value={iceData.Price} onChange={handleChange} />
      </div>
      <div>
        <label>Availability:</label>
        <input type="text" name="Availability" value={iceData.Availability} onChange={handleChange} />
      </div>
      <div>
        <label>Density:</label>
        <input type="number" name="Density" value={iceData.Density} onChange={handleChange} />
      </div>
      <div>
        <label>Temperature:</label>
        <input type="number" name="Temperature" value={iceData.Temperature} onChange={handleChange} />
      </div>
      <div>
        <label>Clarity:</label>
        <input type="text" name="Clarity" value={iceData.Clarity} onChange={handleChange} />
      </div>
      <div>
        <label>Hardness:</label>
        <input type="number" name="Hardness" value={iceData.Hardness} onChange={handleChange} />
      </div>
      <div>
        <label>Melting Time:</label>
        <input type="number" name="meltingTime" value={iceData.meltingTime} onChange={handleChange} />
      </div>
      <div>
        <label>Notes:</label>
        <textarea name="Notes" value={iceData.Notes} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default IceVarietyForm;
