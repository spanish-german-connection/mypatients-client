import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./AppointmentsCalendar.css";

moment.locale("en", {
  week: {
    dow: 1,
    doy: 1,
  },
});
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

class AppointmentsCalendar extends Component {
  state = {
    events: [],
  };

  initializeAppointments = () => {
    console.log("===========", "initializeAppointments");
    const { appointments } = this.props;
    if (appointments) {
      this.state.events = this.props.appointments.map((appointment) => {
        return {
          start: moment(appointment.date).toDate(),
          end: moment(appointment.date).add(1, "hours").toDate(),
          title: appointment.patient.name + " " + appointment.patient.surname,
          resource: appointment, //we will store the appointmentId here
        };
      });
    }
  };

  onEventDrop = (data) => {
    console.log("data>>>", data);
    const { start, end, event } = data;

    const { events } = this.state;
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents,
    });
  };

  onDoubleClickEvent = (data) => {
    const { resource } = data;
    this.props.editAppointment(resource);
  };

  render() {
    console.log("RENDERING");
    this.initializeAppointments();

    return (
      <div className="App">
        <DnDCalendar
          // views={["month", "week", "day", "agenda"]}
          views={["week", "day"]}
          className="big-calendar"
          defaultDate={moment().toDate()}
          defaultView={"week"}
          events={this.state.events}
          localizer={localizer}
          onEventDrop={this.onEventDrop}
          onDoubleClickEvent={this.onDoubleClickEvent}
          min={moment("8:00am", "h:mma").toDate()}
          max={moment("22:00pm", "H:mma").toDate()}
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
}

export default AppointmentsCalendar;
