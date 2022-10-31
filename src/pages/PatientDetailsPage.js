import axios from 'axios';
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
                    <p>Date of birth: <strong>{patient.dateOfBirth}</strong></p>
                    <p>Email: <strong>{patient.email}</strong></p>
                    <p>Phone: <strong>{patient.phone}</strong></p>
                    <p>Therapist: <strong>{patient.therapist.name}</strong></p>
                    Diagnoses: <ul>{
                        patient.diagnoses.map(diagnosis => {
                            return (
                                
                                <li key={patientId + diagnosis}><strong>{diagnosis}</strong></li>
                            )
                        })
                    }
                    </ul>
                    Medications: <ul>{
                        patient.medications.map(medication => {
                            return (
                                <li key={patientId + medication}><strong>{medication}</strong></li>
                            )
                        })
                    }
                    </ul>

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