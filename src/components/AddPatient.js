import React from 'react';
import { Input, DatePicker, Divider, Button, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import axios from "axios";
import "./AddPatient.css";

const API_URL = process.env.REACT_APP_API_URL;

function AddPatient({ refreshPatients }) {
  const [form] = Form.useForm();

  const handleSubmit = (newPatient) => {
    const storedToken = localStorage.getItem('authToken');
    axios
      .post(
        `${API_URL}/api/patients`,
        newPatient,
        {
          headers: { Authorization: `Bearer ${storedToken}` }
        }
      )
      .then(() => {
        // Reset the form items
        form.resetFields();

        refreshPatients();
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className="AddPatient">
      <Form
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 4 }}
        onFinish={handleSubmit}
        autoComplete="off"
        initialValues={{
          name: "",
          surname: "",
          dateOfBirth: "",
          email: "",
          phone: "",
          medications: "",
          diagnoses: ""
        }}
      >
        <Divider>Add Patient</Divider>

        <Form.Item
          label="Name:"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please provide the name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Surname:"
          name="surname"
          rules={[
            {
              required: true,
              message: 'Please provide the surname!',
            },
          ]}
        >
          <Input />

        </Form.Item>

        <Form.Item
          label="Date of birth:"
          name="dateOfBirth"
          className="align-left"
          rules={[{ required: true, message: "Please select the date of birth!" }]}
        >
          <DatePicker/>
        </Form.Item>

        <Form.Item
          label="Email:"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid email address!',
            },
            {
              required: true,
              message: 'Please input the email address!',
            },
          ]}
        >
          <Input />

        </Form.Item>

        <Form.Item
          label="Phone:"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Please provide the phone number!',
            },
          ]}
        >
          <Input />

        </Form.Item>

        <Form.Item label="Diagnoses:">
          <TextArea
            name="diagnoses"
          />
        </Form.Item>

        <Form.Item label="Medications:" name="medications">
          <TextArea/>
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