import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import AddPatient from "./../components/AddPatient"
import { Divider, Button, Row, Col } from 'antd';
import getAuthHeader from "../utils/token";

const API_URL = process.env.REACT_APP_API_URL;



function PatientListPage() {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [btnType, setBtnType] = useState("primary");

  const getAllPatients = () => {
    axios
      .get(
        `${API_URL}/api/patients`, getAuthHeader()
      )
      .then((response) => setPatients(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  const showHideForm = () => {
    setShowForm((prevState) => !prevState);
    showForm ? setBtnType("primary") : setBtnType("");
  }

  return (
    <div>

      {showForm && (
        <AddPatient refreshPatients={getAllPatients} />
      )}

      <Row>
        <Col span={8} offset={8}>
          <Button type={btnType} size="large" onClick={showHideForm}>
            {showForm ? "Hide Form" : "Add new Patient"}
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