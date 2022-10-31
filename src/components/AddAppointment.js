import { DatePicker, Divider, Button, Form, Radio, Select, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import "./AddAppointment.css";

function AddAppointment({ refreshAppointments }) {
  const [patients, setPatients] = useState(null);
  const [form] = Form.useForm();

  const fetchPatients = () => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/patients`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setPatients(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSubmit = (newAppointment) => {
    const token = localStorage.getItem("authToken");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/appointments`,
        newAppointment,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        // Reset the form items
        form.resetFields();

        refreshAppointments();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 4 }}
      onFinish={handleSubmit}
      autoComplete="off"
      initialValues={{
        patientId: "",
        date: "",
        isPaid: false,
        recurring: "",
        notes: "",
      }}
    >
      <Divider>Add Appointment</Divider>
      <Form.Item
        label="Patient:"
        name="patient"
        rules={[{ required: true, message: "Please select a patient!" }]}
        className="align-left"
      >
        <Select
          placeholder="Select a patient"
          optionFilterProp="children"
          showSearch
          value={"asdfasdfasdfasdf"}
          filterOption={(input, option) =>
            option?.children.toLowerCase().includes(input.toLowerCase())
          }
          disabled={false}
        >
          {patients &&
            patients.map((patient) => (
              <Select.Option key={patient._id} value={patient._id} required>
                {`${patient.name} ${patient.surname}`}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Date:"
        className="align-left"
        name="date"
        rules={[{ required: true, message: "Please select a date!" }]}
      >
        <DatePicker
          showTime={{
            defaultValue: moment("09:00", "HH:mm"),
            format: "HH:mm",
          }}
        />
      </Form.Item>
      <Form.Item
        label="is Paid?"
        name="isPaid"
        className="align-left"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        label="Recurring?"
        className="align-left"
        name="racurring"
        rules={[
          { required: true, message: "Please select if it is recurring!" },
        ]}
      >
        <Radio.Group>
          <Radio value="none">none</Radio>
          <Radio value="weekly">weekly</Radio>
          <Radio value="biweekly">biweekly</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Notes:" name="notes">
        <TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 9, span: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddAppointment;
