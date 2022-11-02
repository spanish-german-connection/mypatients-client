import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import moment from "moment/moment";
import { Link } from "react-router-dom";
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
import TextArea from "antd/lib/input/TextArea";
import getAuthHeader from "../utils/token";


const API_URL = process.env.REACT_APP_API_URL;

function EditPatientPage(props) {

    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();
    const { patientId } = useParams();

    useEffect(() => {
        fetchPatient();
    }, [patientId]);


    const fetchPatient = () => {
        const storedToken = localStorage.getItem('authToken');
        axios
            .get(
                `${API_URL}/api/patients/${patientId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                const onePatient = response.data;
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
            email: onePatient.email,
            phone: onePatient.phone,
            diagnoses: onePatient.diagnoses,
            medications: onePatient.medications
        });
    }


    const handleSubmit = (inputs) => {
        axios
            .put(
                `${API_URL}/api/patients/${patientId}`,
                inputs,
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
                    <Col span="4" offset="10">
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
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 4 }}
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
                    <TextArea />
                </Form.Item>

                <Form.Item
                    label="Medications:"
                    name="medications"
                    className="align-left"
                >
                    <TextArea />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 9, span: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </div>
    );
}

export default EditPatientPage;