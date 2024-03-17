import { useState, Fragment } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog, Transition } from '@headlessui/react';
import CardFilter from './CardFilter';
import './calendar.css'; // Make sure your styles are correctly pointed to

function CalendarCard() {
    const [events, setEvents] = useState([
        { id: '1', title: 'Meeting', start: new Date().toISOString(), end: new Date().toISOString(), allDay: false },
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({ title: '', date: new Date() });
    const [currentView, setCurrentView] = useState('dayGridMonth');

    const handleFilterChange = (newView) => {
        setCurrentView(newView);
    };

    const handleDateClick = (arg) => {
        setSelectedEvent({ ...selectedEvent, date: arg.date });
        setIsOpen(true);
    };

    const addEvent = () => {
        setEvents([...events, {
            ...selectedEvent,
            id: events.length + 1,
            start: selectedEvent.date,
            end: selectedEvent.date,
            allDay: true
        }]);
        setIsOpen(false);
    };

    return (
        <div className="calendar-card card">
            <div className="calendar-header p-5 flex justify-between items-center">
                <h5 className="card-title">
                    My Calendar
                </h5>
                <CardFilter filterChange={handleFilterChange} />
            </div>
            <div className="calendar-body">
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
            </div>
            <Transition as={Fragment} show={isOpen}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        Add New Event
                                    </Dialog.Title>
                                    <input
                                        type="text"
                                        className="mt-2 w-full border rounded-md"
                                        placeholder="Event Title"
                                        value={selectedEvent.title}
                                        onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={addEvent}
                                    >
                                        Add Event
                                    </button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

export default CalendarCard;
