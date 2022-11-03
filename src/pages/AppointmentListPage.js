import { Col, Button, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentList from "../components/AppointmentList";
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
      <AppointmentList
        appointments={appointments}
        editAppointment={editAppointment}
      ></AppointmentList>
    </div>
  );
}

export default AppointmentListPage;
