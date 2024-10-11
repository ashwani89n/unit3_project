import express from 'express';
import path from 'path';
import LocationsController from '../controllers/locations.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const locationsRoutes = express.Router();

locationsRoutes.get('/locations', LocationsController.getAllLocations);

locationsRoutes.get('/locations/:id', LocationsController.getLocationById);

export default locationsRoutes;
