import axios from "axios";
import { useEffect, useState } from "react";

function AppointmentListPage(props) {
  const [appointments, setAppointments] = useState(null);

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

  return (
    <div className="LoginPage">
      <h1>This is the AppointmentListPage</h1>
      {appointments &&
        appointments.map((e) => {
          return (
            <div
              key={e._id}
              style={{
                border: "1px solid grey",
                margin: "1rem auto",
                width: "50%",
              }}
            >
              <h3>{e.date}</h3>
              <p>{e.patient?.name}</p>
              <p>{e.notes}</p>
            </div>
          );
        })}
    </div>
  );
}

export default AppointmentListPage;
