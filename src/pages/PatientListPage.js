import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import AddPatient from "./../components/AddPatient";
import { Divider, Button, Row, Col, Table, Tag, Space } from "antd";
import getAuthHeader from "../utils/token";
import Search from "../components/Search";

const API_URL = process.env.REACT_APP_API_URL;

function PatientListPage() {
  const [patientsFromDB, setPatientsFromDB] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [btnType, setBtnType] = useState("primary");
  // List of patients to render, list can be filtered because of search:
  const [listOfPatients, setListOfPatients] = useState([]);

  const getAllPatients = () => {
    axios
      .get(`${API_URL}/api/patients`, getAuthHeader())
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
  };

  const searchPatient = (query) => {
    setListOfPatients(() => {
      return query !== ""
        ? patientsFromDB.filter(
            (patient) =>
              patient.name.toLowerCase().includes(query.toLowerCase()) ||
              patient.surname.toLowerCase().includes(query.toLowerCase())
          )
        : patientsFromDB;
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Age",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (_, { dateOfBirth }) => (
        <>{moment().diff(dateOfBirth, "years")}</>
      ),
    },
    {
      title: "Added on",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, { createdAt }) => (
        <>{moment(createdAt).format("DD-MMM-YYYY")}</>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/patients/${record._id}`} style={{ textAlign: "center" }}>
            <Button>Details</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="PatientListPage">
      {showForm && <AddPatient refreshPatients={getAllPatients} />}

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
      <Table
        className="patient-list"
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={listOfPatients}
        bordered
      />
    </div>
  );
}

export default PatientListPage;
