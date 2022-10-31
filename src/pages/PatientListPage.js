import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddPatient from "./../components/AddPatient"
import { Collapse } from 'antd';

const API_URL = process.env.REACT_APP_API_URL;

const { Panel } = Collapse;

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
      <h1>Patients</h1>

      <Collapse>
        <Panel header=<h3>Create new Patient</h3> key="1">
          <AddPatient refreshPatients={getAllPatients} />
        </Panel>
      </Collapse>

      <h3>All patients</h3>
      {patients.map(patient => {
        return (

          <div key={patient._id}>
            <h3>Name: {patient.name}, {patient.surname}</h3>
            <p>Date of birth: {patient.dateOfBirth} </p>
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