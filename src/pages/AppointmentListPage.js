import { Button, Col, Divider, Radio, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentsCalendar from "../components/AppointmentsCalendar";
import getAuthHeader from "../utils/token";

function AppointmentListPage() {
  const [appointments, setAppointments] = useState(null);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [btnType, setBtnType] = useState("primary");

  const fetchAppointments = () => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/appointments`, getAuthHeader())
      .then((response) => setAppointments(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const showHideForm = () => {
    setAppointmentToEdit(null);
    setShowForm((prevState) => !prevState);
    showForm ? setBtnType("primary") : setBtnType("");
  };

  const editAppointment = (appointment) => {
    setAppointmentToEdit(appointment);
    setShowForm(true);
    setBtnType("");
  };

  return (
    <div>
      {showForm && (
        <AppointmentCard
          appointmentToEdit={appointmentToEdit}
          refreshAppointments={fetchAppointments}
          setShowForm={setShowForm}
        ></AppointmentCard>
      )}
      <Row>
        <Col span={8} offset={8}>
          <Button type={btnType} size="large" onClick={showHideForm}>
            {showForm ? "Hide Form" : "Add new Appointment"}
          </Button>
        </Col>
      </Row>
      <br />
      <Divider>Appointments calendar</Divider>
      <AppointmentsCalendar
        appointments={appointments}
        refreshAppointments={fetchAppointments}
        editAppointment={editAppointment}
        showForm={showForm}
      ></AppointmentsCalendar>
    </div>
  );
}

export default AppointmentListPage;
