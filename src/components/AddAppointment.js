import { DatePicker, Divider, Button, Form, Radio, Select, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import "./AddAppointment.css";

function AddAppointment({ refreshAppointments }) {
  console.log("RENDERING COMPONENT");

  const [patients, setPatients] = useState(null);
  const [patientId, setPatientId] = useState("");
  const [patientFullName, setPatientFullName] = useState("");
  const [date, setDate] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [recurring, setRecurring] = useState("");
  const [notes, setNotes] = useState("");

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

  const handleSubmit = (e) => {
    // console.log("===========", "handleSubmit");
    const newAppointment = {
      patientId,
      date,
      isPaid,
      recurring,
      notes,
    };
    console.log(newAppointment);

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
        console.log("===========", "then");
        // Reset the state
        setPatientId("");
        setPatientFullName("");
        setDate("");
        setIsPaid(false);
        setRecurring("");
        setNotes("");

        refreshAppointments && refreshAppointments();
      })
      .catch((error) => console.log(error));
  };

  // const onSearch = (value) => {
  //   console.log("search:", value);
  // };

  const onChangeDate = (value, dateString) => {
    // console.log("Selected Time: ", value._d);
    // console.log("Formatted Selected Time: ", dateString);
    setDate(value?._d);
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  return (
    <Form
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 4 }}
      onFinish={handleSubmit}
      // autoComplete="off"
    >
      <Divider>Add Appointment</Divider>
      <Form.Item
        label="Patient:"
        name="select"
        rules={[{ required: true, message: "Please select a patient!" }]}
        className="align-left"
      >
        <Select
          name="patient"
          placeholder="Select a patient"
          optionFilterProp="children"
          showSearch
          defaultValue={patientFullName}
          onChange={(value) => setPatientId(value)}
          // onSearch={onSearch}

          filterOption={(input, option) =>
            option?.children.toLowerCase().includes(input.toLowerCase())
          }
          disabled={false}
        >
          {patients &&
            patients.map((patient) => (
              <Select.Option
                key={patient._id}
                value={patient._id}
                // selected={patient._id === patientId}
                required
              >
                {`${patient.name} ${patient.surname}`}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Date:"
        className="align-left"
        name="datepicker"
        rules={[{ required: true, message: "Please select a date!" }]}
      >
        <DatePicker
          showTime={{
            defaultValue: moment("09:00", "HH:mm"),
            format: "HH:mm",
          }}
          onChange={onChangeDate}
          // defaultValue={moment(appointment)}
          // onOk={onOk}
        />
      </Form.Item>
      <Form.Item label="is Paid?" className="align-left">
        <Switch
          name="isPaid"
          defaultChecked={isPaid}
          onChange={(value) => setIsPaid(value)}
        />
      </Form.Item>
      <Form.Item
        label="Recurring?"
        className="align-left"
        name="radiogroup"
        rules={[
          { required: true, message: "Please select if it is recurring!" },
        ]}
      >
        <Radio.Group
          onChange={(e) => setRecurring(e.target.value)}
          value={recurring}
        >
          <Radio value={"none"}>none</Radio>
          <Radio value={"weekly"}>weekly</Radio>
          <Radio value={"biweekly"}>biweekly</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Notes:">
        <TextArea
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
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
