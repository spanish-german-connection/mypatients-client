import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import AddPatient from "./../components/AddPatient"
import { Divider, Button, Radio, Row, Col } from 'antd';

const API_URL = process.env.REACT_APP_API_URL;



function PatientListPage() {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

  const showHideForm = () => setShowForm((prevState) => !prevState);


  return (
    <div>
      <h1>Patients</h1>


      {showForm && (
        <AddPatient refreshPatients={getAllPatients} />
      )}

      <Row>
        <Col span={8} offset={8}>
          <Button value="large" onClick={showHideForm}>
            {showForm ? "Hide Form" : "Add new patient"}
          </Button>
        </Col>
      </Row>
      <br />

      <Divider>All patients</Divider>
      {patients.map(patient => {
        return (

          <div key={patient._id}>
            <h3>Name: {patient.name}, {patient.surname}</h3>
            <p>Date of birth: {`${moment(patient.dateOfBirth).format(
                "DD-MMM-YYYY"
              )}`}</p>

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