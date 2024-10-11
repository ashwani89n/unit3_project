import { pool } from '../config/database.js'

const getEvents = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM events');
        res.status(200).json(results.rows)

    }
    catch (error) {
        res.status(409).json( { error: error.message } )
      }
};

const getEventsById = async (req, res) => {
    const { id } = req.params; 
    try {
        const results = await pool.query('SELECT * FROM events WHERE location = $1', [id]);
        console.log("length:", results.rows.length)
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(results.rows); 
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getEventsByEventsId = async (req, res) => {
    const { id } = req.params; 
    try {
        const results = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
        console.log("length:", results.rows.length)
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(results.rows[0]); 
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const EventsController = {
    getEvents,
    getEventsById,   
    getEventsByEventsId,             
  }
  
  export default EventsController;

  

