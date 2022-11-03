import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import AddPatient from "./../components/AddPatient"
import { Divider, Button, Row, Col } from 'antd';
import getAuthHeader from "../utils/token";
import Search from '../components/Search';

const API_URL = process.env.REACT_APP_API_URL;



function PatientListPage() {
  const [patientsFromDB, setPatientsFromDB] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [btnType, setBtnType] = useState("primary");
  // List of patients to render, list can be filtered because of search:
  const [listOfPatients, setListOfPatients] = useState([]);

  const getAllPatients = () => {
    axios
      .get(
        `${API_URL}/api/patients`, getAuthHeader()
      )
      .then((response) => {
        setPatientsFromDB(response.data);
        setListOfPatients(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  const showHideForm = () => {
    setShowForm((prevState) => !prevState);
    showForm ? setBtnType("primary") : setBtnType("");
  }

  const searchPatient = (query) => {
    setListOfPatients(() => {
      return query !== ''
        ? patientsFromDB.filter((patient) =>
          patient.name.toLowerCase().includes(query.toLowerCase()) 
        )
        : patientsFromDB;
    });
  };

  return (
    <div className="PatientListPage">

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

      <Row>
        <Col span="8" offset="8">
          <Search callbackToSearch={searchPatient} className="search-bar" />
        </Col>
      </Row>
      <Divider>Patients</Divider>


      {listOfPatients.map(patient => {
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