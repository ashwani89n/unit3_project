import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/LocationEvents.css'
import LocationsAPI from '../../services/LocationsAPI'
import EventsAPI from '../../services/EventsAPI'


const LocationEvents = ({index}) => {
    const [location, setLocation] = useState([])
    const [events, setEvents] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const locationsData = await LocationsAPI.getLocationById(index);
                console.log('Fetched locations data:', locationsData);
                setLocation(locationsData);
            } catch (error) {
                console.error('Error fetching location:', error);
            }
        })();
    }, [index]);

    useEffect(() => {
        (async () => {
            try {
                const eventsData = await EventsAPI.getEventsById(index);
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
    }, [index]);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const locationsData = await LocationsAPI.getLocationById(index);
    //             console.log('Fetched locations data2:', locationsData);
    //             setLocation(locationsData);
    //         }
    //         catch (error) {
    //             throw error
    //         }
    //     }) ()
    // }, [])

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const eventsData = await EventsAPI.getEventsById(index);
    //             setEvents(eventsData);
    //             console.log("data:" , eventsData);
    //         }
    //         catch (error) {
    //             throw error
    //         }
    //     }) ()
    // }, [])

    
    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

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

export default LocationEvents