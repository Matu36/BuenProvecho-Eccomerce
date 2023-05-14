import { useState } from "react";
import AddEventForm from "./addEventForm";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import { Box } from "@chakra-ui/react";

moment.locale("es");
const localizer = momentLocalizer(moment);

export default function Calendario() {
  const [events, setEvents] = useState([]);

  function handleAddEvent(newEvent) {
    setEvents([...events, newEvent]);
  }

  function handleEditEvent(eventId, updatedEvent) {
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        return { ...event, ...updatedEvent };
      } else {
        return event;
      }
    });
    setEvents(updatedEvents);
  }

  function handleDeleteEvent(eventId) {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  }

  const messages = {
    allDay: "Todo el día",
    previous: "<",
    next: ">",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "No hay eventos en este rango.",
    showMore: (total) => `+ Ver más (${total})`,
  };

  function Event({ event }) {
    return (
      <Box>
        <strong>{event.title}</strong>
        <div>{event.start.format("MMMM Do YYYY, h:mm:ss a")}</div>
        <div>{event.end.format("MMMM Do YYYY, h:mm:ss a")}</div>
        <button
          onClick={() => handleEditEvent(event.id, { title: "Nuevo título" })}
        >
          Editar
        </button>
        <button onClick={() => handleDeleteEvent(event.id)}>Eliminar</button>
      </Box>
    );
  }

  return (
    <Box
      marginTop="3rem"
      maxWidth={{ base: "100%" }}
      marginLeft={{ base: "-3.5rem", md: "4rem" }}
      border="solid 3px gray"
      borderRadius="5%"
    >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
        components={{ event: Event }}
        messages={messages}
      />
      <AddEventForm onAddEvent={handleAddEvent} />
    </Box>
  );
}
