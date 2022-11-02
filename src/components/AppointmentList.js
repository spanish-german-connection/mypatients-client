import { Button, Divider } from "antd";
import moment from "moment/moment";
const parse = require("html-react-parser");

function AppointmentList({ appointments, editAppointment }) {
  return (
    <>
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
              <h6>{`${moment(appointment.date).format(
                "DD-MMM-YYYY - HH:mm a"
              )}`}</h6>
              <p>
                {appointment.patient?.name + " " + appointment.patient?.surname}
              </p>
              {/* {parse(appointment.notes).slice(0, 32)} */}
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
    </>
  );
}

export default AppointmentList;
