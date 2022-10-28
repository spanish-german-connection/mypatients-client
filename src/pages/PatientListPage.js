import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;


function PatientListPage() {
  const [patients, setPatients] = useState([]);
 
  
  const getAllPatients = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    // Send the token through the request "Authorization" Headers
    axios
      .get(
        `${API_URL}/api/patients`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => setPatients(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllPatients();
  }, []);


  return (
    <div>
      <h1>All Patients</h1>
      {patients.map(patient => {
        return (

          <div key={patient._id}>
            <h2>Name: {patient.name}, {patient.surname}</h2>

            <Link to={`/patients/${patient._id}`}>
                <button>Details</button>
            </Link>

          </div>
        )
      })}

    </div>
  )
    
}

export default PatientListPage;