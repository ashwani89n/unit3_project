const API_BASE_URL = '/api';

const getAllEvents = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/events`);
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getEventsById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/locations/${id}`);
        console.log(response);
        if (!response.ok) {
            throw new Error(`Failed to fetch event with ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getEventsByEventsId = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${id}`);
        console.log(response);
        if (!response.ok) {
            throw new Error(`Failed to fetch event with ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default { getAllEvents, getEventsById,getEventsByEventsId };
