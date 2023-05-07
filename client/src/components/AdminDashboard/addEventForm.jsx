import { useState } from 'react';
import moment from 'moment';
import {Box, Button,FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function AddEventForm({ onAddEvent }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(moment());
  const [end, setEnd] = useState(moment());

  function handleSubmit(event) {
    event.preventDefault();
    const newEvent = {
      title,
      start,
      end,
    };
    onAddEvent(newEvent);
    setTitle('');
    setStart(moment());
    setEnd(moment());
  }

  return (
    <Box borderWidth="1px" p="4" borderRadius="md" >
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Título:</FormLabel>
          <Input type="text" value={title} onChange={event => setTitle(event.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Inicio:</FormLabel>
          <Input type="datetime-local" value={start.format('YYYY-MM-DDTHH:mm:ss')} onChange={event => setStart(moment(event.target.value))} />
        </FormControl>
        <FormControl>
          <FormLabel>Fin:</FormLabel>
          <Input type="datetime-local" value={end.format('YYYY-MM-DDTHH:mm:ss')} onChange={event => setEnd(moment(event.target.value))} />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt="4">
          Agregar evento
        </Button>
      </form>
    </Box>
  );
}
