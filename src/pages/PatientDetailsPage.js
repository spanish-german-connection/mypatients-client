import axios from 'axios';
import moment from "moment/moment";
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


const API_URL = process.env.REACT_APP_API_URL;

function PatientDetailsPage() {
    const [patient, setPatient] = useState(null);
    const { patientId } = useParams();

    useEffect(() => {
        getPatientDetails();
    }, []);

    const getPatientDetails = () => {
        const storedToken = localStorage.getItem('authToken');
        axios
            .get(
                `${API_URL}/api/patients/${patientId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
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
                    <h1>{patient.surname} {patient.name}</h1>
                    <p>Date of birth: <strong>
                        {`${moment(patient.dateOfBirth).format(
                            "DD-MMM-YYYY"
                        )}`}
                    </strong></p>
                    <p>Email: <strong>{patient.email}</strong></p>
                    <p>Phone: <strong>{patient.phone}</strong></p>
                    <p>Therapist: <strong>{patient.therapist.name}</strong></p>
                    <p>Diagnosis: <strong>{patient.diagnoses}</strong></p>
                    <p>Medications: <strong>{patient.medications}</strong></p>
                </>
            )}

            <Link to="/patients">
                <button>Back to Patients</button>
            </Link>

            <Link to={`/patient/edit/${patientId}`}>
                <button>Edit Patient</button>
            </Link>

        </div>
    )
}

export default PatientDetailsPage;