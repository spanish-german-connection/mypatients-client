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
  const [btnType, setBtnType] = useState("primary");

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


  const showHideForm = () => {
    setShowForm((prevState) => {
      return !prevState;
    })
    if (showForm) {
      setBtnType("primary");
    } else {
      setBtnType("")
    }
  }

  return (
    <div>

      {showForm && (
        <AddPatient refreshPatients={getAllPatients} />
      )}

      <Row>
        <Col span={8} offset={8}>
          <Button type={btnType} size="large" onClick={showHideForm}>
            {showForm ? "Hide Form" : "Add new patient"}
          </Button>
        </Col>
      </Row>
      <br />

      <Divider>All patients</Divider>
      {patients.map(patient => {
        return (

          <div key={patient._id}>
            <h3>{patient.name}, {patient.surname}</h3>
            <p>Date of birth: {`${moment(patient.dateOfBirth).format(
              "DD-MMM-YYYY"
            )}`}</p>

            <Link to={`/patients/${patient._id}`}>
              <Button>Details</Button>
            </Link>

          </div>
        )
      })}

    </div>
  )

}

export default PatientListPage;