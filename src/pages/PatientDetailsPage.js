import { Button, Col, Divider, Row, Typography } from "antd";
import axios from "axios";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import getAuthHeader from "../utils/token";
import "./PatientDetailsPage.css";

const API_URL = process.env.REACT_APP_API_URL;

function PatientDetailsPage() {
  const [patient, setPatient] = useState(null);
  const { patientId } = useParams();

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = () => {
    axios
      .get(`${API_URL}/api/patients/${patientId}`, getAuthHeader())
      .then((response) => {
        const onePatient = response.data;
        setPatient(onePatient);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="PatientDetails">
      {patient && (
        <>
          <Divider>Patient details</Divider>
          <Row>
            <Col span="8" offset="0" className="pd-column-label">
              <span className="pd-label">Name:</span>
            </Col>
            <Col span="8">
              <Typography className="pd-flex">
                <pre className="pd-data align-left">{patient.name}</pre>
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col span="8" offset="0" className="pd-column-label">
              <span className="pd-label">Surname:</span>
            </Col>
            <Col span="8">
              <Typography className="pd-flex">
                <pre className="pd-data align-left">{patient.surname}</pre>
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col span="8" offset="0" className="pd-column-label">
              <span className="pd-label">Date of birth:</span>
            </Col>
            <Col span="8">
              <Typography className="pd-flex">
                <pre className="pd-data align-left">
                  {moment(patient.dateOfBirth).format("DD-MMM-YYYY")}
                </pre>
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col span="8" offset="0" className="pd-column-label">
              <span className="pd-label">Therapist:</span>
            </Col>
            <Col span="8">
              <Typography className="pd-flex">
                <pre className="pd-data align-left">
                  {patient.therapist.name}
                </pre>
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col span="8" offset="0" className="pd-column-label">
              <span className="pd-label">Email-Address:</span>
            </Col>
            <Col span="8">
              <Typography className="pd-flex">
                <pre className="pd-data align-left">{patient.email}</pre>
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col span="8" offset="0" className="pd-column-label">
              <span className="pd-label">Diagnoses:</span>
            </Col>
            <Col span="8">
              <Typography className="pd-flex">
                <pre className="pd-data align-left">
                  <span
                    className="pd-large-text"
                    dangerouslySetInnerHTML={{
                      __html: patient.diagnoses ? patient.diagnoses : "None",
                    }}
                  ></span>
                </pre>
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col span="8" offset="0" className="pd-column-label">
              <span className="pd-label">Medications:</span>
            </Col>
            <Col span="8">
              <Typography className="pd-flex">
                <pre className="pd-data align-left pd-large-text">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: patient.medications
                        ? patient.medications
                        : "None",
                    }}
                  ></span>
                </pre>
              </Typography>
            </Col>
          </Row>

          <Link to={`/patient/edit/${patientId}`}>
            <Button className="btn-margin" type="primary">
              Edit Patient
            </Button>
          </Link>

          <Link to="/patients">
            <Button className="btn-margin">Back</Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default PatientDetailsPage;
