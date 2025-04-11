const { Pool } = require('pg');
require('dotenv').config();

const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'react_admin1',
    user: 'postgres',
    password: '123456',
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

const createTables = async (pool) => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS team (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                age INTEGER CHECK (age >= 0),
                phone TEXT,
                access TEXT CHECK (access IN ('admin', 'manager', 'user'))
            );

            CREATE TABLE IF NOT EXISTS contacts (
                id SERIAL PRIMARY KEY,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL, -- Ensure email is unique
                contact TEXT UNIQUE NOT NULL, -- Ensure contact is unique
                address1 TEXT NOT NULL,
                address2 TEXT,
                city TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS invoices (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                cost NUMERIC(10, 2) CHECK (cost >= 0),
                phone TEXT,
                invoice_date DATE
            );
        `);
        console.log('Tables created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error.stack);
        throw error;
    }
};

const insertMockData = async (pool) => {
    const teamData = [
        { name: 'Jon Snow', email: 'jonsnow@example.com', age: 35, phone: '(665)121-5454', access: 'user' },
    ];

    const invoicesData = [
        { name: 'Jon Snow', email: 'jonsnow@example.com', cost: 74.24, phone: '(665)121-5454', invoice_date: '2024-03-12' },
    ];

    try {
        // Insert team data
        for (const team of teamData) {
            try {
                await pool.query(
                    'INSERT INTO team (name, email, age, phone, access) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO NOTHING',
                    [team.name, team.email, team.age, team.phone, team.access]
                );
            } catch (error) {
                console.error('Error inserting team data:', error);
            }
        }

        // Insert invoices data
        for (const invoice of invoicesData) {
            try {
                await pool.query(
                    'INSERT INTO invoices (name, email, cost, phone, invoice_date) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
                    [invoice.name, invoice.email, invoice.cost, invoice.phone, invoice.invoice_date]
                );
            } catch (error) {
                console.error('Error inserting invoices data:', error);
            }
        }

        console.log('Mock data inserted successfully.');
    } catch (error) {
        console.error('Error during mock data insertion:', error.stack);
        throw error;
    }
};

module.exports = async () => {
    const pool = new Pool(dbConfig);
    try {
        console.log('Connecting to PostgreSQL...');
        await pool.connect();
        console.log('Connected to the PostgreSQL database.');
        await createTables(pool);
        await insertMockData(pool);
        return pool;
    } catch (error) {
        console.error('Error initializing database:', error.stack);
        if (pool) {
            try {
                await pool.end();
                console.log('Pool ended successfully.');
            } catch (endError) {
                console.error('Error ending pool:', endError.stack);
            }
        }
        throw error;
    }
};
