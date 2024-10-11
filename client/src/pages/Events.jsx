import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/LocationEvents.css'
import EventsAPI from '../../services/EventsAPI'


const Events = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const eventsData = await EventsAPI.getAllEvents();
                console.log('Fetched events data:', eventsData); 
                if (Array.isArray(eventsData)) {
                    setEvents(eventsData);
                } else {
                    console.warn('Expected an array but got:', eventsData);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        })();
    }, []);

    
    
    return (
        <div className='location-events'>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default Events