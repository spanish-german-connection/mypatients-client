import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import getAuthHeader from "../utils/token";

moment.locale("en", {
  week: {
    dow: 1,
    doy: 1,
  },
});
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

function AppointmentsCalendar({
  appointments,
  refreshAppointments,
  editAppointment,
  showForm,
}) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, [appointments]);

  const fetchEvents = () => {
    if (appointments) {
      const events = appointments.map((appointment) => {
        return {
          start: moment(appointment.date).toDate(),
          end: moment(appointment.date).add(1, "hours").toDate(),
          title: appointment.patient.name + " " + appointment.patient.surname,
          resource: appointment, //we will store the appointmentId here
        };
      });
      setEvents(events);
    }
  };

  const updateAppointment = (appointment, date) => {
    return axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/appointments/${appointment._id}`,
        { ...appointment, date },
        getAuthHeader()
      )
      .then((response) => {
        refreshAppointments();
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEventDrop = (data) => {
    const { start, end, event } = data;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    setEvents(nextEvents);

    updateAppointment(event.resource, start)
      .then((response) => {
        if (!response || response.statusText !== "OK") {
          setEvents(events);
        }
      })
      .catch((error) => {
        setEvents(events);
        console.log(error);
      });
  };

  const onDoubleClickEvent = (data) => {
    const { resource } = data;
    editAppointment(resource);
  };

  return (
    <div className="App">
      <DnDCalendar
        // views={["month", "week", "day", "agenda"]}
        views={["week", "day"]}
        className="big-calendar"
        defaultDate={moment().toDate()}
        defaultView={"week"}
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onDoubleClickEvent={onDoubleClickEvent}
        min={moment("8:00am", "h:mma").toDate()}
        max={moment("22:00pm", "H:mma").toDate()}
        draggableAccessor={() => !showForm}
        resizableAccessor={() => false}
        formats={{
          timeGutterFormat: (date, culture, localizer) =>
            localizer.format(date, "HH:mm", culture),
          eventTimeRangeFormat: (range) =>
            `${localizer.format(range.start, "HH:mm")} – ${localizer.format(
              range.end,
              "HH:mm"
            )}`,
        }}
      />
    </div>
  );
}

export default AppointmentsCalendar;
