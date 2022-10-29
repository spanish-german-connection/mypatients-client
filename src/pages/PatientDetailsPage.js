import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


const API_URL = process.env.REACT_APP_API_URL;

function PatientDetailsPage() {
    const [patient, setPatient] = useState(null);
    const { patientId } = useParams();

    useEffect(() => {
        fetchPatientDetails();
    }, []);

    const fetchPatientDetails = () => {
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
                    <p>Date of birth: <strong>{patient.dateOfBirth}</strong></p>
                    <p>Email: <strong>{patient.email}</strong></p>
                    <p>Phone: <strong>{patient.phone}</strong></p>
                    <p>Therapist: <strong>{patient.therapist.name}</strong></p>
                    <p>Diagnoses: <strong>{
                        patient.diagnoses.map(diagnosis => {
                            return (
                                <p>{diagnosis}</p>
                            )
                        })
                    }</strong>
                    </p>
                    <p>Medications: <strong>{
                        patient.medications.map(medication => {
                            return (
                                <p>{medication}</p>
                            )
                        })
                    }</strong>
                    </p>

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