//import { pool } from './database.js';
//import './dotenv.js';
import https from 'https';
import './dotenv.js'
import pg from 'pg'

const config = {
    user: 'postgres',
   password: 'XxeopsjwSTgtRPYrQBsuMbIvvlJTiSzV',
   host: 'junction.proxy.rlwy.net',
   port: '30404',
   database: 'railway'
}
console.log(config)
const pool = new pg.Pool(config)


const createLocationsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS locations CASCADE;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            address TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            zip TEXT NOT NULL,
            image TEXT NOT NULL
        )
    `;

    try {
        await pool.query(createTableQuery);
        console.log('Locations table created successfully.');
    } catch (error) {
        console.error('Error creating locations table:', error);
    }
};

const createEventsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title text NOT NULL,
            date text NOT NULL,
            time INTEGER NOT NULL,
            location INTEGER NOT NULL,
            image text NOT NULL,
            FOREIGN KEY (location) REFERENCES locations(id)
        )
    `;

    try {
        await pool.query(createTableQuery);
        console.log('Events table created successfully.');
    } catch (error) {
        console.error('Error creating events table:', error);
    }
};

const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};



const fetchAndInsertData = async () => {
    await createLocationsTable(), createEventsTable()

    try {
        const locationsData = await fetchData('https://unitygridplaza.up.railway.app/api/locations');
        for (const location of locationsData) {
            const insertLocationQuery = {
                text: 'INSERT INTO locations (name, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6)',
                values: [location.name, location.address, location.city, location.state, location.zip, location.image],
            };

            await pool.query(insertLocationQuery);
            console.log(`✅ ${location.name} added successfully to locations.`);
        }

        const eventsData = await fetchData('https://unitygridplaza.up.railway.app/api/events');

        for (const event of eventsData) {
            const insertEventQuery = {
                text: 'INSERT INTO events (title, date, time, location, image) VALUES ($1, $2, $3, $4, $5)',
                values: [event.title, event.date, event.time, event.location, event.image],
            };

            await pool.query(insertEventQuery);
            console.log(`✅ ${event.title} added successfully to events.`);
        }
    } catch (error) {
        console.error('Error fetching or inserting data:', error);
    }
};


fetchAndInsertData();
