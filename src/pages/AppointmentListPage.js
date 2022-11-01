import { Button, Col, Divider, Radio, Row } from "antd";
import axios from "axios";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import getAuthHeader from "../utils/token";

function AppointmentListPage() {
  const [appointments, setAppointments] = useState(null);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
          <Radio.Button value="large" onClick={showHideForm}>
            {showForm ? "Hide Form" : "Add New Appointment"}
          </Radio.Button>
        </Col>
      </Row>
      <br />

      <Divider>Appointments List</Divider>
      {/* <p>Total appointments {appointments && appointments.length}</p> */}
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
              <Button
                onClick={() => {
                  editAppointment(appointment);
                }}
              >
                Details
              </Button>
            </div>
          );
        })}
    </div>
  );
}

export default AppointmentListPage;
