import React, { useEffect, useState } from 'react'
// import data from './data.json'
import axios from "axios"
import { useNavigate , Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:1000/getallIce');
              setData(response.data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();
  }, []);

  const handleDelete = async (id) =>{
    try {
        const res = await axios.delete(`http://localhost:1000/deleteicecravings/${id}`)
        console.log(res.data);
        setData(
            data.filter((obj) =>{
                return obj._id != id
            })
        )
      } catch (error) {
        console.error('Error:', error);
      }
}
  console.log(data);
  return (
    <>
        <table>
        <thead>
            <tr>
                <th>Ice Variety</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Density</th>
                <th>Temprature</th>
                <th>Clarity</th>
                <th>Hardness</th>
                <th>Melting time</th>
                <th>Notes</th>
                <th>Actions</th>
            </tr>
        </thead>
        
        <tbody>
            {data.map((data,index)=>{
                return(


                    
                    <tr key={index}>
                        <td>{data.iceVariety}</td>
                        <td>{data.Price}</td>
                        <td>{data.Availability}</td>
                        <td>{data.Density}</td>
                        <td>{data.Temperature}</td>
                        <td>{data.Clarity}</td>
                        <td>{data.Hardness}</td>
                        <td>{data.meltingTime}</td>
                        <td>{data.Notes}</td>
                        <td><Link to={`/form/${data._id}`}><button>Update</button></Link></td>
                        <td><button onClick={()=>{handleDelete(data._id)}}>Delete</button></td>
                    </tr>
                )
            })}
        </tbody>

    </table>
    <button onClick={() => {navigate("/form")}}>Add items</button>
    </>
  )
}

export default Home;