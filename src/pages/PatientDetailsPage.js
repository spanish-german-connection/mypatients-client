import axios from 'axios';
import moment from "moment/moment";
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import getAuthHeader from "../utils/token";
import "./PatientDetailsPage.css";
import {
    Button,
    Col,
    Divider,
    Form,
    Row,
    Typography,
} from "antd";

const API_URL = process.env.REACT_APP_API_URL;

function PatientDetailsPage() {
    const [patient, setPatient] = useState(null);
    const { patientId } = useParams();

    useEffect(() => {
        fetchPatient();
    }, []);

    const fetchPatient = () => {
        axios
            .get(
                `${API_URL}/api/patients/${patientId}`,
                getAuthHeader()
            )
            .then(response => {
                const onePatient = response.data;
                setPatient(onePatient);
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="PatientDetails">
            {patient && (
                <>
                    <Divider>Patient details</Divider>
                    <Row className="row-patient-detail">
                        {/* <Col className='ctn' span="4" offset="10"> */}
                        <Col>

                            <Typography>
                                <pre>Name: {patient.name}</pre>
                            </Typography>
                            <Typography>
                                <pre>Surname: {patient.surname}</pre>
                            </Typography>
                            <Typography>
                                <pre>Date of birth:   {moment(patient.dateOfBirth).format(
                                    "DD-MMM-YYYY"
                                )}</pre>
                            </Typography>
                            <Typography>
                                <pre>Therapist:   {patient.therapist.name}</pre>
                            </Typography>
                            <Typography>
                                <pre> Email-Address:  {patient.email}</pre>
                            </Typography>
                        </Col>
                    </Row>
                    <Row className="row-patient-detail">
                        <Col>

                            <Typography>
                                <pre>Diagnoses:   {patient.diagnoses}</pre>
                            </Typography>
                            </Col>
                    </Row>
                    <Row className="row-patient-detail">
                        <Col>


                            <Typography>
                                <pre> Medications:   {patient.medications}</pre>
                            </Typography>
                        </Col>
                    </Row>

                    <Link to={`/patient/edit/${patientId}`} >
                        <Button type="primary">Edit Patient</Button>
                    </Link>

                    <Link to="/patients">
                        <Button>Back to Patients</Button>
                    </Link>

                </>
            )}
        </div>
    )
}

export default PatientDetailsPage;