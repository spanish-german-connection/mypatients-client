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
import axios from "axios";
import React, { useState } from "react";
import TextEditor from "./TextEditor";

const API_URL = process.env.REACT_APP_API_URL;

function AddPatient({ refreshPatients }) {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (newPatient) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/api/patients`, newPatient, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        // Reset the form items
        form.resetFields();

        refreshPatients();
        setErrorMessage(null);
      })
      .catch((error) => {
        console.log(error);
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="AddPatient">
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
        initialValues={{
          name: "",
          surname: "",
          dateOfBirth: "",
          email: "",
          phone: "",
          diagnoses: "",
          medications: ""
        }}
      >
        <Divider>Add Patient</Divider>
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddPatient;
