import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import moment from "moment/moment";
import { Link } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";
import getAuthHeader from "../utils/token";
import TextEditor from "../components/TextEditor";
import {
    Alert,
    Button,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    Row,
} from "antd";

const API_URL = process.env.REACT_APP_API_URL;

function EditPatientPage() {
    const [form] = Form.useForm();
    const { patientId } = useParams();
    const [patient, setPatient] = useState(null);
    
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPatient();
    }, []);


    const fetchPatient = () => {
        axios
            .get(
                `${API_URL}/api/patients/${patientId}`,
                getAuthHeader()
            )
            .then((response) => {
                const onePatient = response.data;
                setPatient(onePatient);
                setFields(onePatient);
            })
            .catch((error) => {
                console.log(error);
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    }

    const setFields = (onePatient) => {
        form.setFieldsValue({
            name: onePatient.name,
            surname: onePatient.surname,
            dateOfBirth: moment(onePatient.dateOfBirth),
            therapist: onePatient.therapist.name,
            email: onePatient.email,
            phone: onePatient.phone,
            diagnoses: onePatient.diagnoses,
            medications: onePatient.medications
        });
    }

    const handleSubmit = (inputs) => {
        const updatedPatient = inputs;
        updatedPatient.therapist = patient.therapist;
        axios
            .put(
                `${API_URL}/api/patients/${patientId}`,
                updatedPatient,
                getAuthHeader()
            )
            .then((response) => {
                navigate(`/patients/${patientId}`)
            })
            .catch((error) => {
                console.log(error);
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    return (
        <div className="EditPatientPage">
            {errorMessage && (
                <Row>
                    <Col span="8" offset="8">
                        <Alert
                            message="There was an error"
                            description={errorMessage}
                            type="error"
                            showIcon
                        />
                    </Col>
                </Row>
            )}

            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Divider>Edit Patient</Divider>
                <Form.Item
                    label="Name:"
                    name="name"
                    className="align-left"
                    rules={[
                        {
                            required: true,
                            message: "Please provide the name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Surname:"
                    name="surname"
                    className="align-left"
                    rules={[
                        {
                            required: true,
                            message: "Please provide the surname!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Date of birth:"
                    name="dateOfBirth"
                    className="align-left"
                    rules={[
                        { required: true, message: "Please select the date of birth!" },
                    ]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    label="Therapist:"
                    name="therapist"
                    className="align-left"
                    
                >
                    <Input 
                        disabled={true}
                    />
                </Form.Item>

                <Form.Item
                    label="Email:"
                    name="email"
                    className="align-left"
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid email address!",
                        },
                        {
                            required: true,
                            message: "Please input the email address!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Phone:"
                    name="phone"
                    className="align-left"
                    rules={[
                        {
                            required: true,
                            message: "Please provide the phone number!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Diagnoses:"
                    name="diagnoses"
                    className="align-left"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please provide a diagnosis or a provisional indication!",
                        },
                    ]}
                >
                    <TextEditor/>
                </Form.Item>

                <Form.Item
                    label="Medications:"
                    name="medications"
                    className="align-left"
                >
                    <TextEditor/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 9, span: 6 }}>
                    <Button type="primary" htmlType="submit" className='btn-margin'>
                        Update
                    </Button>

                    <Link to={`/patients/${patientId}`} className='btn-margin'>
                        <Button>
                            Cancel
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditPatientPage;