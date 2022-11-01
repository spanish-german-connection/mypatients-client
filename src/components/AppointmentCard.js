import {
  DatePicker,
  Divider,
  Button,
  Form,
  Radio,
  Select,
  Switch,
  Input,
  Modal,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import getAuthHeader from "../utils/token";
import "./AppointmentCard.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";

function AppointmentCard({
  setShowForm,
  appointmentToEdit,
  refreshAppointments,
}) {
  const [patients, setPatients] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    appointmentToEdit &&
      form.setFieldsValue({
        id: appointmentToEdit._id,
        patientId: appointmentToEdit.patient._id,
        date: moment(appointmentToEdit.date),
        isPaid: appointmentToEdit.isPaid,
        recurring: appointmentToEdit.recurring,
        notes: appointmentToEdit.notes,
      });
  }, [appointmentToEdit]);

  const fetchPatients = () => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/patients`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setPatients(response.data))
      .catch((error) => console.log(error));
  };

  const initializeForm = () => {
    form.resetFields();
    setShowForm(false);
    refreshAppointments();
  };

  const handleSubmit = (inputs) => {
    if (appointmentToEdit) {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/appointments/${inputs.id}`,
          inputs,
          getAuthHeader()
        )
        .then(() => initializeForm())
        .catch((error) => console.log(error));
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/appointments`,
          inputs,
          getAuthHeader()
        )
        .then(() => initializeForm())
        .catch((error) => console.log(error));
    }
  };

  const deleteAppointment = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/appointments/${appointmentToEdit?._id}`,
        getAuthHeader()
      )
      .then(() => initializeForm())
      .catch((error) => console.log(error));
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this appointment?",
      icon: <ExclamationCircleOutlined />,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        deleteAppointment();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
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
      <Form.Item hidden name="id">
        <Input type="hidden" />
      </Form.Item>
      <Form.Item
        label="Patient:"
        name="patientId"
        rules={[{ required: true, message: "Please select a patient!" }]}
        className="align-left"
      >
        <Select
          placeholder="Select a patient"
          optionFilterProp="children"
          showSearch
          // value={"test"}
          filterOption={(input, option) =>
            option?.children.toLowerCase().includes(input.toLowerCase())
          }
          disabled={appointmentToEdit}
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
        name="recurring"
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
          {appointmentToEdit ? "Update" : "Create"}
        </Button>
        {appointmentToEdit && (
          <Button onClick={showDeleteConfirm} danger>
            Delete
          </Button>
        )}
      </Form.Item>
    </Form>
  );
}

export default AppointmentCard;
