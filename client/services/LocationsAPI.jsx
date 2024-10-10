const API_BASE_URL = '/api';

const getAllLocations = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/locations`);
        if (!response.ok) {
            const errorDetails = await response.text(); 
            throw new Error(`Failed to fetch locations: ${errorDetails}`);
        }
        const data = await response.json();
        console.log('Fetched locations data1:', data); 
        return data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
};

const getLocationById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/locations/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch location with ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default { getAllLocations, getLocationById };
