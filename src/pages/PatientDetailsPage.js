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
                        {/* <Col> */}
                            <Col span="8" offset="0">
                            <Typography className="pd-flex">
                                <span className="pd-label">Name:</span>
                                <pre className="align-left">{patient.name}</pre>
                            </Typography>
                            <Typography className="pd-flex">
                                <span className="pd-label">Surname:</span>
                                <pre className="align-left">{patient.surname}</pre>
                            </Typography>
                            <Typography className="pd-flex">
                                <span className="pd-label">Date of birth:</span>
                                <pre className="align-left">{moment(patient.dateOfBirth).format(
                                    "DD-MMM-YYYY"
                                )}</pre>
                            </Typography>
                            <Typography className="pd-flex">
                                <span className="pd-label">Therapist:</span>
                                <pre className="align-left">{patient.therapist.name}</pre>
                            </Typography>

                            <Typography className="pd-flex">
                                <span className="pd-label">Email-Address:</span>
                                <pre className="align-left">{patient.email}</pre>
                            </Typography>


                            <Typography className="pd-flex">
                                <span className="pd-label">Diagnoses:</span>
                                <pre className="align-left">
                                    <span dangerouslySetInnerHTML={{ __html: patient.diagnoses }}>
                                    </span>
                                </pre>
                            </Typography>
                            <Typography className="pd-flex">
                                <span className="pd-label">Medications:</span>
                                <pre className="align-left">
                                    <span dangerouslySetInnerHTML={{ __html: patient.medications }}>
                                    </span>
                                </pre>



                            </Typography>

                        </Col>
                    </Row>

                    <Link to={`/patient/edit/${patientId}`} >
                        <Button className='btn-margin' type="primary">Edit Patient</Button>
                    </Link>

                    <Link to="/patients">
                        <Button className='btn-margin'>Back</Button>
                    </Link>



                </>
            )}
        </div>
    )
}

export default PatientDetailsPage;