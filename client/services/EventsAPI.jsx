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

const getEventById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch event with ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default { getAllEvents, getEventById };
