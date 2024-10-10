import { pool } from '../config/database.js'

const getAllLocations = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM locations');
        res.status(200).json(results.rows)

    }
    catch (error) {
        res.status(409).json( { error: error.message } )
      }
};

const LocationsController = {
    getAllLocations: getAllLocations                 
  }
  
  export default LocationsController;

  

