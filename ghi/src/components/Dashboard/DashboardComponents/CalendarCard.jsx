import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// MUI Components
import { Dialog, Button, TextField, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import './calendar.css';

function CalendarCard() {
    const [events, setEvents] = useState([
        { id: '1', title: 'Meeting', start: new Date().toISOString(), end: new Date().toISOString(), allDay: false },
    ]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({ title: '', date: new Date() });
    const [currentView, setCurrentView] = useState('dayGridMonth');

    const handleDateClick = (arg) => {
        setSelectedEvent({ ...selectedEvent, date: arg.date });
        setIsDialogOpen(true);
    };

    const addEvent = () => {
        const newEvent = {
            ...selectedEvent,
            id: String(events.length + 1),
            start: selectedEvent.date,
            end: selectedEvent.date,
            allDay: true
        };
        setEvents([...events, newEvent]);
        setIsDialogOpen(false);
        setSelectedEvent({ title: '', date: new Date() }); // Reset selected event
    };

    return (
        <div className="calendar-card">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={currentView}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                events={events}
                dateClick={handleDateClick}
            />
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Event Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={selectedEvent.title}
                        onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={addEvent}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CalendarCard;
