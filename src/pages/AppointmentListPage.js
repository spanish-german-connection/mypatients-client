import { Button, Col, Divider, Radio, Row } from "antd";
import axios from "axios";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddAppointment from "../components/AddAppointment";

function AppointmentListPage() {
  const [appointments, setAppointments] = useState(null);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchAppointments = () => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setAppointments(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const showHideForm = () => setShowForm((prevState) => !prevState);

  return (
    <div>
      {showForm && (
        <AddAppointment
          refreshAppointments={fetchAppointments}
        ></AddAppointment>
      )}

      <Row>
        <Col span={8} offset={8}>
          <Radio.Button value="large" onClick={showHideForm}>
            {showForm ? "Hide Form" : "Add New Appointment"}
          </Radio.Button>
        </Col>
      </Row>
      <br />

      <Divider>Appointments List</Divider>
      <p>Total appointments {appointments && appointments.length}</p>
      {appointments &&
        appointments.map((appointment) => {
          return (
            <div
              className="AppointmentList"
              key={appointment._id}
              style={{
                border: "1px solid grey",
                margin: "1rem auto",
                width: "50%",
              }}
            >
              <h3>{`${moment(appointment.date).format(
                "DD-MMM-YYYY - HH:mm a"
              )}`}</h3>
              <p>
                {appointment.patient?.name + " " + appointment.patient?.surname}
              </p>
              <p>{`${appointment.notes?.slice(0, 12)}...`}</p>
              <Link to={`/appointments/${appointment._id}`}>
                <Button>Details</Button>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default AppointmentListPage;
