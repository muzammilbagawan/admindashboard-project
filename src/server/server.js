

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const initializeDatabase = require('./initializeDatabase');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(bodyParser.json());

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

let dbPool = null;

// Initialize the database and start the server
initializeDatabase()
  .then((pool) => {
    dbPool = pool;
    console.log('Database initialized successfully.');
    startServer();
  })
  .catch((error) => {
    console.error('Database initialization failed:', error);
    process.exit(1);
  });

// Route handlers
async function startServer() {
  // Fetch all team data
  app.get('/api/team', async (req, res) => {
    try {
      const result = await dbPool.query('SELECT * FROM team');
      res.json({ data: result.rows });
    } catch (error) {
      console.error('Error fetching team data:', error);
      res.status(500).json({ error: 'Failed to fetch team data' });
    }
  });

  // Fetch all invoices
  app.get('/api/invoices', async (req, res) => {
    try {
      const result = await dbPool.query('SELECT * FROM invoices');
      res.json({ data: result.rows });
    } catch (error) {
      console.error('Error fetching invoices:', error);
      res.status(500).json({ error: 'Failed to fetch invoices' });
    }
  });

  // Fetch all contacts
  app.get('/api/contacts', async (req, res) => {
    try {
      const result = await dbPool.query('SELECT * FROM contacts');
      res.json({ data: result.rows });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  });

  // Add a new contact
  app.post('/api/contacts', async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        contact,
        address1,
        address2,
        city,
      } = req.body;

      // Validate input
      if (!firstName || !lastName || !email || !contact || !address1 || !city) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Insert new contact into the database
      const result = await dbPool.query(
        'INSERT INTO contacts (firstName, lastName, email, contact, address1, address2, city) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [firstName, lastName, email, contact, address1, address2, city]
      );

      res.status(201).json({
        message: 'Contact created successfully',
        data: result.rows[0],
      });
    } catch (error) {
      console.error('Error creating contact:', error);
      if (error.code === '23505') {
        // PostgreSQL unique violation error code
        if (error.constraint === 'contacts_email_key') {
          res
            .status(400)
            .json({ error: 'A user with this email already exists' });
        } else if (error.constraint === 'contacts_contact_key') {
          res
            .status(400)
            .json({ error: 'A user with this contact number already exists' });
        } else {
          res.status(400).json({ error: 'Duplicate entry detected' });
        }
      } else {
        res.status(500).json({ error: 'Failed to create contact' });
      }
    }
  });

  // Fetch data for line chart
  app.get('/api/linechartdata', async (req, res) => {
    try {
      const result = await dbPool.query(`
        SELECT EXTRACT(YEAR FROM invoice_date) AS year,
               SUM(cost) AS total_cost
        FROM invoices
        GROUP BY year
        ORDER BY year
      `);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching line chart data:', error);
      res.status(500).json({ error: 'Failed to fetch line chart data' });
    }
  });

  // Start the server
  app.listen(port, () =>
    console.log(`Server is listening on port ${port}...`)
  );
}
